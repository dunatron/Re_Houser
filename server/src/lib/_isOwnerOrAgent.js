exports._isOwnerOrAgent = ({ property, ctx }) => {
  const userId = ctx.request.userId;
  const userPermissions = ctx.request.userPermissions;
  const ownerIds = property.owners.map(owner => owner.id);
  const agentIds = property.agents.map(agent => agent.id);

  if (userPermissions.includes("WIZARD")) {
    return true;
  }
  if (agentIds.includes(userId)) {
    return true;
  }
  if (ownerIds.includes(userId)) {
    return true;
  }

  return false;
};
