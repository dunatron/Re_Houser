import moment from 'moment';

const _usersAge = age => {
  if (!age) return 'Age not defined';
  var a = moment();
  var b = moment(age, 'YYYY');
  var diff = a.diff(b, 'years'); // calculates patient's age in years
  diff; // this prints out the age
  return diff;
};

export default _usersAge;
