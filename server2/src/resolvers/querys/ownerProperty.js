async function ownerProperty(parent, { id }, ctx, info) {
  return ctx.db.query.property({ where: { id: id } }, info);
}

module.exports = ownerProperty;
