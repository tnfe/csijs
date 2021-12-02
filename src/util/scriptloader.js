const urlStorage = {};
// ////////////////////////////////////////////////////////////////////
//
//      插入<script> 相关
//
// ////////////////////////////////////////////////////////////////////
const importScript = (src, callback, arg) => {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', src);
  document.getElementsByTagName('head')[0].appendChild(script);

  arg = arg || [];
  if (!(arg instanceof Array)) arg = [arg];

  if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') callback && callback.call(null, arg);
    };
  } else if (/gecko/.test(window.navigator.userAgent.toLowerCase())) {
    script.onload = () => {
      callback && callback.call(null, arg);
    };
  } else {
    callback && callback.call(null, arg);
  }
};

const hash = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

/**
 *  加载一个外部js
 * 1. URL.loadjs("//your.url.com/a.js",func);
 */
export const loadjs = (url, b, c) => {
  let onlyid; let callback;
  if (typeof b === 'function') {
    onlyid = `${hash(`${url}`)}`;
    callback = b;
  } else {
    onlyid = `${b}`;
    callback = c;
  }

  if (urlStorage[onlyid]) {
    callback();
  } else {
    const fun = importScript;
    fun.call(null, url, () => {
      urlStorage[onlyid] = true;
      callback();
    });
  }
};
