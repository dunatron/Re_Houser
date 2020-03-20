// const JWT_TOKEN_MAX_AGE = 1000 * 60 * 2; // 2 minutes
// const JWT_TOKEN_MAX_AGE = 1000 * 60 * 5; // 5 minutes
const JWT_TOKEN_MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 5 minutes
// maxAge: 1000 * 60 * 60 * 24 * 365
module.exports.JWT_TOKEN_MAX_AGE = JWT_TOKEN_MAX_AGE;

exports.rehouserCookieOpt = () => {
  const envStage = process.env.STAGE;

  if (envStage == "dev")
    return {
      maxAge: JWT_TOKEN_MAX_AGE,
      httpOnly: true
    };

  return {
    maxAge: JWT_TOKEN_MAX_AGE,
    httpOnly: true
  };

  return {
    maxAge: JWT_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: "None",
    secure: true
  };
};
