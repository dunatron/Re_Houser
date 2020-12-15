const { createCard, chargeCard } = require("../../lib/paymentAPI");
const finalisePropertyLeaseEmail = require("../../lib/emails/finalisePropertyLeaseEmail");
const mustBeAuthed = require("../../lib/mustBeAuthed");
const { createActivity } = require("../../lib/createActivity");
const getBondAmount = require("../../lib/payments/getBondAmount");

const {
  _assertCanManageProperty
} = require("../../lib/_assertCanManageProperty");

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

  const loggedUserWithData = await ctx.db.query.user(
    {
      where: {
        id: reqUserId
      }
    },
    `{
    id
    permissions
  }`
  );

  const isAdmin = loggedUserWithData.permissions.includes("ADMIN");

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
      bondType
      lessors {
        id
        signed
        user {
          id
          email
          firstName
          lastName
        }
      }
      lessees {
        id
        signed
        user {
          id
          email
          firstName
          lastName
        }
      }
      property {
        id
        location
        rehouserManaged
        owners {
          id
          email
        }
        agents {
          id
          email
        }
      }
      wallet {
        id
        amount
      }
    }`
  );

  await _assertCanManageProperty({
    property: lease.property,
    ctx: ctx
  });

  const isRehouserManaged = lease.property.rehouserManaged;

  // easy accessors
  const lessorUsers = lease.lessors.map(lessor => lessor.user);
  const lesseeUsers = lease.lessees.map(lessee => lessee.user);
  const lessorIds = lease.lessors.map(lessor => lessor.user.id);
  const lesseeIds = lease.lessees.map(lessee => lessee.user.id);
  const lessorSignatures = lease.lessors.map(lessor => lessor.signed);
  const lesseeSignatures = lease.lessees.map(lessee => lessee.signed);

  // must be a lessor to finalise lease
  const isALessor = lessorIds.includes(reqUserId);
  if (!isALessor && !isAdmin) {
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
            amount: lease.wallet.amount - (lease.rent + getBondAmount(lease)),
            charges: {
              create: [
                {
                  reason: "RENT",
                  amount: lease.rent,
                  description: "We require 1 weeks rent in advance"
                }
                // no longer going to charge to bond when an agent finalises the lease
                // {
                //   amount: getBondAmount(lease),
                //   description: `We require the bond in advance ${lease.bondType}`
                // }
              ]
            }
          }
        }
      }
    },
    info
  );

  const combinedLease = {
    ...lease,
    ...acceptedLease
  };

  // cleanup unsuccessful leases and rentalApplications
  finaliseLeaseCleanup({
    leaseId: leaseId,
    propertyId: lease.property.id,
    ctx: ctx
  });

  // THIS DIDNT SEEM TO FIRE BELOW. added user, probs does now
  // success emails to lessors
  lessorUsers.map((usr, indx) => {
    finalisePropertyLeaseEmail({
      baseLink: "landlord",
      ctx: ctx,
      lease: combinedLease,
      // payment: payment,
      wallet: combinedLease.wallet,
      toEmail: usr.email,
      user: usr
    });
  });

  // success emails to lessees
  lesseeUsers.map((usr, indx) => {
    finalisePropertyLeaseEmail({
      baseLink: "tenant",
      ctx: ctx,
      lease: combinedLease,
      // payment: payment,
      wallet: combinedLease.wallet,
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
      jsonObj: combinedLease,
      propertyLease: {
        connect: {
          id: combinedLease.id
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

  return acceptedLease; // acccepted lease will return exactly what they ask for satisfy gql
}

module.exports = finalisePropertyLease;
