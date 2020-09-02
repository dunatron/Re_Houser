async function createInspection(parent, args, ctx, info) {
  // ToDo: inspections will be carried out by a user. this relationship field on the Inspection is called inspector. on the user it is called inspections and is
  // an [] of Inspections. the relationship is called InspectionInspector
  // an inspection will consule 30 minutes. So an inspector cannot have an inspection on the same day as the creating 1

  // 1. see if we can get all inspectiosn that would fall within the new creation date that has that user
  // if it does we throw an error stating that they already have an inspection obligation on this day.
  /// what we havnt accounted for is inspections and viewing and anything else to come. these things also should not clash.

  // throw new Error("ToDo check for inspection clashings")

  // ideally, we have a seperate function for assigning staff to an inspection
  // that way we can create inspections and try assign staff after
  const inspection = await ctx.db.mutation.createInspection(
    {
      ...args
    },
    info
  );

  return inspection;
}

module.exports = createInspection;
