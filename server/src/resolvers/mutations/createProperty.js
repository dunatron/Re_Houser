const { processUpload, deleteFile } = require("../../lib/fileApi");

var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../lib/documents/test.docx");

async function createProperty(parent, { data, files }, ctx, info) {
  const uploadedFiles = files
    ? await Promise.all(files.map(file => processUpload(file, ctx)))
    : [];
  const connectFileIds = uploadedFiles.map(file => ({ id: file.id }));
  // get room Prices
  const roomPrices = data.accommodation.create.map((a, i) => a.rent);
  // get lowest roomPrice
  const lowestRoomPrice = parseFloat(Math.min(...roomPrices));
  const highestRoomPrice = parseFloat(Math.max(...roomPrices));
  const averageRoomPrice =
    roomPrices.reduce((a, b) => a + b, 0) / roomPrices.length;

  const property = await ctx.db.mutation.createProperty(
    {
      data: {
        ...data,
        lowestRoomPrice,
        highestRoomPrice,
        rent: averageRoomPrice,
        images: {
          connect: connectFileIds
        }
      }
    },
    info
  );
  // const propertySearchNode = addPropertySearchNode({
  //   propertyId: property.id,
  //   ctx,
  // })
  addPropertySearchNode({
    propertyId: property.id,
    ctx
  });
}

module.exports = createProperty;
