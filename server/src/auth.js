const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const APP_SECRET = process.env.APP_SECRET;
const APP_SECRET_2 = process.env.APP_SECRET_2;

//https://github.com/benawad/graphql-express-template/blob/23_cookies/auth.js
// https://www.youtube.com/watch?v=7C3rPbXmm44
exports.createTokens = async (user, password) => {
  // because they signed in this token does not need the password
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  // we will attach the password to a refreshToken so we can handle refreshTokens automagically without user input
  const refreshToken = jwt.sign({ userId: user.id }, APP_SECRET_2 + password);
  // 4. Set the cookie with the token

  // tokens will be sent in the cookies request now.
  // so just using this function is all you need to do.
  // I will also send back the tokens as for react-native i cant seem to access the cookies =(
  return {
    token: token,
    refreshToken: refreshToken
  };
};

exports.refreshTokens = async (refreshToken, db) => {
  const { userId } = jwt.decode(refreshToken);
  if (!userId) {
    return {};
  }
  const user = await db.query.user(
    { where: { id: userId } },
    "{ id, permissions, email, firstName, lastName, phone, password }"
  );
  if (!user) {
    return {};
  }
  const refreshSecret = SECRET_2 + user.password;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }
  const newTokens = await createTokens(user, user.password);
  return {
    token: newTokens.token,
    refreshToken: newTokens.refreshToken,
    user: user
  };
};