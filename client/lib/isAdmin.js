const isAdmin = me => {
  if (!me) return false;
  if (!me.permissions) return false;
  if (me.permissions.length < 0) return false;
  if (me.permissions.includes('ADMIN')) return true;
};

export { isAdmin };
export default isAdmin;
