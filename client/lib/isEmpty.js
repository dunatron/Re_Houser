/**
 * I am 2 ways about this. Do I display my absolute power(Jiren)
 * Or do I leverage my powerful friend and allies for such things https://ramdajs.com/
 */
const isEmptyObj = obj => {
  // this is why ramda is better
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false
  }

  return JSON.stringify(obj) === JSON.stringify({})
}

export { isEmptyObj }
