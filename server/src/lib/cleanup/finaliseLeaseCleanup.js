const finaliseLeaseCleanup = async ({ leaseId, propertyId, db }) => {
  console.log("== FINALISE LEASE CLEANUP START ==");
  const property = db.query
    .property(
      {
        where: {
          id: propertyId
        }
      },
      `{ 
        id, 
        rentalApplications {
          leaseId
          applicants {
            email
            user {
              id
              email
              firstName
              lastName
            }
          }
        }
        leases {
          id
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
        }
      }`
    )
    .then(res => {
      console.log("WEll surely res => ", res);
      const { rentalApplications, leases } = res;

      // hmmm well leases to remove. not COMPLETED, SIGNED.
      // JUST INITIALIZING????

      // remove allrentalApplications and send email to all excepet for the one with this leaseId

      // maybe instead of awaitig for it we should cleanup when it can
    });
  console.log("== FINALISE LEASE CLEANUP ==");
  return;
};

module.exports = finaliseLeaseCleanup;
