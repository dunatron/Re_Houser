const mustBeAuthed = async function({ ctx, errorMessage }) {
  const loggedInUserId = await ctx.request.userId;
  if (!loggedInUserId) {
    throw new Error(errorMessage ? errorMessage : "You must be logged in!");
  }
  return loggedInUserId;
};

module.exports = mustBeAuthed;
