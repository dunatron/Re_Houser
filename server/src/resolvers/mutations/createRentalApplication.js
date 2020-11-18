const newRentalApplicationEmail = require("../../lib/emails/newRentalApplicationEmail");
const mustBeAuthed = require("../../lib/mustBeAuthed");
const createChat = require("./createChat");

async function createRentalApplication(parent, { data, files }, ctx, info) {
  const loggedInUserId = ctx.request.userId;
  // const loggedInUserId = "ckhlefwazex040a26wtnftnvi";

  // const zzzzz = await ctx.db.mutation.createRentalApplication(
  //   {
  //     data: {
  //       ...data

  //       // chatId: applicationChat.id
  //     }
  //   },
  //   info
  // );

  // return zzzzz;

  if (!loggedInUserId) {
    throw new Error("You must be logged in to create a property!");
  }
  await mustBeAuthed({ ctx: ctx });
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

  /**
   * ALL CLEAR TO CREATE NEW APPLICATION
   */

  // await rental applications chat creation
  const applicationChat = await createChat(
    parent,
    {
      data: {
        type: "GROUP",
        name: data.title,
        participants: {
          connect: [
            {
              id: loggedInUserId
            }
          ]
        }
      }
    },
    ctx,
    info
  );

  const rentalApplication = await ctx.db.mutation.createRentalApplication(
    {
      data: {
        ...data,
        owner: {
          connect: {
            id: loggedInUserId
          }
        },
        chatId: applicationChat.id,
        applicants: {
          create: {
            approved: true,
            completed: false,
            user: {
              connect: {
                id: loggedInUserId
              }
            }
          }
        }
      }
    },
    info
  );

  // not sure why i thought this would have needed the profilePhot. It was blowing up sometimes too
  // const rentalGroupNode = await ctx.db.mutation.createRentalGroupApplicant(
  //   {
  //     data: {
  //       user: {
  //         connect: {
  //           id: ctx.request.userId
  //         }
  //       },
  //       approved: true,
  //       application: {
  //         connect: {
  //           id: rentalApplication.id
  //         }
  //       }
  //     }
  //   },
  //   `{ id, firstName, lastName, email, approved, completed,
  //     user{
  //       id, firstName, lastName, phone, email, rehouserStamp
  //       photoIdentification {
  //         id
  //         url
  //         createdAt
  //       }
  //     }
  //   }`
  // );
  // const rentalGroupNode = await ctx.db.mutation.createRentalGroupApplicant({
  //   data: {
  //     user: {
  //       connect: {
  //         id: ctx.request.userId
  //       }
  //     },
  //     approved: true,
  //     application: {
  //       connect: {
  //         id: rentalApplication.id
  //       }
  //     }
  //   }
  // });

  // rentalApplication.applicants.push({ ...rentalGroupNode });

  // send email
  // newRentalApplicationEmail({
  //   toEmail: rentalApplication.owner.email,
  //   rentalApplication: rentalApplication,
  //   user: rentalGroupNode.user
  // });
  return rentalApplication;
}

module.exports = createRentalApplication;
