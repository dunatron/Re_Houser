const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRecaptcha } = require("../../lib/recaptchaApi");
const { createTokens } = require("../../auth");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");
// const logUser = require("../../lib/logUser");

const userQueryString = `{
  id,
  permissions,
  updatedAt,
  createdAt,
  dob,
  firstName,
  lastName,
  phone,
  email,
  emailValidated,
  password,
  resetToken,
  resetTokenExpiry,
  confirmEmailToken,
  confirmEmailTokenExpiry,
  identificationNumber,
  emergencyContactName,
  emergencyContactNumber,
  emergencyContactEmail,
  rehouserStamp,
  acceptedSignupTerms,
  acceptedTermsOfEngagement,
  bondLodgementNumber
}`;

async function signin(parent, { email, password, captchaToken }, ctx, info) {
  // validate recaptcha. will throw an error if it does not
  const recaptchaIsValid = await validateRecaptcha({
    ctx,
    captchaToken,
  });
  if (recaptchaIsValid !== true) {
    throw new Error(`recaptcha failed but it should not have made it here`);
  }
  const user = await ctx.db.query.user({ where: { email } }, userQueryString);
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid Password!");
  }
  // now that we have validated credentials we should create tokens and send as a cookie
  const { token, refreshToken } = await createTokens(user, password);

  const cookieOptions = rehouserCookieOpt();
  ctx.response.cookie("token", token, {
    ...cookieOptions,
  });
  ctx.response.cookie("refresh-token", refreshToken, {
    ...cookieOptions,
  });

  // 5. get the user with details. cant get it earlier
  const userWithInfo = await ctx.db.query.user({ where: { email } }, info);

  const userInfoWithToken = {
    ...userWithInfo,
    token: token,
    refreshToken: refreshToken,
  };

  // log the user who just logged in
  // logUser("User Logged in", userInfoWithToken);
  return userInfoWithToken;
}

module.exports = signin;
