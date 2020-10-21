exports._assertCanManageProperty = async ({ property, ctx }) => {

    const loggedInUserId = ctx.request.userId;

    const isRehouserManaged = property.rehouserManaged;

    const ownerIds = property.owners.map(owner => owner.id);
    const agentIds = property.agents.map(agent => agent.id);

    if (isRehouserManaged && agentIds.includes(loggedInUserId)) {
        return true
    }

    if(!isRehouserManaged && ownerIds.includes(loggedInUserId)) {
        return true
    }

    // last check 
    const loggedUserWithData = await ctx.db.query.user(
        {
          where: {
            id: loggedInUserId
          }
        },
        `{
        id
        permissions
      }`
    );

    const isAdmin = loggedUserWithData.permissions.includes("ADMIN");
    const isWizard = loggedUserWithData.permissions.includes("WIZARD");

    if (isWizard) {
        return true
    }
    // begin to throw errors
    if (isAdmin) {
        throw new Error(
            "It is not enough to be an admin, you must be an agent for the property. Get a Wizard to add you as an Agent"
        );
    }
    if (isRehouserManaged && ownerIds.includes(loggedInUserId)) {
        throw new Error(
            "While you are an owner this is rehouser managed and only a rehouser Agent can perform this action"
        );
    }
    if (!isRehouserManaged && agentIds.includes(loggedInUserId)) {
      throw new Error(
          "While you are an Agent this property is not currently managed by rehouser"
      );
    }

    return false
};