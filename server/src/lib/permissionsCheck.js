exports._isAdmin = ctx => {
  const userPermissions = ctx.request.userPermissions;
  if (!userPermissions) return false;
  return userPermissions.includes("ADMIN");
};

exports._isWizard = ctx => {
  const userPermissions = ctx.request.userPermissions;
  if (!userPermissions) return false;
  return userPermissions.includes("WIZARD");
};
