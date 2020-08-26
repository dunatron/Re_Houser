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
