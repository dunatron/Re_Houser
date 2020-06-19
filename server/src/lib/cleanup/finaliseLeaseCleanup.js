const unsuccessfulLeaseEmail = require("../emails/unsuccessfulLeaseEmail");
const unsuccessfulRentalApplicationEmail = require("../emails/unsuccessfulRentalApplicationEmail");

const finaliseLeaseCleanup = async ({ leaseId, propertyId, db }) => {
  db.query
    .property(
      {
        where: {
          id: propertyId
        }
      },
      `{ 
        id
        location
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
        leases(where:{
            AND:[
              {
                id_not: "${leaseId}"
              },
              {
                stage_not_in: [
                  SIGNED,
                  PAID,
                  COMPLETED
                ]
              }
            ]
          }) {
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
    .then(property => {
      const { rentalApplications, leases } = property;
      rentalApplications.forEach(application => {
        application.applicants.forEach(applicant => {
          // send emails
          unsuccessfulRentalApplicationEmail({
            toEmail: applicant.user.email,
            user: applicant.user,
            property: property
          });
        });
        // close rentalApplications
      });

      leases.forEach(lease => {
        const { lessees, lessors } = lease;
        // send emails
        lessees.forEach(lessee => {
          unsuccessfulLeaseEmail({
            toEmail: lessee.user.email,
            user: lessee.user,
            property: property
          });
        });
        // delete the unsuccessful leases
      });

      // delete leases and rental applications
      db.mutation.updateProperty({
        where: {
          id: propertyId
        },
        data: {
          rentalApplications: {
            deleteMany: [
              {
                id_not: "deleteThemAll"
              }
            ]
          },
          leases: {
            deleteMany: [
              {
                id_not: leaseId
              }
            ]
          }
        }
      });
    });
  console.log("== FINALISE LEASE CLEANUP ==");
  return;
};

module.exports = finaliseLeaseCleanup;
