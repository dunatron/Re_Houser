const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRecaptcha } = require("../../lib/recaptchaApi");
const { createTokens } = require("../../auth");
const { JWT_TOKEN_MAX_AGE } = require("../../const");

// async function signin(parent, { email, password, captchaToken }, ctx, info) {
//   // dismiss anything without a recaptcha token supplied
//   if (!captchaToken) {
//     throw new Error(
//       `Please supply a successful recaptcha token response from the front end`
//     );
//   }
//   // setup recaptcha verification params
//   const captchaSecretKey = "6Lc9N8MUAAAAAKC00xGhUhae35JMlrY-pyCHF-mW";
//   const remoteIP = ctx.request.connection.remoteAddress;
//   const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${captchaToken}&remoteip=${remoteIP}`;
//   //
//   const recaptchaResponse = await fetch(verifyURL);
//   const recaptchaData = await recaptchaResponse.json();
//   // throw error if recaptcha isnt passed for any reason
//   if (recaptchaData.success !== true) {
//     throw new Error(`failed captcha ${JSON.stringify(recaptchaData)}`);
//   }
//   const user = await ctx.db.query.user({ where: { email } });
//   if (!user) {
//     throw new Error(`No such user found for email ${email}`);
//   }
//   if (recaptchaData.success === true) {
//     // 2. Check if their password is correct
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) {
//       throw new Error("Invalid Password!");
//     }
//     // 3. generate the JWT Token
//     const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
//     // 4. Set the cookie with the token
//     ctx.response.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 * 365
//     });
//     // 5. get the user with details. cant get it earlier
//     const userWithInfo = await ctx.db.query.user({ where: { email } }, info);
//     return userWithInfo;
//   }
//   throw new Error(`something went wrong validating the user and recaptcha`);
// }

// module.exports = signin;

async function signin(parent, { email, password, captchaToken }, ctx, info) {
  // validate recaptcha. will throw an error if it does not
  const recaptchaIsValid = await validateRecaptcha({
    ctx,
    captchaToken
  });
  if (recaptchaIsValid !== true) {
    throw new Error(`recaptcha failed but it should not have made it here`);
  }
  const user = await ctx.db.query.user({ where: { email } });
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid Password!");
  }
  // now that we have validated credentials we should create tokens and send as a cookie
  const { token, refreshToken } = await createTokens(user, password);

  const ck1 = ctx.response.cookie("token", token, {
    maxAge: JWT_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: "None",
    secure: true
  });
  const ck2 = ctx.response.cookie("refresh-token", refreshToken, {
    // ...cookieOptions
    maxAge: JWT_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: "None",
    secure: true
  });
  // 3. generate the JWT Token
  // const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // // 4. Set the cookie with the token
  // ctx.response.cookie("token", token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 365
  // });
  // 5. get the user with details. cant get it earlier
  const userWithInfo = await ctx.db.query.user({ where: { email } }, info);

  const userInfoWithToken = {
    ...userWithInfo,
    token: ck1,
    refreshToken: ck2
    // token: token,
    // refreshToken: refreshToken
  };
  return userInfoWithToken;
}

module.exports = signin;
