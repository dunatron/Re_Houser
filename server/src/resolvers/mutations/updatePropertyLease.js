const mustBeAuthed = require("../../lib/mustBeAuthed");
const updatePropertyLeaseEmail = require("../../lib/emails/updatePropertyLeaseEmail");
const { createActivity } = require("../../lib/createActivity");

async function updatePropertyLease(parent, { data, where }, ctx, info) {
  const reqUserId = await mustBeAuthed({
    ctx: ctx,
    errorMessage: "You must be logged in to update a lease"
  });
  // 1. get these values always as we need to ensure we have these details later on
  const lease = await ctx.db.query.propertyLease(
    {
      where: {
        ...where
      }
    },
    `{
      id
      stage
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
    }`
  );

  if (lease.stage === "SIGNED") {
    throw new Error(
      "This lease has been signed by all parties and confirmed by an Agent or Owner and cannot be altered"
    );
  }

  // easy accessors
  const lessorUsers = lease.lessors.map(lessor => lessor.user);
  const lesseeUsers = lease.lessees.map(lessee => lessee.user);
  const lessorIds = lease.lessors.map(lessor => lessor.user.id);
  const lesseeIds = lease.lessees.map(lessee => lessee.user.id);
  const lessorSignatures = lease.lessors.map(lessor => lessor.signed);
  const lesseeSignatures = lease.lessees.map(lessee => lessee.signed);

  const isALessor = lessorIds.includes(reqUserId);
  if (!isALessor) {
    throw new Error("You must be a lessor to update the property lease");
  }

  // update the lease, as it has passed all checks and unsign everyone
  const updatedLease = await ctx.db.mutation.updatePropertyLease(
    {
      data: {
        ...data,
        lessees: {
          update: lease.lessees.map((item, idx) => ({
            where: {
              id: item.id
            },
            data: {
              signed: false
            }
          }))
        },
        lessors: {
          update: lease.lessors.map((item, idx) => ({
            where: {
              id: item.id
            },
            data: {
              signed: false
            }
          }))
        }
      },
      where
    },
    info
  );

  // create some activity for an updated lease?
  createActivity({
    ctx: ctx,
    data: {
      title: "Lease Updated! Please sign again",
      content:
        "The lease has been updated which requires all parties to review the lease and sign it again",
      type: "LEASE_UPDATED",
      jsonObj: updatedLease,
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

  // send some emails about the lease being changed and needing to be signed?
  lessorUsers.map((usr, indx) => {
    updatePropertyLeaseEmail({
      baseLink: "landlord",
      ctx: ctx,
      lease: lease,
      toEmail: usr.email
    });
  });

  lesseeUsers.map((usr, indx) => {
    updatePropertyLeaseEmail({
      baseLink: "tenant",
      ctx: ctx,
      lease: lease,
      toEmail: usr.email
    });
  });

  return updatedLease;
}

module.exports = updatePropertyLease;
