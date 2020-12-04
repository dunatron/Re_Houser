const mustBeAuthed = require("../../lib/mustBeAuthed");
const newRentalGroupApplicantEmail = require("../../lib/emails/newRentalApplicationEmail");

async function applyToRentalGroup(parent, { data }, ctx, info) {
  await mustBeAuthed({ ctx });
  // ToDo: send email to current group members
  const userId = data.user.connect.id;
  const applicationId = data.application.connect.id;
  const application = await ctx.db.query.rentalApplication(
    { where: { id: applicationId } },
    `{ id, chatId, applicants { user { id}}, owner { id, email } }`
  );
  applicantUserIds = application.applicants.map(applicant => applicant.user.id);
  if (applicantUserIds.includes(userId)) {
    throw new Error("You have already applied for this group!");
  }
  // add user application to rent application
  const rentalGroupApplicant = await ctx.db.mutation.createRentalGroupApplicant(
    {
      data: {
        ...data
      }
    },
    `{id}`
  );
  const fullApplicationData = await ctx.db.query.rentalApplication(
    { where: { id: applicationId } },
    info
  );
  // add user to the rentalApplicationChat
  ctx.db.mutation.updateChat({
    where: {
      id: application.chatId
    },
    data: {
      participants: {
        connect: [
          {
            id: ctx.request.userId
          }
        ]
      }
    }
  });

  newRentalGroupApplicantEmail({
    ctx: ctx,
    toEmail: application.owner.email,
    rentalApplication: fullApplicationData,
    applicantId: rentalGroupApplicant.id
  });
  return fullApplicationData;
}

module.exports = applyToRentalGroup;
