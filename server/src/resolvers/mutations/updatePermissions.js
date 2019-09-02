const { hasPermission } = require("../../lib/utils");

async function updatePermissions(parent, args, ctx, info) {
  // 1. Check if they are logged in
  if (!ctx.request.userId) {
    throw new Error("You must be logged in!");
  }
  // 2. Query the current user
  const currentUser = await ctx.db.query.user(
    {
      where: {
        id: ctx.request.userId
      }
    },
    info
  );
  // 3. Check if they have permissions to do this
  hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
  // 4. Update the permissions
  return ctx.db.mutation.updateUser(
    {
      data: {
        permissions: {
          set: args.permissions
        }
      },
      where: {
        id: args.userId
      }
    },
    info
  );
}

module.exports = updatePermissions;
