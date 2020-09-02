async function files(parent, args, context, info) {
  return context.db.query.files(args, info);
}

module.exports = files;
