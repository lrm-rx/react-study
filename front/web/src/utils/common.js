export const debounce = (fn, wait = 500) => {
  let timeout;
  return (...rest) => {
    const args = rest;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
// 判断null, 空值, undefined
export const empty = (e) => {
  switch (e) {
    case "":
    case null:
    case undefined:
      return true;
    default:
      return false;
  }
};

export const checkFormData = (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (empty(data[key])) {
        return true;
      }
      return false;
    }
  }
};
// 将{id: 1, uname: "lck"} 转化为 [{id: 1}, {uname: "lck"}]并去前后空格
export const objToArray = (obj) => {
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    throw new Error("This is not an object!");
  }
  let array = [];
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // array.push({ [key]: object[key] });
      array = [
        ...array,
        {
          [key]:
            Object.prototype.toString.call(obj[key]) === "[object String]"
              ? obj[key].trim()
              : obj[key],
        },
      ];
    }
  }
  return array;
};
// 对象属性值去前后空格
export const handleTrim = (obj) => {
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    throw new Error("This is not an object!");
  }
  let tempObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      tempObj = {
        ...tempObj,
        [key]:
          Object.prototype.toString.call(obj[key]) === "[object String]"
            ? obj[key].trim()
            : obj[key],
      };
    }
  }
  return tempObj;
};
