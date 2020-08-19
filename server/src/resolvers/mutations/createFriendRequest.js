async function createFriendRequest(parent, args, ctx, info) {
  const { data } = args;
  const loggedInUserId = await ctx.request.userId;
  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }
  if (data.acceptingUser.connect.id == loggedInUserId) {
    throw new Error("You cannot be friends with yourself you vain twat!");
  }

  // 1. get accepting user data
  const acceptingUser = await ctx.db.query.user(
    {
      where: {
        id: data.acceptingUser.connect.id
      }
    },
    `{ id ,friendRequests{id, requestUser{id}, acceptingUser{id}}}`
  );

  // 2. check if accepting user already has a pending request
  if (acceptingUser.friendRequests) {
    const { friendRequests } = acceptingUser;
    const friendRequesterIds = friendRequests.map(
      friendRequest => friendRequest.requestUser.id
    );
    if (friendRequesterIds.includes(loggedInUserId)) {
      throw new Error("Friend request already pending!");
    }
  }

  // finally create the friend request
  const friendRequest = await ctx.db.mutation.createFriendRequest(
    {
      data: {
        ...data,
        requestUser: {
          connect: {
            id: loggedInUserId
          }
        }
      }
    },
    info
  );

  return friendRequest;
}

module.exports = createFriendRequest;
