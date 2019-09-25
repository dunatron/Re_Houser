import validator from 'validator';

export default function errorsBagGenerator(dataObject) {
  // Fix this properly later
  const errorsBag = {};
  Object.keys(dataObject).map(conf => {
    const currentObj = dataObject[conf];
    let typeErrors = undefined;
    if (currentObj.validation) {
      const currentVarErrors = currentObj.validation.reduce((errors, conf) => {
        try {
          const objValue = currentObj.value;
          const objKey = conf.key;
          const reverse = conf.reverse;
          let isValid = validator[conf.key](currentObj.value);
          if (reverse) {
            isValid = !isValid;
          }
          if (isValid) return errors;
          errors.push(conf.message);
          return errors;
        } catch (e) {
          errors.push(conf.message);
          return errors;
        }
      }, []);
      // no error so break early and dont add variable to errors bag
      if (currentVarErrors.length === 0) return;
      const errorsObject = { errors: currentVarErrors };
      typeErrors = errorsObject;
      errorsBag[[currentObj.variableName]] = typeErrors;
    }
  });
  return errorsBag;
}
