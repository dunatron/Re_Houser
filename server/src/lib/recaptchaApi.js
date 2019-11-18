exports.validateRecaptcha = async ({ ctx, captchaToken }) => {
  // dismiss anything without a recaptcha token supplied
  if (!captchaToken) {
    throw new Error(
      `Please supply a successful recaptcha token response from the front end`
    );
  }
  const captchaSecretKey = process.env.GOOGLE_RECAPTCHA_API_SECRET_KEY;
  const remoteIP = ctx.request.connection.remoteAddress;
  const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${captchaToken}&remoteip=${remoteIP}`;
  //
  const recaptchaResponse = await fetch(verifyURL);
  const recaptchaData = await recaptchaResponse.json();
  // throw error if recaptcha isnt passed for any reason
  if (recaptchaData.success !== true) {
    throw new Error(`failed captcha ${JSON.stringify(recaptchaData)}`);
  }
  // return true if requesting as isValid
  if (recaptchaData.success === true) {
    return true;
  }
  throw new Error(`somethings has gone horribly wrong with recaptcha}`);
};
