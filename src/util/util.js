const obj2Str = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return obj;
  }
};

const str2Obj = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

const slice = (arr, max) => {
  let index = 0;
  const oarr = [];
  for (let i = arr.length - 1; i > -1; i--) {
    index += 1;
    if (index >= max) break;
    oarr.push(arr[i]);
  }

  return oarr;
};

const split = (str, ch) => {
  if (str.split) {
    return str.split(ch);
  }
  let pos;
  let start = 0;
  const result = [];

  while ((pos = str.indexOf(ch, start)) !== -1) {
    result.push(str.substring(start, pos));
    start = pos + 1;
  }

  result.push(str.substr(start));

  return result;
};

const extend = (...params) => {
  // 兼容问题
  const target = params[0];
  const args = Array.prototype.slice.call(params, 1);

  for (let i = 0; i < args.length; i++) {
    const obj = args[i];
    for (const id in obj) {
      target[id] = obj[id];
    }
  }

  return target;
};

const reset = (obj) => {
  for (const id in obj) {
    obj[id] = '';
  }

  return obj;
};

const arrIsNull = (arr) => {
  if (!arr) return true;
  if (!arr.length) return true;

  let index = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    if (!arr[i]) {
      index += 1;
    }
  }
  return index > arr.length - 1;
};

const formatTime = (time) => {
  const date = new Date(parseInt(time, 10));
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${date.getDate()} `;
  const h = `${date.getHours()}:`;
  const m = `${date.getMinutes()}:`;
  const s = date.getSeconds();

  return Y + M + D + h + m + s;
};

const getID = (length) => {
  const alphaBet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  length = length || 9;

  let id = '';
  for (let i = 0; i < length; i++) {
    id += alphaBet.charAt(Math.floor(Math.random() * alphaBet.length));
  }

  return id;
};

export {
  obj2Str,
  str2Obj,
  slice,
  split,
  extend,
  reset,
  arrIsNull,
  formatTime,
  getID,
};
