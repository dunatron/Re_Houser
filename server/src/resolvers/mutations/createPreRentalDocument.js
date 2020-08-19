const { convertDocument } = require("../../lib/DocGenerator");
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../../lib/documents/test.docx");

async function createPreRentalDocument(
  parent,
  { rentalGroupApplicantId, file },
  ctx,
  info
) {
  const user = await ctx.db.query.user({
    where: {
      id: ctx.request.userId
    }
  });
  const uploadedTemplateData = {
    test: "I am test data for the document",
    userId: ctx.request.userId,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    userEmail: user.email
  };
  var myJSON = JSON.stringify(uploadedTemplateData);
  var data = await fs.readFileSync(filePath);

  var docyBuf = convertDocument(myJSON, data);

  return docyBuf;
}

module.exports = createPreRentalDocument;
