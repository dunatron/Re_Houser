const { createCard, chargeCard } = require("../../lib/paymentAPI");
const finalisePropertyLeaseEmail = require("../../lib/emails/finalisePropertyLeaseEmail");
const mustBeAuthed = require("../../lib/mustBeAuthed");
const { createActivity } = require("../../lib/createActivity");

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

  if (!lease.wallet) {
    throw new Error(
      "For some reason your lease has no wallet. Please contact support as this shouldnt happen"
    );
  }

  // can only leagally hold 1 weeks worth of rent
  if (lease.wallet.amount < lease.rent) {
    throw new Error(
      `Wallet Amount: ($${lease.wallet.amount}) -  You need to supply ($${lease.rent})
        2 weeks worth of rent to the lease wallet before the lease can go into full effect 
        `
    );
  }
  /**
   * NO LONGER CHARGING CLIENT ON SUCCESSFUL SIGN UP
   */
  // get logged in user and primaryCard data to charge
  // const loggedInUser = await ctx.db.query.user(
  //   {
  //     where: {
  //       id: reqUserId,
  //     },
  //   },
  //   `{
  //     id
  //     email
  //     primaryCreditCard {
  //       id
  //       stripeCardId
  //       stripeCustomerId
  //       fingerprint
  //       country
  //       brand
  //       exp_month
  //       exp_year
  //       last4
  //       name
  //     }
  //   }`
  // );

  // // logged in user must have a set primary credit card
  // // if (!loggedInUser.primaryCreditCard) {
  // //   throw new Error("You must have a credit card");
  // // }

  // // charge logged in users primary credit card 69 dollars always, because help me help u
  // const payment = await chargeCard({
  //   stripeCustomerId: loggedInUser.primaryCreditCard.stripeCustomerId,
  //   amount: 69,
  //   currency: "NZD",
  //   userId: loggedInUser.id,
  //   leaseId: leaseId,
  //   propertyId: lease.property.id,
  // });

  // accept the lease and finalise it
  const acceptedLease = ctx.db.mutation.updatePropertyLease(
    {
      where: {
        id: leaseId
      },
      data: {
        stage: true
      }
    },
    info
  );

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

  lessorUsers.map((usr, indx) => {
    finalisePropertyLeaseEmail({
      ctx: ctx,
      lease: lease,
      // payment: payment,
      wallet: lease.wallet,
      toEmail: usr.email
    });
  });

  lesseeUsers.map((usr, indx) => {
    finalisePropertyLeaseEmail({
      ctx: ctx,
      lease: lease,
      // payment: payment,
      wallet: lease.wallet,
      toEmail: usr.email
    });
  });

  return acceptedLease;
}

module.exports = finalisePropertyLease;
