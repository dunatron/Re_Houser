const unsuccessfulLeaseEmail = require("../emails/unsuccessfulLeaseEmail");
const unsuccessfulRentalApplicationEmail = require("../emails/unsuccessfulRentalApplicationEmail");
const { updatePropertySearchNode } = require("../algolia/propertySearchApi");

const finaliseLeaseCleanup = async ({ leaseId, propertyId, ctx }) => {
  ctx.db.query
    .property(
      {
        where: {
          id: propertyId,
        },
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
                stage_in: [
                  INITIALIZING
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
    .then((property) => {
      const { rentalApplications, leases } = property;
      rentalApplications.forEach((application) => {
        application.applicants.forEach((applicant) => {
          // send emails
          unsuccessfulRentalApplicationEmail({
            toEmail: applicant.user.email,
            user: applicant.user,
            property: property,
          });
        });
        // close rentalApplications
      });

      leases.forEach((lease) => {
        const { lessees, lessors } = lease;
        // send emails
        lessees.forEach((lessee) => {
          unsuccessfulLeaseEmail({
            toEmail: lessee.user.email,
            user: lessee.user,
            property: property,
          });
        });
        // delete the unsuccessful leases
      });

      // update algolia property
      updatePropertySearchNode({
        updates: {
          data: {
            onTheMarket: false,
            isLeased: true,
          },
        },
        propertyId: property.id,
        ctx,
      });

      // delete leases and rental applications
      ctx.db.mutation.updateProperty({
        where: {
          id: propertyId,
        },
        data: {
          onTheMarket: false,
          lastLeaseId: leaseId,
          isLeased: true,
          rentalApplications: {
            deleteMany: [
              {
                id_not: "deleteThemAll",
              },
            ],
          },
          leases: {
            deleteMany: [
              {
                AND: [
                  {
                    id_not: leaseId,
                  },
                  {
                    stage_in: ["INITIALIZING"], // only delete leases that never made it
                  },
                ],
              },
            ],
          },
        },
      });
    });
  return;
};

module.exports = finaliseLeaseCleanup;
