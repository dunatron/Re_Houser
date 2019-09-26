exports.extractFileKey = url => {
  const regex = /(?=\w+\.\w{3,4}$).+/;
  let m;
  let filename;

  if ((m = regex.exec(url)) !== null) {
    m.forEach((match, groupIndex) => {
      filename = match;
    });
  }
  const removeExtensionRegex = /(.*)\.[^.]+$/;
  const str = filename;
  let m1;
  let key;

  if ((m1 = removeExtensionRegex.exec(str)) !== null) {
    m1.forEach((match, groupIndex) => {
      key = match;
    });
  }
  return key;
};
