const { createCard, chargeCard } = require("../../lib/paymentAPI");
const finalisePropertyLeaseEmail = require("../../lib/emails/finalisePropertyLeaseEmail");
const mustBeAuthed = require("../../lib/mustBeAuthed");
const { createActivity } = require("../../lib/createActivity");

// cleanup
const finaliseLeaseCleanup = require("../../lib/cleanup/finaliseLeaseCleanup");

/**
 * ToDo: the return type of Message is not good enough, it should return probably what propertylease and whatever fields the client asks for
 */
async function finalisePropertyLease(parent, args, ctx, info) {
  const reqUserId = await mustBeAuthed({
    ctx: ctx,
    errorMessage: "You must be logged in to finalise a lease"
  });
  const leaseId = args.leaseId;
  // 1. get the property lease via the id and all of the data we will need
  const lease = await ctx.db.query.propertyLease(
    {
      where: {
        id: leaseId
      }
    },
    `{
      id
      rent
      lessors {
        id
        signed
        user {
          id
          email
        }
      }
      lessees {
        id
        signed
        user {
          id
          email
        }
      }
      property {
        id
      }
      wallet {
        id
        amount
      }
    }`
  );

  // easy accessors
  const lessorUsers = lease.lessors.map(lessor => lessor.user);
  const lesseeUsers = lease.lessees.map(lessee => lessee.user);
  const lessorIds = lease.lessors.map(lessor => lessor.user.id);
  const lesseeIds = lease.lessees.map(lessee => lessee.user.id);
  const lessorSignatures = lease.lessors.map(lessor => lessor.signed);
  const lesseeSignatures = lease.lessees.map(lessee => lessee.signed);

  // must be a lessor to finalise lease
  const isALessor = lessorIds.includes(reqUserId);
  if (!isALessor) {
    throw new Error("You must be a lessor to finalise this lease");
  }

  // all lessors must have signed the lease(usually just one)
  const allLessorsSigned = !lessorSignatures.includes(false);
  if (!allLessorsSigned) {
    throw new Error("Not all lessors have signed this lease yet");
  }

  // all lessees must have signed the lease
  const allLesseesSigned = !lesseeSignatures.includes(false);
  if (!allLesseesSigned) {
    throw new Error("Not all lessees have signed this lease yet");
  }

  // stage needs to be updated
  const acceptedLease = await ctx.db.mutation.updatePropertyLease(
    {
      where: {
        id: leaseId
      },
      data: {
        stage: "SIGNED",
        wallet: {
          update: {
            amount: lease.wallet.amount - lease.rent,
            charges: {
              create: {
                amount: lease.rent,
                description: "We require 1 weeks rent in advance hence a charge"
              }
            }
          }
        }
      }
    },
    info
  );

  // cleanup unsuccessful leases and rentalApplications
  finaliseLeaseCleanup({
    leaseId: leaseId,
    propertyId: lease.property.id,
    db: ctx.db
  });

  // THIS DIDNT SEEM TO FIRE BELOW. added user, probs does now
  // success emails to lessors
  lessorUsers.map((usr, indx) => {
    finalisePropertyLeaseEmail({
      ctx: ctx,
      lease: lease,
      // payment: payment,
      wallet: lease.wallet,
      toEmail: usr.email,
      user: usr
    });
  });

  // success emails to lessees
  lesseeUsers.map((usr, indx) => {
    finalisePropertyLeaseEmail({
      ctx: ctx,
      lease: lease,
      // payment: payment,
      wallet: lease.wallet,
      toEmail: usr.email,
      user: usr
    });
  });

  // create activity for system
  createActivity({
    ctx: ctx,
    data: {
      title: "Lease FINALISED!",
      content:
        "Congratulations a new property lease has been signed by everyone and finalised by the owner",
      type: "LEASE_FINALISED",
      jsonObj: lease,
      propertyLease: {
        connect: {
          id: lease.id
        }
      },
      user: {
        connect: {
          id: reqUserId
        }
      },
      involved: {
        connect: [
          ...lessorIds.map(id => ({ id: id })),
          ...lesseeIds.map(id => ({ id: id }))
        ]
      }
    }
  });

  return acceptedLease;
}

module.exports = finalisePropertyLease;
