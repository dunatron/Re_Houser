const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { randomBytes } = require("crypto")
const { promisify } = require("util")
const { transport, makeANiceEmail } = require("../lib/mail")
const { hasPermission } = require("../lib/utils")
const { processUpload, deleteFileAPI } = require("../lib/fileApi")
const { convertDocument } = require("../lib/DocGenerator")
const createRentalApplication = require("./mutations/createRentalApplication")
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../lib/documents/test.docx")

async function signup(parent, args, context, info) {
  if (args.email.length < 3) {
    throw new Error("Email should have more than 3 characters")
  }
  // 1
  const password = await bcrypt.hash(args.password, 10)
  // 2
  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password },
    },
    `{ id password name email role }`
  )

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}
async function signin(parent, { email, password }, ctx, info) {
  // 1. check if there is a user with that email
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email ${email}`)
  }
  // 2. Check if their password is correct
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error("Invalid Password!")
  }
  // 3. generate the JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  // 4. Set the cookie with the token
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })
  // 5. Return the user
  return user
}
function signout(parent, args, ctx, info) {
  ctx.response.clearCookie("token")
  return { message: "Goodbye!" }
}
async function requestReset(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const user = await ctx.db.query.user({ where: { email: args.email } })
  if (!user) {
    throw new Error(`No such user found for email ${args.email}`)
  }
  // 2. Set a reset token and expiry on that user
  const randomBytesPromiseified = promisify(randomBytes)
  const resetToken = (await randomBytesPromiseified(20)).toString("hex")
  const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
  const res = await ctx.db.mutation.updateUser({
    where: { email: args.email },
    data: { resetToken, resetTokenExpiry },
  })
  // 3. Email them that reset token
  const mailRes = await transport.sendMail({
    from: "heath.dunlop.hd@gmail.com",
    to: user.email,
    subject: "Your Password Reset Token",
    html: makeANiceEmail(`Your Password Reset Token is here!
      \n\n
      <a href="${
        process.env.FRONTEND_URL
      }/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
  })

  // 4. Return the message
  return { message: "Thanks!" }
}
async function resetPassword(parent, args, ctx, info) {
  // 1. check if the passwords match
  if (args.password !== args.confirmPassword) {
    throw new Error("Yo Passwords don't match!")
  }
  // 2. check if its a legit reset token
  // 3. Check if its expired
  const [user] = await ctx.db.query.users({
    where: {
      resetToken: args.resetToken,
      resetTokenExpiry_gte: Date.now() - 3600000,
    },
  })
  if (!user) {
    throw new Error("This token is either invalid or expired!")
  }
  // 4. Hash their new password
  const password = await bcrypt.hash(args.password, 10)
  // 5. Save the new password to the user and remove old resetToken fields
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      password,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })
  // 6. Generate JWT
  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)
  // 7. Set the JWT cookie
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })
  // 8. return the new user
  return updatedUser
}
async function updatePermissions(parent, args, ctx, info) {
  // 1. Check if they are logged in
  if (!ctx.request.userId) {
    throw new Error("You must be logged in!")
  }
  // 2. Query the current user
  const currentUser = await ctx.db.query.user(
    {
      where: {
        id: ctx.request.userId,
      },
    },
    info
  )
  // 3. Check if they have permissions to do this
  hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"])
  // 4. Update the permissions
  return ctx.db.mutation.updateUser(
    {
      data: {
        permissions: {
          set: args.permissions,
        },
      },
      where: {
        id: args.userId,
      },
    },
    info
  )
}
async function singleUpload(parent, { file }, ctx, info) {
  return await processUpload(await file, ctx)
}
async function uploadFile(parent, { file }, ctx, info) {
  return await processUpload(await file, ctx)
}
async function uploadFiles(parent, { files }, ctx, info) {
  return Promise.all(files.map(file => processUpload(file, ctx)))
}
async function renameFile(parent, { id, filename }, ctx, info) {
  return ctx.db.mutation.updateFile({ data: { filename }, where: { id } }, info)
}
async function deleteFile(parent, { id }, ctx, info) {
  const file = await ctx.db.query.file({ where: { id } }, `{id url}`)
  if (file) {
    deleteFile({ id: file.id, url: file.url, ctx })
  }
  return { id }
  // return await ctx.db.mutation.deleteFile({ where: { id } }, info)
}
// ToDo: Shift into own directoy e.g. Properties
async function createProperty(parent, { data, files }, ctx, info) {
  const uploadedFiles = files
    ? await Promise.all(files.map(file => processUpload(file, ctx)))
    : []
  const connectFileIds = uploadedFiles.map(file => ({ id: file.id }))
  const property = await ctx.db.mutation.createProperty(
    {
      data: {
        ...data,
        images: {
          connect: connectFileIds,
        },
      },
    },
    info
  )
  return property
}
async function applyToRentalGroup(parent, { data }, ctx, info) {
  // ToDo: send email to current group members
  const userId = data.user.connect.id
  const applicationId = data.application.connect.id
  const application = await ctx.db.query.rentalApplication(
    { where: { id: applicationId } },
    `{ id, applicants { user { id}} }`
  )
  applicantUserIds = application.applicants.map(applicant => applicant.user.id)
  if (applicantUserIds.includes(userId)) {
    throw new Error("You have already applied for this group!")
  }
  const rentalApplication = await ctx.db.mutation.createRentalGroupApplicant(
    {
      data: {
        ...data,
      },
    },
    info
  )
  // add user application to rent application

  return rentalApplication
}

async function updateProperty(parent, args, ctx, info) {
  // first take a copy of the updates
  const updates = { ...args }
  const where = { id: args.id }
  // remove the ID from the updates
  delete updates.id
  // new file to update
  if (updates.file) {
    // get the old item data
    const item = await ctx.db.query.property(
      { where },
      `{ id title, image {id url} }`
    )
    if (item.image) {
      deleteFile({ id: item.image.id, url: item.image.url, ctx })
    }
    const uploadedFile = await processUpload(await updates.file, ctx)
    updates.image = {
      connect: {
        id: uploadedFile.id,
      },
    }
  }
  delete updates.file
  // run the update method
  return ctx.db.mutation.updateProperty(
    {
      data: updates,
      where: {
        id: args.id,
      },
    },
    info
  )
}
async function createPreRentalDocument(
  parent,
  { rentalGroupApplicantId, file },
  ctx,
  info
) {
  const user = await ctx.db.query.user({
    where: {
      id: ctx.request.userId,
    },
  })
  const uploadedTemplateData = {
    test: "I am test data for the document",
    userId: ctx.request.userId,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    userEmail: user.email,
  }
  var myJSON = JSON.stringify(uploadedTemplateData)
  var data = await fs.readFileSync(filePath)

  var docyBuf = convertDocument(myJSON, data)
  // fs.writeFileSync(
  //   path.resolve(__dirname, "../lib/documents/docy-document.docx"),
  //   buf
  // )
  return docyBuf
}
async function updateUser(parent, { data, photoFile }, ctx, info) {
  const uploadedPhoto = photoFile
    ? await processUpload(await photoFile, ctx)
    : null
  const userData = {
    ...data,
    photoIdentification: photoFile
      ? {
          connect: {
            id: uploadedPhoto.id,
          },
        }
      : {},
  }
  const updatedUser = await ctx.db.mutation.updateUser(
    { data: userData, where: { id: ctx.request.userId } },
    info
  )
  return updatedUser
}

module.exports = {
  signup,
  signin,
  signout,
  requestReset,
  resetPassword,
  updatePermissions,
  singleUpload,
  uploadFile,
  uploadFiles,
  renameFile,
  deleteFile,
  createProperty,
  applyToRentalGroup,
  updateProperty,
  createPreRentalDocument,
  updateUser,
  createRentalApplication,
}
