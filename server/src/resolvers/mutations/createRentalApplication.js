const newRentalApplicationEmail = require("../../lib/emails/newRentalApplicationEmail");
const mustBeAuthed = require("../../lib/mustBeAuthed");

async function createRentalApplication(parent, { data, files }, ctx, info) {
  // await mustBeAuthed({ ctx: ctx });
  const currentApplications = await ctx.db.query.rentalApplications(
    {
      where: {
        property: {
          id: data.property.connect.id
        }
      }
    },
    `{ id, owner {id} applicants { user { id}} }`
  );
  const applicationOwnerIds = currentApplications.map(
    application => application.owner.id
  );
  if (applicationOwnerIds.includes(ctx.request.userId)) {
    const userApplication = currentApplications.find(
      application => application.owner.id === ctx.request.userId
    );
    const fullApplication = ctx.db.query.rentalApplication(
      {
        where: { id: userApplication.id }
      },
      info
    );
    return fullApplication;
  }
  const rentalApplication = await ctx.db.mutation.createRentalApplication(
    {
      data: {
        ...data
      }
    },
    info
  );

  // not sure why i thought this would have needed the profilePhot. It was blowing up sometimes too
  const rentalGroupNode = await ctx.db.mutation.createRentalGroupApplicant(
    {
      data: {
        user: {
          connect: {
            id: ctx.request.userId
          }
        },
        approved: true,
        application: {
          connect: {
            id: rentalApplication.id
          }
        }
      }
    },
    `{ id, firstName, lastName, email, approved, completed ,user{id, firstName, lastName, phone, email, rehouserStamp}}`
  );

  rentalApplication.applicants.push({ ...rentalGroupNode });

  // send email
  newRentalApplicationEmail({
    toEmail: rentalApplication.owner.email,
    rentalApplication: rentalApplication,
    user: rentalGroupNode.user
  });
  return rentalApplication;
}

module.exports = createRentalApplication;
