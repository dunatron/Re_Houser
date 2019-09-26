require("dotenv").config({ path: "./variables-prod.env" })
// require("dotenv").config({ path: "./variables.env" })
// require("dotenv").config()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const { convertDocument } = require("./lib/DocGenerator")
const createServer = require("./createServer")
const db = require("./db")
const setupIndexes = require("./lib/algolia/setupIndexes")

const server = createServer()
var path = require("path")
var fs = require("fs")

const expressLogger = function(req, res, next) {
  next()
}

server.use(expressLogger)
//disable cors for now
// server.use(cors())

server.express.use(cookieParser())

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies
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

server.get("/setup-indexes", function(req, res) {
  setupIndexes()
  res.send("complete")
})

const messages = [
  {
    id: "1",
    content: "You on your way?",
    createdAt: new Date(new Date("1-1-2019").getTime() - 60 * 1000 * 1000),
  },
  {
    id: "2",
    content: "Hey, it's me",
    createdAt: new Date(new Date("1-1-2019").getTime() - 2 * 60 * 1000 * 1000),
  },
  {
    id: "3",
    content: "I should buy a boat",
    createdAt: new Date(new Date("1-1-2019").getTime() - 24 * 60 * 1000 * 1000),
  },
  {
    id: "4",
    content: "This is wicked good ice cream.",
    createdAt: new Date(
      new Date("1-1-2019").getTime() - 14 * 24 * 60 * 1000 * 1000
    ),
  },
]
const chats = [
  {
    id: "1",
    name: "Ethan Gonzalez",
    picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
    lastMessage: "1",
  },
  {
    id: "2",
    name: "Bryan Wallace",
    picture: "https://randomuser.me/api/portraits/thumb/men/2.jpg",
    lastMessage: "2",
  },
  {
    id: "3",
    name: "Avery Stewart",
    picture: "https://randomuser.me/api/portraits/thumb/women/1.jpg",
    lastMessage: "3",
  },
  {
    id: "4",
    name: "Katie Peterson",
    picture: "https://randomuser.me/api/portraits/thumb/women/2.jpg",
    lastMessage: "4",
  },
]

server.get("/chats", (req, res) => {
  res.json(chats)
})

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
