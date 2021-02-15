const jwt = require("jsonwebtoken");
const { refreshTokens } = require("../../auth");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");
const db = require("../../db");

const addUser = async (req, res, next) => {
  // res.set({
  //   "Access-Control-Allow-Origin": "*"
  // });
  let token = req.cookies.token;
  const cookieOptions = rehouserCookieOpt();

  // if (!token) {
  //   const header = req.headers["authorization"]; // hmm this might be blocking the cloudinary
  //   if (typeof header !== "undefined") {
  //     const bearer = header.split(" ");
  //     token = bearer[1];
  //   } else {
  //     return next();
  //   }
  // }

  // req.headers["mode"] = "cors";
  // req.headers["host"] = "https://app.rehouser.co.nz";
  // req.headers["sec-fetch-site"] = "cors";

  // req.headers["host"] = "localhost:4444";
  // req.headers["connection"] = "keep-alive";
  // req.headers["content-length"] = "98005";
  // req.headers["access-control-allow-origin"] = "*";
  // req.headers["accept"] = "*/*";
  // req.headers["user-agent"] =
  //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36";
  // req.headers["content-type"] =
  //   "multipart/form-data; boundary=----WebKitFormBoundary7RkdPHHCkW0sBKDX";
  // req.headers["origin"] = "http://localhost:7777";
  // req.headers["sec-fetch-site"] = "same-site";
  // req.headers["sec-fetch-mode"] = "cors";
  // req.headers["sec-fetch-dest"] = "empty";
  // req.headers["referer"] = "http://localhost:7777/";
  // req.headers["accept-encoding"] = "gzip, deflate, br";
  // req.headers["accept-language"] = "'en-US,en;q=0.9";

  // whats coming from live

  if (!token) {
    return next();
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
    // const cookieOptions = rehouserCookieOpt();
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
