async function chatFeed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {};

  const links = await context.prisma.messages({
    where
  });
  return links;
}

module.exports = chatFeed;
