export const RENTAL_GROUP_APPLICANT_CONF = [
  {
    label: "My Email",
    variableName: "email",
    validation: [
      {
        key: "isEmpty",
        reverse: true,
        message: "Email cannot be empty",
      },
      {
        key: "isEmail",
        message: "Email field must be a valid email",
      },
    ],
  },
  {
    label: "First Name",
    variableName: "firstName",
    validation: [
      {
        key: "isEmpty",
        reverse: true,
        message: "First Name cannot be empty",
      },
    ],
  },
]

// export { USER_PROFILE_CONF }
// export default USER_PROFILE_CONF
