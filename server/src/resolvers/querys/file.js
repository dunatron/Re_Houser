async function file(parent, { id }, context, info) {
  return context.db.query.file({ where: { id } }, info);
}

module.exports = file;
