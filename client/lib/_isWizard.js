const _isWizard = me => {
  if (!me) return false;
  if (!me.permissions) return false;
  if (me.permissions.length < 0) return false;
  if (me.permissions.includes('WIZARD')) return true;
};

export { _isWizard };
export default _isWizard;
