const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
//deplioy

require("dotenv").config({ path: "./variables.env" })
const { convertDocument } = require("./lib/DocGenerator")
const createServer = require("./createServer")
const db = require("./db")

const server = createServer()
var path = require("path")
var fs = require("fs")

const expressLogger = function(req, res, next) {
  console.log("express endpoint called")
  next()
}

server.use(expressLogger)

server.express.use(cookieParser())

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies
  console.log("token => ", token)
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    // put the userId onto the req for future requests to access
    req.userId = userId
  }
  next()
})

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next()
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{ id, permissions, email, firstName, lastName, phone }"
  )
  req.user = user
  next()
})

server.get("/tron-search", function(req, res) {
  var foo = require("../cronjob-files/pages.json")
  res.send(foo)
})

server.get("/docy", async function(req, res) {
  const uploadedTemplateData = {
    test: "I am test data for the document",
  }
  filePath = path.join(__dirname, "./lib/documents/test.docx")
  var myJSON = JSON.stringify(uploadedTemplateData)
  var data = await fs.readFileSync(filePath)
  var docyBuf = convertDocument(myJSON, data)
  res.status(200).send(docyBuf)
})

// document generator

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  details => {
    console.log(`Server is now running on port http:/localhost:${details.port}`)
  }
)
