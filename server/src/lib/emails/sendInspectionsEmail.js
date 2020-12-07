const emailCEO = require("./emailCEO");

const sendInspectionsEmail = (subject, inspections) => {
  const body = inspections.reduce((acc, inspection) => {
    return (
      acc +
      `<div style="border: 1px solid #e91e63; padding: 8px; margin-bottom: 4px;">
                  <div>Id: ${inspection.id}</div>
                  <div>property: ${inspection.property.location}</div>
                  <div>date: ${moment(inspection.date).format(
                    "dddd, MMMM Do YYYY, h:mm:ss a"
                  )}
                  </div>
              </div>`
    );
  }, `<div><h2>Inspections List (${inspections.length})</h2></div>`);
  emailCEO({
    ctx: null,
    subject: subject,
    from: {
      name: "Rehouser Inspections",
      address: process.env.MAIL_USER
    },
    body: body
  });
};

module.exports = sendInspectionsEmail;
