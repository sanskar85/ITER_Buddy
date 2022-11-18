export const sameObjects = (obj1, obj2) => {
  const obj1Length = Object.keys(obj1).length;
  const obj2Length = Object.keys(obj2).length;

  if (obj1Length === obj2Length) {
    return Object.keys(obj1).every(
      key => obj2.hasOwnProperty(key) && obj2[key] === obj1[key],
    );
  }
  return false;
};

export const sameArrayOfObjects = (obj1, obj2) => {
  if (!obj1 || !obj2) {
    return false;
  }
  if (!Array.isArray(obj1) || !Array.isArray(obj2)) {
    return false;
  }
  if (obj1.length !== obj2.length) {
    return false;
  }

  for (let i = 0; i < obj1.length; i++) {
    if (!sameObjects(obj1[i], obj2[i])) {
      return false;
    }
  }
  return true;
};

export const sameSubjects = (array1, array2) => {
  if (!array1 || !array2) {
    return false;
  }
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }
  if (array1.length !== array2.length) {
    return false;
  }

  const results = array1.filter(
    ({code: code1}) => !array2.some(({code: code2}) => code1 === code2),
  );

  return results.length === 0;
};

export const generateLightColorHex = () => {
  let color = '#';
  for (let i = 0; i < 3; i++) {
    color += (
      '0' + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  }
  return color;
};

export const generateDarkColorHex = () => {
  let color = '#';
  for (let i = 0; i < 3; i++) {
    color += (
      '0' + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  }
  return color;
};
