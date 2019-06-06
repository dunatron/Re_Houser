const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { randomBytes } = require("crypto")
const { promisify } = require("util")
// PropertySearchAPi
const { addPropertySearchNode } = require("../lib/algolia/propertySearchApi")
const { transport, makeANiceEmail } = require("../lib/mail")
const { hasPermission } = require("../lib/utils")
const { processUpload, deleteFile } = require("../lib/fileApi")
const { convertDocument } = require("../lib/DocGenerator")
const createRentalApplication = require("./mutations/createRentalApplication")
const createCreditCard = require("./mutations/createCreditCard")
const updateRentalApplication = require("./mutations/updateRentalApplication")
const completeRentalApplication = require("./mutations/completeRentalApplication")
const acceptRentalApplication = require("./mutations/acceptRentalApplication")
const createPropertyLease = require("./mutations/createPropertyLease")
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../lib/documents/test.docx")

const mutations = {
  async signup(parent, args, ctx, info) {
    //lowercase their email
    args.email = args.email.toLowerCase()
    // hash their password. 1 way so if you goy hold of the hashed pass you could not turn it back to what the user actually typed
    const password = await bcrypt.hash(args.password, 10)
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] },
        },
      },
      info
    )
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    })
    // Finalllllly we return the user to the browser
    return user
  },
  async signin(parent, { email, password }, ctx, info) {
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
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token")
    return { message: "Goodbye!" }
  },
  async requestReset(parent, args, ctx, info) {
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
  },
  async resetPassword(parent, args, ctx, info) {
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
  },
  async updatePermissions(parent, args, ctx, info) {
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
  },
  async singleUpload(parent, { file }, ctx, info) {
    return await processUpload(await file, ctx)
  },
  async uploadPhotoId(parent, { file, photoId }, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!")
    }
    // get current user photo id
    const currData = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      `{ photoIdentification{id, url} }`
    )
    // delete file on cloudinary if we have one
    if (currData.photoIdentification) {
      const delFile = await deleteFile({
        id: currData.photoIdentification.id,
        url: currData.photoIdentification.url,
        ctx,
      })
      console.log("Deleted PhotoID on cloudinary => ", delFile)
    }
    // upload file to cloudinary
    const uploadedFile = await processUpload(await file, ctx)
    // update user
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: {
          id: ctx.request.userId,
        },
        data: {
          photoIdentification: {
            connect: {
              id: uploadedFile.id,
            },
          },
          identificationNumber: photoId,
        },
      },
      info
    )
    return updatedUser
  },
  async uploadFile(parent, { file }, ctx, info) {
    return await processUpload(await file, ctx)
  },
  async uploadFiles(parent, { files }, ctx, info) {
    return Promise.all(files.map(file => processUpload(file, ctx)))
  },
  async renameFile(parent, { id, filename }, ctx, info) {
    return ctx.db.mutation.updateFile(
      { data: { filename }, where: { id } },
      info
    )
  },
  async deleteFile(parent, { id }, ctx, info) {
    const file = await ctx.db.query.file({ where: { id } }, `{id url}`)
    if (file) {
      deleteFile({ id: file.id, url: file.url, ctx })
    }
    return { id }
    // return await ctx.db.mutation.deleteFile({ where: { id } }, info)
  },
  // ToDo: Shift into own directoy e.g. Properties
  async createProperty(parent, { data, files }, ctx, info) {
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
    const propertySearchNode = addPropertySearchNode({
      propertyId: property.id,
      ctx,
    })
    console.log("propertySearchNode => ", propertySearchNode)
    return property
  },
  // async createRentalApplication(parent, { data, files }, ctx, info) {
  //   const currentApplications = await ctx.db.query.rentalApplications(
  //     {
  //       where: {
  //         property: {
  //           id: data.property.connect.id
  //         }
  //       }
  //     },
  //     `{ id, owner {id} applicants { user { id}} }`
  //   );
  //   const applicationOwnerIds = currentApplications.map(
  //     application => application.owner.id
  //   );
  //   // applicantUserIds = currentApplications.applicants.map(
  //   //   applicant => applicant.user.id
  //   // )
  //   if (applicationOwnerIds.includes(ctx.request.userId)) {
  //     console.log("applicationOwnerIds => ", applicationOwnerIds);
  //     console.log("ctx.request.userId => ", ctx.request.userId);
  //     const userApplication = currentApplications.find(
  //       application => application.owner.id === ctx.request.userId
  //     );
  //     const fullApplication = ctx.db.query.rentalApplication(
  //       {
  //         where: { id: userApplication.id }
  //       },
  //       info
  //     );
  //     console.log("userApplication => ", userApplication);
  //     return fullApplication;
  //   }
  //   const rentalApplication = await ctx.db.mutation.createRentalApplication(
  //     {
  //       data: {
  //         ...data
  //       }
  //     },
  //     info
  //   );
  //   const rentalGroupNode = await ctx.db.mutation.createRentalGroupApplicant(
  //     {
  //       data: {
  //         user: {
  //           connect: {
  //             id: ctx.request.userId
  //           }
  //         },
  //         approved: true,
  //         application: {
  //           connect: {
  //             id: rentalApplication.id
  //           }
  //         }
  //       }
  //     },
  //     `{ id, approved ,user{id, firstName, lastName}}`
  //   );
  //   rentalApplication.applicants.push({ ...rentalGroupNode });
  //   return rentalApplication;
  // },
  async applyToRentalGroup(parent, { data }, ctx, info) {
    // ToDo: send email to current group members
    const userId = data.user.connect.id
    const applicationId = data.application.connect.id
    const application = await ctx.db.query.rentalApplication(
      { where: { id: applicationId } },
      `{ id, applicants { user { id}} }`
    )
    applicantUserIds = application.applicants.map(
      applicant => applicant.user.id
    )
    if (applicantUserIds.includes(userId)) {
      throw new Error("You have already applied for this group!")
    }
    // add user application to rent application
    const rentalGroupApplicant = await ctx.db.mutation.createRentalGroupApplicant(
      {
        data: {
          ...data,
        },
      },
      `{id}`
    )
    const fullApplicationData = await ctx.db.query.rentalApplication(
      { where: { id: applicationId } },
      info
    )

    return fullApplicationData
  },

  async updateProperty(parent, args, ctx, info) {
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
    // return ctx.db.mutation.updateProperty(
    //   {
    //     updates,
    //     where: {
    //       id: args.id,
    //     },
    //   },
    //   info
    // )
    return ctx.db.mutation.updateProperty(
      {
        updates,
        where: {
          id: args.id,
        },
      },
      info
    )
  },
  async createPreRentalDocument(
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
  },
  createRentalApplication,
  updateRentalApplication,
  completeRentalApplication,
  acceptRentalApplication,
  createCreditCard,
  createPropertyLease,
  async updateUser(parent, { data, photoFile }, ctx, info) {
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
  },
  async updateRentalGroupApplicant(parent, { data, where }, ctx, info) {
    // data.completed = true
    const updatedGroupApplicant = await ctx.db.mutation.updateRentalGroupApplicant(
      {
        data,
        where,
      },
      info
    )
    return updatedGroupApplicant
  },
}

module.exports = mutations
