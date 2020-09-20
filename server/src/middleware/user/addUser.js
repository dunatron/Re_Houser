const jwt = require("jsonwebtoken");
const { refreshTokens } = require("../../auth");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");

const addUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  try {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
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
  }
  return next();
};

module.exports = addUser;
