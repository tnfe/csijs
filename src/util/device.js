let composeUserAgent;
// ////////////////////////////////////////////////////////////////
//
//      浏览器检测 http://www.bkjia.com/Javascript/1153785.html
//
// ////////////////////////////////////////////////////////////////
const BROWSER = {
  qq: /\bm?qqbrowser\/([0-9.]+)/,
  360: (ua) => {
    if (ua.indexOf('360 aphone browser') !== -1) return /\b360 aphone browser \(([^\)]+)\)/;
    return /\b360(?:se|ee|chrome|browser)\b/;
  },
  aoyou: /\baoyou/,
  webview: /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/,
  firefox: /\bfirefox\/([0-9.ab]+)/,
  chrome: / (?:chrome|crios|crmo)\/([0-9.]+)/,
  ie: /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/,
  // Android 默认浏览器。该规则需要在 safari 之前。
  android: (ua) => {
    if (ua.indexOf('android') === -1) {
      return '';
    }
    return /\bversion\/([0-9.]+(?: beta)?)/;
  },
  safari: /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//,
  opera: /\bopera/,
  unknow: 'unknow',
};

// ////////////////////////////////////////////////////////////////
//
//      系统检测
//
// ////////////////////////////////////////////////////////////////
const OS = {
  windows: /\bwindows nt ([0-9.]+)/,
  macosx: /\bmac os x ([0-9._]+)/,
  linux: 'linux',

  wphone: (ua) => {
    if (ua.indexOf('windows phone ') !== -1) {
      return /\bwindows phone (?:os )?([0-9.]+)/;
    }
    if (ua.indexOf('xblwp') !== -1) {
      return /\bxblwp([0-9.]+)/;
    }
    if (ua.indexOf('zunewp') !== -1) {
      return /\bzunewp([0-9.]+)/;
    }
    return 'windows phone';
  },

  ios: (ua) => {
    if (/\bcpu(?: iphone)? os /.test(ua)) {
      return /\bcpu(?: iphone)? os ([0-9._]+)/;
    }
    if (ua.indexOf('iph os ') !== -1) {
      return /\biph os ([0-9_]+)/;
    }
    return /\bios\b/;
  },

  android: (ua) => {
    if (ua.indexOf('android') >= 0) {
      return /\bandroid[ \/-]?([0-9.x]+)?/;
    }
    if (ua.indexOf('adr') >= 0) {
      if (ua.indexOf('mqqbrowser') >= 0) {
        return /\badr[ ]\(linux; u; ([0-9.]+)?/;
      }
      return /\badr(?:[ ]([0-9.]+))?/;
    }

    return 'android';
  },

  unknow: 'unknow',
};

// ////////////////////////////////////////////////////////////////
//
//      平台检测
//
// ////////////////////////////////////////////////////////////////
const PLATFORM = {
  weixin: /micromessenger/gi,
  qqvideo: /qqlivebrowser/gi,
  qqvideoipad: /qqlivehdbrowser/gi,
  shouqq: /qq\//gi,
  qqnews: /qqnews/gi,
  qzone: /qzone\//gi,
  unknow: 'unknow',
};

// ////////////////////////////////////////////////////////////////
//
//      类型检测
//
// ////////////////////////////////////////////////////////////////
const typeIs = (obj, type) => Object.prototype.toString.call(obj) === `[object ${type}]`;

const detect = (type, expression) => {
  const info = Device[type.toLowerCase()];
  for (const name in expression) {
    const fun = expression[name];
    const result = typeIs(fun, 'Function') ? fun(getLocalUserAgent()) : fun;

    info.name = name;

    if (result === true) {
      break;
    } else if (toString(result) === '[object String]') {
      if (getLocalUserAgent().indexOf(result) !== -1) {
        break;
      }
    } else if (typeIs(result, 'Object')) {
      if (result.version !== undefined) {
        info.version = result.version;
        break;
      }
    } else if (result && result.exec) {
      const m = result.exec(getLocalUserAgent());
      if (m) {
        if (m.length >= 2 && m[1]) info.version = m[1].replace(/_/g, '.');
        else info.version = '0.0.0';

        break;
      }
    }
  }

  return info;
};

// ////////////////////////////////////////////////////////////////
//
//      获取userAgent
//
// ////////////////////////////////////////////////////////////////
const getLocalUserAgent = () => {
  if (!composeUserAgent) {
    const gap = '__';
    const userAgent = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const appVersion = navigator.appVersion || '';
    const vendor = navigator.vendor || '';
    composeUserAgent = userAgent + gap + platform + gap + appVersion + gap + vendor;
    composeUserAgent = composeUserAgent.toLowerCase();
  }

  return composeUserAgent;
};
export const test = () => {
  detect('os', OS);
  detect('platform', PLATFORM);
  detect('browser', BROWSER);
};
export const testOnce = () => {
  if (!composeUserAgent) {
    detect('os', OS);
    detect('platform', PLATFORM);
    detect('browser', BROWSER);
  }
};

export const getUserAgent = (type) => {
  testOnce();

  const gap = '  ';
  if (type === 'all' || type === 'full') return getLocalUserAgent();
  if (type !== undefined) return Device[type].name;
  return `${Device.os.name}${gap}_${Device.os.version}  ${Device.browser.name}${gap}_${Device.browser.version}`;
};

export const Device = {
  os: {
    name: 'unknow',
    version: '0.0.0',
  },
  platform: {
    name: 'unknow',
    version: '0.0.0',
  },
  browser: {
    name: 'unknow',
    version: '0.0.0',
  },
};
