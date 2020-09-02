const { transport, makeANiceEmail } = require("../../lib/mail");

async function acceptFriendRequest(parent, args, ctx, info) {
  const loggedInUser = ctx.request.userId;
  const friendRequestId = args.friendRequestId;
  // need to be logged in
  if (!loggedInUser) {
    throw new Error("You must be logged in!");
  }

  // 1. get the friendRequest object
  const friendRequest = await ctx.db.query.friendRequest(
    {
      where: {
        id: friendRequestId
      }
    },
    `{id, requestUser{id}, acceptingUser{id}}`
  );

  // 1. make the users friends
  const updatedUser = await ctx.db.mutation.updateUser(
    {
      where: {
        id: loggedInUser
      },
      data: {
        friends: {
          connect: {
            id: friendRequest.requestUser.id
          }
        }
      }
    },
    `{id, friends{id, firstName, email}}`
  );

  // delete the object
  await ctx.db.mutation.deleteFriendRequest({
    where: {
      id: friendRequestId
    }
  });

  return {
    message: "Friend Request accepted"
  };
}

module.exports = acceptFriendRequest;
