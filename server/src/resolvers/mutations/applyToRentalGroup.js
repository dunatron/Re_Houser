async function applyToRentalGroup(parent, { data }, ctx, info) {
  // ToDo: send email to current group members
  const userId = data.user.connect.id;
  const applicationId = data.application.connect.id;
  const application = await ctx.db.query.rentalApplication(
    { where: { id: applicationId } },
    `{ id, applicants { user { id}} }`
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

  return fullApplicationData;
}

module.exports = applyToRentalGroup;