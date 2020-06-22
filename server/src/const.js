// const JWT_TOKEN_MAX_AGE = 1000 * 60 * 2; // 2 minutes
// const JWT_TOKEN_MAX_AGE = 1000 * 60 * 5; // 5 minutes
const JWT_TOKEN_MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 5 minutes
// maxAge: 1000 * 60 * 60 * 24 * 365
// https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81
// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/
module.exports.JWT_TOKEN_MAX_AGE = JWT_TOKEN_MAX_AGE;

exports.rehouserCookieOpt = () => {
  const envStage = process.env.STAGE;
  //The httpOnly: true setting means that the cookie can’t be read using JavaScript but can still be sent back to the server in HTTP requests.
  // Without this setting, an XSS attack could use document.cookie to get a list of stored cookies and their values
  return {
    maxAge: JWT_TOKEN_MAX_AGE, // when the cookie expires
    httpOnly: true,
    sameSite: "Lax",
    secure: envStage == "dev" ? false : true // connection needs to be over HTTPS
  };
  // return {
  //   maxAge: JWT_TOKEN_MAX_AGE, // when the cookie expires
  //   httpOnly: true,
  //   secure: envStage == "dev" ? false : true // connection needs to be over HTTPS
  // };

  // if (envStage == "dev")
  //   return {
  //     maxAge: JWT_TOKEN_MAX_AGE,
  //     httpOnly: true
  //     // sameSite: "lax"
  //   };
  // return {
  //   maxAge: JWT_TOKEN_MAX_AGE,
  //   httpOnly: true,
  //   sameSite: "None",
  //   secure: true
  // };
  // return {
  //   maxAge: JWT_TOKEN_MAX_AGE,
  //   httpOnly: true
  // };

  // use this if you fuck up ypur environment variables and cannot be fucked debugging the cunt
  // and maybe for mobile because that cunt doesnt work
  /**
   * HMMM: sameSite seems to work quite well
   * secure: true good. maybe try lax...
   */
  return {
    maxAge: JWT_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: "None",
    secure: false // false for dev
  };
  return {
    maxAge: JWT_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: "Lax",
    secure: true
  };
};
