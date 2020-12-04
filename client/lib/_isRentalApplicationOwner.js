const _isRentalApplicationOwner = (userId, owner) => {
  return userId === owner.id;
};

export { _isRentalApplicationOwner };
export default _isRentalApplicationOwner;
