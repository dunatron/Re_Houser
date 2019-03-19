const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { randomBytes } = require("crypto")
const { promisify } = require("util")
const { transport, makeANiceEmail } = require("../lib/mail")
const { hasPermission } = require("../lib/utils")
const { processUpload, deleteFile } = require("../lib/fileApi")

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
    console.log("FETCHED USER => ", user)
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
    console.log("CREATED NEW PROPERTY => ", property)
    return property
  },
  async createRentalApplication(parent, { data, files }, ctx, info) {
    const rentalApplication = await ctx.db.mutation.createRentalApplication(
      {
        data: {
          ...data,
        },
      },
      info
    )
    console.log("rentalApplication => ", rentalApplication)
    return rentalApplication
  },

  async updateProperty(parent, args, ctx, info) {
    console.log("args => ", args)
    // first take a copy of the updates
    const updates = { ...args }
    const where = { id: args.id }
    console.group("updateItem")
    console.log("updates start => ", updates)
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
  },
}

module.exports = mutations
