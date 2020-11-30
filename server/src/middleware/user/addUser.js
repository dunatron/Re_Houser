const jwt = require("jsonwebtoken");
const { refreshTokens } = require("../../auth");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");
const db = require("../../db");

const addUser = async (req, res, next) => {
  // console.log("WHAT IS ON THE REQUEST +> ", req);
  let token = req.cookies.token;

  if (!token) {
    const header = req.headers["authorization"];
    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      token = bearer[1];
    } else {
      return next();
    }
  }
  try {
    // decode the id and permissions from the token request
    const { userId, userPermissions } = jwt.verify(
      token,
      process.env.APP_SECRET
    );
    // attach the id and permissions to the request
    req.userId = userId;
    req.userPermissions = userPermissions;
  } catch (err) {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
      return next();
    }

    const newTokens = await refreshTokens(refreshToken, db);
    const cookieOptions = rehouserCookieOpt();
    if (newTokens.token && newTokens.refreshToken) {
      res.cookie("token", newTokens.token, {
        ...cookieOptions
      });
      res.cookie("refresh-token", newTokens.refreshToken, {
        ...cookieOptions
      });
    }
    req.userId = newTokens.user.id;
    req.userPermissions = newTokens.user.permissions;
  }
  return next();
};

module.exports = addUser;
