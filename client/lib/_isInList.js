/**
 *
 * @param {*} variable a single key
 * @param {*} list a list of either values or objects. if a list of objects the key param must be supplied
 * @param {*} key a key to identify what variable we are looking at
 */
const _isInList = (variable, list, key) => {
  if (!key) {
    return list.includes(variable);
  }
  return list.some(item => item[key] === variable);
};

export { _isInList };
export default _isInList;
