const emailCEO = require("../../lib/emails/emailCEO");
const { validateRecaptcha } = require("../../lib/recaptchaApi");

async function createContactForm(parent, args, ctx, info) {
  const recaptchaIsValid = await validateRecaptcha({
    ctx,
    captchaToken: args.captchaToken
  });
  if (recaptchaIsValid !== true) {
    throw new Error(`Invalid ReCaptcha token`);
  }

  console.log("The submitted args: ", args);
  // because i am a moron `firstName` is the param recieved but our db key is just `name`
  const contactSubmission = await ctx.db.mutation.createContactSubmission(
    {
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        phone: args.phone,
        email: args.email,
        message: args.message
      }
    },
    info
  );

  console.log("Cool got a contact submission in the db => ", contactSubmission);

  emailCEO({
    ctx: ctx,
    subject: `${args.firstName} submitted contact`,
    body: `
    <div style="line-height: 18px;">
        ${args.firstName} has sent a message:
    </div>
    <div style="line-height: 18px;">
        ${args.message}
    </div>
    <div style="line-height: 18px;">
        Email them back @${args.email}
    </div>
    `
  });

  return { message: "Your contact form has been recieved!" };
}

module.exports = createContactForm;
