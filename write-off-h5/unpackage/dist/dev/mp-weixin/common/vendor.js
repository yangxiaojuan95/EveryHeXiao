(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__74EE7D6",
    appName: "券种核销",
    appVersion: "1.0.3",
    appVersionCode: "103",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.8.4",
    uniRuntimeVersion: "3.8.4",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__74EE7D6",
      appName: "券种核销",
      appVersion: "1.0.3",
      appVersionCode: "103",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"券种核销","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
var eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"券种核销","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"券种核销","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"券种核销","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"券种核销","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!****************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/*!******************************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/extend/update-manager/index.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyUpdateManager;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 31));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 33));
/**
 * 更新
 */
function applyUpdateManager() {
  return _applyUpdateManager.apply(this, arguments);
}
function _applyUpdateManager() {
  _applyUpdateManager = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var updateManager;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 检测小程序更新
            if (uni.canIUse('getUpdateManager')) {
              updateManager = uni.getUpdateManager();
              updateManager.onUpdateReady(function () {
                uni.showModal({
                  title: '更新提示',
                  content: '新版本已经准备好，是否重启应用？',
                  success: function success(res) {
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate();
                    }
                  }
                });
              });
            }
            // 检测app更新
          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _applyUpdateManager.apply(this, arguments);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 31 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 32)();
module.exports = runtime;

/***/ }),
/* 32 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 33 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 37 */
/*!***************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/extend/index.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;
var _filters = _interopRequireDefault(__webpack_require__(/*! ./filters */ 38));
var _prototype = _interopRequireDefault(__webpack_require__(/*! ./prototype */ 40));
function install(Vue) {
  Vue.use(_filters.default);
  Vue.use(_prototype.default);
}

/***/ }),
/* 38 */
/*!***********************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/extend/filters/index.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;
var _dateFormat = __webpack_require__(/*! @/frame/utils/date-format */ 39);
function install(Vue) {
  Vue.filter('toDate', function (dateText) {
    return (0, _dateFormat.dateFormat)(dateText, 'yyyy-MM-dd');
  });
}

/***/ }),
/* 39 */
/*!********************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/utils/date-format.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validIsDateOn = exports.getPastTime = exports.getLeftTime = exports.getDateCompositions = exports.default = exports.dateTextToStamp = exports.dateTextToDate = exports.dateFormat = exports.date2Text = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var getDateCompositions = function getDateCompositions() {
  var dateValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return [dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds()];
};
exports.getDateCompositions = getDateCompositions;
var dateFormat = function dateFormat(dateValue) {
  var formatTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';
  if (!dateValue) {
    return '----/--/--';
  }
  if (!(dateValue instanceof Date)) {
    if (typeof dateValue === 'string') {
      dateValue = dateValue.replace(/-/g, '/').replace(/T/g, ' ');
    }
    dateValue = new Date(dateValue);
  }
  var _getDateCompositions = getDateCompositions(dateValue),
    _getDateCompositions2 = (0, _slicedToArray2.default)(_getDateCompositions, 6),
    year = _getDateCompositions2[0],
    month = _getDateCompositions2[1],
    day = _getDateCompositions2[2],
    hour = _getDateCompositions2[3],
    min = _getDateCompositions2[4],
    sec = _getDateCompositions2[5];
  var paddingZero = function paddingZero(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  };
  var replaceMaps = {
    y: paddingZero(year),
    M: paddingZero(month + 1),
    d: paddingZero(day),
    h: paddingZero(hour),
    m: paddingZero(min),
    s: paddingZero(sec)
  };
  return formatTemplate.replace(/./g, function (val, index) {
    var mapValue;
    if (mapValue = replaceMaps[val]) {
      // 第一个match的索引
      var firstMatchIndex = formatTemplate.indexOf(val);
      return mapValue[index - firstMatchIndex];
    } else {
      return val;
    }
  });
};
exports.dateFormat = dateFormat;
function formatNumber(n) {
  var m = n + '';
  return m[1] != null ? m : '0' + m;
}
function dateTextValid(text) {
  return text ? text.replace('T', ' ').replace(/-/g, '/') : '';
}
var dateTextToDate = function dateTextToDate(text) {
  return new Date(dateTextValid(text));
};
exports.dateTextToDate = dateTextToDate;
var dateTextToStamp = function dateTextToStamp(text) {
  return new Date(dateTextValid(text)).getTime();
};
exports.dateTextToStamp = dateTextToStamp;
var validIsDateOn = function validIsDateOn(start, end) {
  if (!start || !end) {
    return false;
  }
  var now = Date.now();
  return dateTextToStamp(start) < now && dateTextToStamp(end) > now;
};
exports.validIsDateOn = validIsDateOn;
var date2Text = function date2Text(date, date2) {
  var stamp2 = date.getTime();
  var stamp1 = date2 ? date2.getTime() : Date.now();
  var _second = Number(((stamp1 - stamp2) / 1000).toFixed(0));
  var second = 60 - 1;
  var minute = 60 * 60 - 1;
  var hour = 60 * 60 * 24 - 1;
  var day = 60 * 60 * 24 * 30 - 1;
  var month = 60 * 60 * 24 * 30 * 12 - 1;
  var text = '';
  if (_second > month) {
    text = Math.floor(_second / month) + '年';
  } else if (_second > day) {
    text = Math.floor(_second / day) + '月';
  } else if (_second > hour) {
    text = Math.floor(_second / hour) + '天';
  } else if (_second > minute) {
    text = Math.floor(_second / minute) + '小时';
  } else if (_second > second) {
    text = Math.floor(_second / second) + '分钟';
  } else {
    text = _second + '秒前';
  }
  return text;
};
// 获取剩余时间数组
exports.date2Text = date2Text;
var getLeftTime = function getLeftTime(date) {
  var now = Date.now();
  var endStamp = dateTextToStamp(date);
  var StatusSecond = (endStamp - now) / 1000;
  var day = formatNumber(parseInt(Math.floor(StatusSecond / 86400).toString()));
  var hour = formatNumber(parseInt((StatusSecond / 3600 % 24).toString()));
  var min = formatNumber(parseInt((StatusSecond / 60 % 60).toString()));
  var sec = formatNumber(parseInt((StatusSecond % 60).toString()));
  return [day, hour, min, sec];
};
// 获取剩余时间数组
exports.getLeftTime = getLeftTime;
var getPastTime = function getPastTime(date) {
  var now = Date.now();
  var endStamp = dateTextToStamp(date);
  var StatusSecond = (now - endStamp) / 1000;
  var hour = formatNumber(parseInt((StatusSecond / 3600).toString()));
  var min = formatNumber(parseInt((StatusSecond / 60 % 60).toString()));
  var sec = formatNumber(parseInt((StatusSecond % 60).toString()));
  return [hour, min, sec];
};
exports.getPastTime = getPastTime;
var _default = {
  dateTextToStamp: dateTextToStamp,
  validIsDateOn: validIsDateOn,
  dateFormat: dateFormat,
  dateTextToDate: dateTextToDate,
  date2Text: date2Text,
  getLeftTime: getLeftTime
};
exports.default = _default;

/***/ }),
/* 40 */
/*!*************************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/extend/prototype/index.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yCheckLogin = exports.validForm = exports.showPageLoading = exports.showModal = exports.isIos = exports.hidePageLoading = exports.getSafeParseData = exports.default = exports.cloneObj = void 0;
var _verify = __webpack_require__(/*! @/frame/utils/verify */ 41);
var _utils = __webpack_require__(/*! @/frame/utils */ 42);
// 询问
var showModal = function showModal() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var showCancel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return new Promise(function (resolve) {
    uni.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      success: function success(res) {
        if (!res.confirm) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    });
  });
};
exports.showModal = showModal;
var showPageLoading = function showPageLoading() {
  var ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'loading';
  // uni.showNavigationBarLoading()
  this.$refs[ref] && this.$refs[ref].showLoading();
};
exports.showPageLoading = showPageLoading;
var hidePageLoading = function hidePageLoading() {
  var ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'loading';
  // uni.hideNavigationBarLoading()
  this.$refs[ref] && this.$refs[ref].hideLoading();
};
exports.hidePageLoading = hidePageLoading;
var yCheckLogin = function yCheckLogin() {
  var failPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/pages/auth/index';
  if (!this.$store.state.user.userData) {
    uni.navigateTo({
      url: failPath
    });
    return false;
  }
  return true;
};
exports.yCheckLogin = yCheckLogin;
var validForm = function validForm(data) {
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var message = '';
  for (var i = 0, l = rules.length; i < l; i++) {
    var rule = rules[i];
    var value = data[rule.key];
    if (rule.expression && typeof rule.expression === 'function') {
      // 存在表达式
      if (rule.expression.call(this, data)) {
        message = rule.text;
        break;
      }
    } else if (rule.verify) {
      // 需要调用校验
      if (!(0, _verify.verify)(rule.verify, value)) {
        message = rule.text;
        break;
      }
    } else {
      // 校验是否存在
      if (value === '' || value == null) {
        message = rule.text;
        break;
      }
    }
  }
  if (message) {
    uni.showToast({
      title: message,
      icon: 'none'
    });
    return false;
  } else {
    return true;
  }
};
exports.validForm = validForm;
var getSafeParseData = function getSafeParseData(jsonData) {
  var errorReturnData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  try {
    return JSON.parse(jsonData) || errorReturnData;
  } catch (e) {
    return errorReturnData;
  }
};
exports.getSafeParseData = getSafeParseData;
var cloneObj = _utils.jsonClone;
// export const isWechat = /MicroMessenger/i.test(window.navigator.userAgent);
exports.cloneObj = cloneObj;
var isIos = uni.getSystemInfoSync().system.toLowerCase().indexOf('ios') > -1;
exports.isIos = isIos;
var extend = {
  install: function install(Vue) {
    /** loading 方法 */
    Vue.prototype.showPageLoading = showPageLoading;
    Vue.prototype.hidePageLoading = hidePageLoading;
    /* 检查登录 */
    Vue.prototype.yCheckLogin = yCheckLogin;
    /* 询问 */
    Vue.prototype.showModal = showModal;
    /* 检查表单数据 */
    Vue.prototype.validForm = validForm;
    Vue.prototype.getSafeParseData = getSafeParseData;
    // 是否微信浏览器环境
    // Vue.prototype.isWechat = isWechat
    /* JSON 复制对象 */
    Vue.prototype.cloneObj = cloneObj;
    Vue.prototype.ISIOS = isIos;
  }
};
var _default = extend;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 41 */
/*!***************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/utils/verify.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.REG = void 0;
//正则对象obj
var REG = {
  "int": /^[\-|\+]?[0-9]*$/,
  "+int0": /^\+?[0-9][0-9]*$/,
  "+int": /^\+?[1-9][0-9]*$/,
  '-int': /^\-[1-9][0-9]*$/,
  'float': /^(-?\d+)(\.\d+)?/,
  '+float': /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
  '+floatwith2': /^(([1-9]\d*)|0)(\.\d{1,2})?$/,
  '-float': /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,
  'ip': /^(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])$/,
  'email': /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/,
  'mobile': /^(0|86|17951)?(1)[0-9]{10}$/,
  'idcard': /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
};
exports.REG = REG;
var verify = function verify(type, value) {
  if (REG[type]) {
    return REG[type].test(value);
  } else {
    console.warn('请选择正确的验证方式~');
    return false;
  }
};
exports.verify = verify;

/***/ }),
/* 42 */
/*!**************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/utils/index.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonClone = jsonClone;
exports.merge = merge;
exports.readObjInfo = readObjInfo;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 工具
 */
function jsonClone(data) {
  return JSON.parse(JSON.stringify(data));
}
function merge() {
  var result = {};
  for (var i = 0, l = arguments.length; i < l; i++) {
    var obj = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if ((0, _typeof2.default)(obj) !== 'object') {
      continue;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var value = obj[key];
        if ((0, _typeof2.default)(result[key]) === 'object' && (0, _typeof2.default)(value) === 'object') {
          result[key] = merge(result[key], value);
        } else {
          result[key] = value;
        }
      }
    }
  }
  return result;
}
function readObjInfo(obj, routes) {
  return routes.reduce(function (memo, key) {
    return memo[key];
  }, jsonClone(obj));
}

/***/ }),
/* 43 */
/*!********************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/store/index.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = __webpack_require__(/*! @/config */ 44);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 45));
var getters = _interopRequireWildcard(__webpack_require__(/*! ./getters */ 46));
var _modules = _interopRequireDefault(__webpack_require__(/*! ./modules */ 47));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_vue.default.use(_vuex.default);
var _default = new _vuex.default.Store({
  getters: getters,
  modules: _modules.default,
  strict: _config.isProduction
});
exports.default = _default;

/***/ }),
/* 44 */
/*!*********************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/config/index.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qiniu = exports.jsDebug = exports.jsApiList = exports.isProduction = exports.devIndetifyUrl = exports.baseUrl = exports.authFailRedirectUrl = void 0;
/**
 * 配置
 */
// 是否生产环境
var isProduction = "development" === 'production';
// export const isProduction = true
// 请求域名
// const domain = 'http://111.3.157.218:21002/'
exports.isProduction = isProduction;
var domain = '';
// const domain = 'https://approvalsale.nbxuanma.com'
// const domain = location.origin + '/'//获取根目录路径
// 域名 + 代理地址
// const productionUrl = domain + 'api/app/'
var productionUrl = domain;
var newdevIndetifyUrl = '/api/identity/';
// const devUrl = 'http://localhost:5004/'
// const devUrl = '/'
var devUrl = 'http://localhost:8080';
var indentifyDevUrl = 'http://localhost:8080';
var baseUrl = isProduction ? productionUrl : devUrl;
exports.baseUrl = baseUrl;
var devIndetifyUrl = isProduction ? newdevIndetifyUrl : indentifyDevUrl;
exports.devIndetifyUrl = devIndetifyUrl;
var authFailRedirectUrl = '/pages/login/index';
// H5需要的授权api
exports.authFailRedirectUrl = authFailRedirectUrl;
var jsApiList = ['getLocation', 'chooseImage' //拍照或从手机相册中选图接口  
];
exports.jsApiList = jsApiList;
var jsDebug = false;
exports.jsDebug = jsDebug;
var qiniu = {
  region: 'juzhenshop',
  tokenUrl: baseUrl + 'Upload/CreateUploadToken',
  uploadUrl: 'https://upload.qiniup.com/',
  fileUrl: 'http://juzhenshopimg.juzhentech.com/'
};
exports.qiniu = qiniu;

/***/ }),
/* 45 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 46 */
/*!**********************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/store/getters.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userData = exports.IsLeader = void 0;
/**
 * vuex 计算属性
 */
var userData = function userData(state) {
  return state.user.userData || null;
};
exports.userData = userData;
var IsLeader = function IsLeader(state) {
  return state.user.IsLeader || null;
};
exports.IsLeader = IsLeader;

/***/ }),
/* 47 */
/*!****************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/store/modules/index.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(__webpack_require__(/*! ./user */ 48));
var _system = _interopRequireDefault(__webpack_require__(/*! ./system */ 49));
/**
 * stores
 */
var _default = {
  user: _user.default,
  system: _system.default
};
exports.default = _default;

/***/ }),
/* 48 */
/*!***************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/store/modules/user.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var userModule = {
  namespaced: true,
  state: {
    userData: null,
    IsLeader: null
  },
  mutations: {
    updateUserData: function updateUserData(state, info) {
      state.userData = info;
    },
    updateIsLeader: function updateIsLeader(state, play) {
      state.IsLeader = play;
    }
  },
  actions: {
    /**
     * 获取用户数据
     */
    // async getUserData({ commit }) {
    // 	try {
    // 		const result = await getUserInfo()
    // 		if (result) {
    // 			commit('updateUserData', result)
    // 			return result
    // 			console.log('xxxx')
    // 		}
    // 	} catch (error) {
    // 		token.remove() 
    // 		return null
    // 	}
    // },
    /**
     * 跳转到首页
     */
    toBusinessCenterPage: function toBusinessCenterPage(_ref) {
      var commit = _ref.commit,
        state = _ref.state;
      var userData = state.userData;
      if (!userData) {
        return false;
      }
      var currentPage = getCurrentPages().slice(-1)[0];
      if (currentPage && currentPage.route === 'pages/login/index') {
        uni.reLaunch({
          url: '/pages/index/index'
        });
      }
    }
  }
};
var _default = userModule;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 49 */
/*!*****************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/store/modules/system.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var systemModule = {
  namespaced: true,
  state: {
    systemInfo: uni.getSystemInfoSync(),
    navHeight: 0
  },
  mutations: {
    updateNavHeight: function updateNavHeight(state, newVal) {
      state.navHeight = newVal;
    }
  }
};
var _default = systemModule;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 50 */
/*!***********************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/apis/api/index.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = exports.api = void 0;
var _config = __webpack_require__(/*! @/config */ 44);
var _request = _interopRequireDefault(__webpack_require__(/*! @/frame/utils/request */ 51));
var api = new _request.default({
  name: 'api',
  baseUrl: _config.baseUrl,
  freeUrls: ['Account/UserInfo', 'Equipment/GetEquipment', 'Rfid', 'Rfid/info'],
  cacheUrls: []
});
exports.api = api;
var token = api.token;
exports.token = token;

/***/ }),
/* 51 */
/*!****************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/utils/request.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _config = __webpack_require__(/*! @/config */ 44);
var _index = __webpack_require__(/*! ./index */ 42);
var _storage = _interopRequireDefault(__webpack_require__(/*! ./storage */ 52));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var appendMethods = ['get', 'post', 'put', 'delete'];
/* 默认配置 */
var _defaultConfigData = {
  header: {
    'content-type': 'application/json'
  },
  method: 'post',
  data: undefined,
  routeData: undefined,
  dataType: 'json',
  responseType: 'text',
  noError: false,
  timeout: undefined // ms
};
/* 请求类 */
var Request = /*#__PURE__*/function () {
  function Request(configData) {
    (0, _classCallCheck2.default)(this, Request);
    this.freeUrls = [];
    this.cacheUrls = [];
    this.cache = {};
    this.hasCache = false;
    this.promiseUrl = {};
    this.dataRoutes = [];
    this.errorRoutes = [];
    this.requestId = 0;
    this.name = configData.name;
    this.baseUrl = configData.baseUrl || '';
    this.freeUrls = configData.freeUrls || [];
    this.cacheUrls = configData.cacheUrls || [];
    this.cache = {};
    this.hasCache = this.cacheUrls.length !== 0;
    this.promiseUrl = {};
    this.timers = [];
    this.checkFn = configData.checkFn || function (res) {
      return res.statusCode === 200;
    };
    this.dataRoutes = configData.dataRoutes || ['data'];
    this.errorRoutes = configData.errorRoutes || ['data', 'errMsg'];
    this.token = new _storage.default(this.name);
    this.authFailRedirectUrl = configData.authFailRedirectUrl || _config.authFailRedirectUrl;
    this.addSupportMethod();
  }
  /* 添加辅助方法 */
  (0, _createClass2.default)(Request, [{
    key: "addSupportMethod",
    value: function addSupportMethod() {
      var _this = this;
      appendMethods.forEach(function (method) {
        _this[method] = function (url) {
          var requestData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var configData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (method) {
            configData.method = method.toLowerCase();
          }
          return this.request(url, requestData, configData);
        };
      });
    }
    /* 设置接口数据缓存 */
  }, {
    key: "setCache",
    value: function setCache(cahceKey, data) {
      if (!this.cache[cahceKey]) {
        this.cache[cahceKey] = (0, _index.jsonClone)(data);
      }
    }
    /* 拼接路由 */
  }, {
    key: "appendRoute",
    value: function appendRoute(url, routeData) {
      var appendKeys = [];
      for (var k in routeData) {
        if (routeData.hasOwnProperty(k) && new RegExp("/:".concat(k, "(/|$)")).test(url)) {
          appendKeys.push(k);
          url = url.replace(":".concat(k), routeData[k]);
        }
      }
      return {
        url: url,
        appendKeys: appendKeys
      };
    }
  }, {
    key: "appendQuery",
    value: function appendQuery(url, requestData) {
      url = url.indexOf('?') > -1 ? url : url + '?';
      for (var k in requestData) {
        if (requestData.hasOwnProperty(k)) {
          url += k + '=' + requestData[k] + '&';
        }
      }
      return url.slice(0, -1);
    }
  }, {
    key: "processRequestData",
    value: function processRequestData(data) {
      var result = {};
      return Object.keys(data).reduce(function (memo, key) {
        if (data[key] != null && data.hasOwnProperty(key)) {
          memo[key] = data[key];
        }
        return memo;
      }, result);
    }
    /* 请求函数 */
  }, {
    key: "request",
    value: function request(url) {
      var _this2 = this;
      var requestData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var configData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return new Promise(function (resolve, reject) {
        // 查看是否需要token
        var token = requestData.token
        // ? 'Bearer ' + this.token.getValue()
        ? _this2.token.getValue() : null;
        var isArrayData = Array.isArray(requestData);
        if (!isArrayData) {
          requestData = _this2.processRequestData((0, _index.jsonClone)(requestData));
        } else {
          requestData = (0, _index.jsonClone)(requestData);
        }
        configData = (0, _index.jsonClone)(configData);
        var requestId = ++_this2.requestId;
        // 合并配置项
        configData = (0, _index.merge)(_defaultConfigData, configData);
        configData.method = configData.method ? configData.method.toLowerCase() : '';
        if (!isArrayData) {
          // 合并参数
          requestData = (0, _index.merge)(requestData, configData.data);
        }
        // 查看是否连续同时调用接口
        if (!~_this2.freeUrls.indexOf(url)) {
          _this2.promiseUrl[url] && _this2.promiseUrl[url].abort();
        }
        // 拼接路由
        var routeData = (0, _index.merge)({}, requestData, configData.routeData || {});
        if (Object.keys(routeData).length) {
          var routerAppendResult = _this2.appendRoute(url, routeData);
          url = routerAppendResult.url;
          // 清除路由添加数据
          routerAppendResult.appendKeys.forEach(function (key) {
            if (requestData.hasOwnProperty(key)) {
              delete requestData[key];
            }
          });
        }
        delete requestData.token;
        // 是否需要缓存该接口结果
        var isCache = ~_this2.cacheUrls.indexOf(url);
        var cahceKey = '';
        if (isCache) {
          cahceKey = url;
          for (var k in requestData) {
            cahceKey += k + '_' + JSON.stringify(requestData[k]) + '_';
          }
          if (_this2.cache[cahceKey]) {
            return resolve((0, _index.jsonClone)(_this2.cache[cahceKey]));
          }
        }
        //delete
        // if (configData.method === 'delete') {
        // 	url = this.appendQuery(url, requestData)
        // }
        // 需要设置定时器
        if (configData.timeout) {
          // 如果到时还未获得结果就取消请求
          var timer = setTimeout(function () {
            var index = _this2.timers.findIndex(function (item) {
              return item.requestId === requestId;
            });
            if (~index) {
              _this2.promiseUrl[url] && _this2.promiseUrl[url].abort();
              _this2.timers.splice(index, 1);
              uni.showToast({
                title: '超时'
              });
              reject({
                text: 'timeout',
                isTimeout: true
              });
            }
          }, configData.timeout);
          _this2.timers.push({
            timer: timer,
            requestId: requestId
          });
        }
        // 发请求
        _this2.promiseUrl[url] = uni.request({
          url: url.indexOf('http') !== -1 ? url : _this2.baseUrl + url,
          method: configData.method.toUpperCase(),
          data: requestData,
          header: _objectSpread(_objectSpread({}, configData.header), {}, {
            Authorization: token
          }),
          dataType: configData.dataType,
          responseType: configData.responseType,
          success: function success(res) {
            var statue = res.data;
            if (statue.Status === 40001) {
              // 授权失败
              uni.hideLoading();
              uni.showModal({
                title: '您未授权或授权已过期，请重新登录',
                success: function success(res) {
                  if (res.confirm) {
                    _this2.token.remove();
                    var currentPageRoute = getCurrentPages().slice(-1)[0].route;
                    if (_this2.authFailRedirectUrl.indexOf(currentPageRoute) === -1) {
                      // 不同页面
                      uni.navigateTo({
                        url: _this2.authFailRedirectUrl
                      });
                    }
                  }
                },
                showCancel: false
              });
            }
            if (configData.noError) {
              // 无需检查接口返回数据
              isCache && _this2.setCache(cahceKey, res);
              resolve(res);
            } else {
              // 检查接口错误
              if (_this2.checkFn(res)) {
                var resolveData = (0, _index.readObjInfo)(res, _this2.dataRoutes);
                isCache && _this2.setCache(cahceKey, resolveData);
                resolve(resolveData);
              } else {
                var message = (0, _index.readObjInfo)(res, _this2.errorRoutes) || '出错了!';
                if (res.statusCode === 204) {
                  // 无返回内容
                  return resolve(undefined);
                } else if (res.statusCode === 401) {
                  // 授权失败
                  uni.hideLoading();
                  uni.showModal({
                    title: '您未授权或授权已过期，请重新登录',
                    success: function success(res) {
                      if (res.confirm) {
                        _this2.token.remove();
                        var currentPageRoute = getCurrentPages().slice(-1)[0].route;
                        if (_this2.authFailRedirectUrl.indexOf(currentPageRoute) === -1) {
                          // 不同页面
                          uni.navigateTo({
                            url: _this2.authFailRedirectUrl
                          });
                        }
                      }
                    },
                    showCancel: false
                  });
                } else if (res.statusCode === 403) {
                  uni.showToast({
                    title: '您没有访问权限',
                    icon: 'none'
                  });
                } else {
                  uni.showToast({
                    title: message,
                    icon: 'none'
                  });
                }
                _this2.hidePageLoading();
                reject({
                  isError: true,
                  text: message
                });
              }
            }
          },
          fail: function fail(res) {
            console.log('fail', res);
            // 请求失败
            _this2.hidePageLoading();
            reject(res);
          },
          complete: function complete() {
            var index = _this2.timers.findIndex(function (item) {
              return item.requestId === requestId;
            });
            if (~index) {
              clearTimeout(_this2.timers[index].timer);
              _this2.timers.splice(index, 1);
            }
            _this2.promiseUrl[url] = null;
          }
        });
      });
    }
  }, {
    key: "bindApi",
    value: function bindApi(api) {
      var _request = {};
      var self = this;
      appendMethods.forEach(function (item) {
        _request[item] = function () {
          var requestData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var configData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          configData.method = item.toLowerCase();
          return self.request(api, requestData, configData);
        };
      });
      return _request;
    }
    /* 隐藏loading */
  }, {
    key: "hidePageLoading",
    value: function hidePageLoading() {
      try {
        var pages = getCurrentPages();
        pages && pages[pages.length - 1] && pages[pages.length - 1].$vm && pages[pages.length - 1].$vm.hidePageLoading && pages[pages.length - 1].$vm.hidePageLoading();
      } catch (error) {
        console.log('error', error);
      }
    }
  }]);
  return Request;
}();
exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 52 */
/*!****************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/utils/storage.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
/* 本地存储 */
var Storage = /*#__PURE__*/function () {
  function Storage(name, value) {
    (0, _classCallCheck2.default)(this, Storage);
    this.name = name;
    this.value = value ? value : '';
    this.refresh();
  }
  (0, _createClass2.default)(Storage, [{
    key: "refresh",
    value: function refresh() {
      return this.value = uni.getStorageSync(this.name);
    }
  }, {
    key: "setValue",
    value: function setValue(val) {
      uni.setStorageSync(this.name, val);
      this.refresh();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value ? this.value : this.refresh();
    }
  }, {
    key: "remove",
    value: function remove() {
      this.value = '';
      uni.removeStorageSync(this.name);
    }
  }]);
  return Storage;
}();
exports.default = Storage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/*!******************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/apis/api/modules/user.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginAjax = void 0;
var _ = __webpack_require__(/*! .. */ 50);
var LoginAjax = function LoginAjax(data, config) {
  return _.api.post('/api/Shop/Login', data, config);
};
exports.LoginAjax = LoginAjax;

/***/ }),
/* 60 */
/*!*********************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/pages/login/qrcodeSearch.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showQrCode = showQrCode;
var _jsqr = _interopRequireDefault(__webpack_require__(/*! jsqr */ 61));
// import QRCode from '../libs/qr/qrcode'

// 二维码 或 条形码 识别
function showQrCode(file, params, callback) {
  var ready = new FileReader();
  /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
  ready.readAsDataURL(file); // 调用reader.readAsDataURL()方法，把图片转成base64
  ready.onload = function () {
    var re = this.result;
    canvasDataURL(re, params, callback);
  };
}
function canvasDataURL(path, obj, callback) {
  var img = new Image();
  img.src = path;
  // 生成canvas
  var canvas = document.createElement('canvas');
  // const canvas = document.getElementById('qrcanvas')
  var ctx = canvas.getContext('2d');
  // const _this = this
  img.onload = function () {
    console.log('canvasDataURL()-img', img.height, img.width);
    // let w = img.width
    // let h = img.height
    var w = 100;
    var h = 100;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    var imageData = ctx.getImageData(0, 0, w, h);
    var code = (0, _jsqr.default)(imageData.data, w, h);
    var res = {
      data: null,
      message: '识别成功',
      code: 0
    };
    if (code) {
      res.data = code.data;
      callback(res);
    } else {
      res.code = -1;
      res.data = null;
      res.message = '识别失败';
      callback(res);
    }
  };
}

/***/ }),
/* 61 */
/*!************************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/node_modules/jsqr/dist/jsQR.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : _typeof(exports)) === 'object' && ( false ? undefined : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(typeof self !== 'undefined' ? self : this, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/
      var installedModules = {};
      /******/
      /******/ // The require function
      /******/
      function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/
      __webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/
      __webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/
      __webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/
          });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/
      __webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ? /******/function getDefault() {
          return module['default'];
        } : /******/function getModuleExports() {
          return module;
        };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/
      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/
      __webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/
      return __webpack_require__(__webpack_require__.s = 3);
      /******/
    }
    /************************************************************************/
    /******/([/* 0 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var BitMatrix = /** @class */function () {
        function BitMatrix(data, width) {
          this.width = width;
          this.height = data.length / width;
          this.data = data;
        }
        BitMatrix.createEmpty = function (width, height) {
          return new BitMatrix(new Uint8ClampedArray(width * height), width);
        };
        BitMatrix.prototype.get = function (x, y) {
          if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
          }
          return !!this.data[y * this.width + x];
        };
        BitMatrix.prototype.set = function (x, y, v) {
          this.data[y * this.width + x] = v ? 1 : 0;
        };
        BitMatrix.prototype.setRegion = function (left, top, width, height, v) {
          for (var y = top; y < top + height; y++) {
            for (var x = left; x < left + width; x++) {
              this.set(x, y, !!v);
            }
          }
        };
        return BitMatrix;
      }();
      exports.BitMatrix = BitMatrix;

      /***/
    }, /* 1 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var GenericGFPoly_1 = __webpack_require__(2);
      function addOrSubtractGF(a, b) {
        return a ^ b; // tslint:disable-line:no-bitwise
      }

      exports.addOrSubtractGF = addOrSubtractGF;
      var GenericGF = /** @class */function () {
        function GenericGF(primitive, size, genBase) {
          this.primitive = primitive;
          this.size = size;
          this.generatorBase = genBase;
          this.expTable = new Array(this.size);
          this.logTable = new Array(this.size);
          var x = 1;
          for (var i = 0; i < this.size; i++) {
            this.expTable[i] = x;
            x = x * 2;
            if (x >= this.size) {
              x = (x ^ this.primitive) & this.size - 1; // tslint:disable-line:no-bitwise
            }
          }

          for (var i = 0; i < this.size - 1; i++) {
            this.logTable[this.expTable[i]] = i;
          }
          this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([0]));
          this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([1]));
        }
        GenericGF.prototype.multiply = function (a, b) {
          if (a === 0 || b === 0) {
            return 0;
          }
          return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
        };
        GenericGF.prototype.inverse = function (a) {
          if (a === 0) {
            throw new Error("Can't invert 0");
          }
          return this.expTable[this.size - this.logTable[a] - 1];
        };
        GenericGF.prototype.buildMonomial = function (degree, coefficient) {
          if (degree < 0) {
            throw new Error("Invalid monomial degree less than 0");
          }
          if (coefficient === 0) {
            return this.zero;
          }
          var coefficients = new Uint8ClampedArray(degree + 1);
          coefficients[0] = coefficient;
          return new GenericGFPoly_1.default(this, coefficients);
        };
        GenericGF.prototype.log = function (a) {
          if (a === 0) {
            throw new Error("Can't take log(0)");
          }
          return this.logTable[a];
        };
        GenericGF.prototype.exp = function (a) {
          return this.expTable[a];
        };
        return GenericGF;
      }();
      exports.default = GenericGF;

      /***/
    }, /* 2 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var GenericGF_1 = __webpack_require__(1);
      var GenericGFPoly = /** @class */function () {
        function GenericGFPoly(field, coefficients) {
          if (coefficients.length === 0) {
            throw new Error("No coefficients.");
          }
          this.field = field;
          var coefficientsLength = coefficients.length;
          if (coefficientsLength > 1 && coefficients[0] === 0) {
            // Leading term must be non-zero for anything except the constant polynomial "0"
            var firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
              firstNonZero++;
            }
            if (firstNonZero === coefficientsLength) {
              this.coefficients = field.zero.coefficients;
            } else {
              this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
              for (var i = 0; i < this.coefficients.length; i++) {
                this.coefficients[i] = coefficients[firstNonZero + i];
              }
            }
          } else {
            this.coefficients = coefficients;
          }
        }
        GenericGFPoly.prototype.degree = function () {
          return this.coefficients.length - 1;
        };
        GenericGFPoly.prototype.isZero = function () {
          return this.coefficients[0] === 0;
        };
        GenericGFPoly.prototype.getCoefficient = function (degree) {
          return this.coefficients[this.coefficients.length - 1 - degree];
        };
        GenericGFPoly.prototype.addOrSubtract = function (other) {
          var _a;
          if (this.isZero()) {
            return other;
          }
          if (other.isZero()) {
            return this;
          }
          var smallerCoefficients = this.coefficients;
          var largerCoefficients = other.coefficients;
          if (smallerCoefficients.length > largerCoefficients.length) {
            _a = [largerCoefficients, smallerCoefficients], smallerCoefficients = _a[0], largerCoefficients = _a[1];
          }
          var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
          var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
          for (var i = 0; i < lengthDiff; i++) {
            sumDiff[i] = largerCoefficients[i];
          }
          for (var i = lengthDiff; i < largerCoefficients.length; i++) {
            sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
          }
          return new GenericGFPoly(this.field, sumDiff);
        };
        GenericGFPoly.prototype.multiply = function (scalar) {
          if (scalar === 0) {
            return this.field.zero;
          }
          if (scalar === 1) {
            return this;
          }
          var size = this.coefficients.length;
          var product = new Uint8ClampedArray(size);
          for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], scalar);
          }
          return new GenericGFPoly(this.field, product);
        };
        GenericGFPoly.prototype.multiplyPoly = function (other) {
          if (this.isZero() || other.isZero()) {
            return this.field.zero;
          }
          var aCoefficients = this.coefficients;
          var aLength = aCoefficients.length;
          var bCoefficients = other.coefficients;
          var bLength = bCoefficients.length;
          var product = new Uint8ClampedArray(aLength + bLength - 1);
          for (var i = 0; i < aLength; i++) {
            var aCoeff = aCoefficients[i];
            for (var j = 0; j < bLength; j++) {
              product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
            }
          }
          return new GenericGFPoly(this.field, product);
        };
        GenericGFPoly.prototype.multiplyByMonomial = function (degree, coefficient) {
          if (degree < 0) {
            throw new Error("Invalid degree less than 0");
          }
          if (coefficient === 0) {
            return this.field.zero;
          }
          var size = this.coefficients.length;
          var product = new Uint8ClampedArray(size + degree);
          for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], coefficient);
          }
          return new GenericGFPoly(this.field, product);
        };
        GenericGFPoly.prototype.evaluateAt = function (a) {
          var result = 0;
          if (a === 0) {
            // Just return the x^0 coefficient
            return this.getCoefficient(0);
          }
          var size = this.coefficients.length;
          if (a === 1) {
            // Just the sum of the coefficients
            this.coefficients.forEach(function (coefficient) {
              result = GenericGF_1.addOrSubtractGF(result, coefficient);
            });
            return result;
          }
          result = this.coefficients[0];
          for (var i = 1; i < size; i++) {
            result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
          }
          return result;
        };
        return GenericGFPoly;
      }();
      exports.default = GenericGFPoly;

      /***/
    }, /* 3 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var binarizer_1 = __webpack_require__(4);
      var decoder_1 = __webpack_require__(5);
      var extractor_1 = __webpack_require__(11);
      var locator_1 = __webpack_require__(12);
      function scan(matrix) {
        var locations = locator_1.locate(matrix);
        if (!locations) {
          return null;
        }
        for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
          var location_1 = locations_1[_i];
          var extracted = extractor_1.extract(matrix, location_1);
          var decoded = decoder_1.decode(extracted.matrix);
          if (decoded) {
            return {
              binaryData: decoded.bytes,
              data: decoded.text,
              chunks: decoded.chunks,
              version: decoded.version,
              location: {
                topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
                topLeftCorner: extracted.mappingFunction(0, 0),
                bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
                bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
                topRightFinderPattern: location_1.topRight,
                topLeftFinderPattern: location_1.topLeft,
                bottomLeftFinderPattern: location_1.bottomLeft,
                bottomRightAlignmentPattern: location_1.alignmentPattern
              }
            };
          }
        }
        return null;
      }
      var defaultOptions = {
        inversionAttempts: "attemptBoth"
      };
      function jsQR(data, width, height, providedOptions) {
        if (providedOptions === void 0) {
          providedOptions = {};
        }
        var options = defaultOptions;
        Object.keys(options || {}).forEach(function (opt) {
          options[opt] = providedOptions[opt] || options[opt];
        });
        var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
        var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
        var _a = binarizer_1.binarize(data, width, height, shouldInvert),
          binarized = _a.binarized,
          inverted = _a.inverted;
        var result = scan(tryInvertedFirst ? inverted : binarized);
        if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) {
          result = scan(tryInvertedFirst ? binarized : inverted);
        }
        return result;
      }
      jsQR.default = jsQR;
      exports.default = jsQR;

      /***/
    }, /* 4 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var BitMatrix_1 = __webpack_require__(0);
      var REGION_SIZE = 8;
      var MIN_DYNAMIC_RANGE = 24;
      function numBetween(value, min, max) {
        return value < min ? min : value > max ? max : value;
      }
      // Like BitMatrix but accepts arbitry Uint8 values
      var Matrix = /** @class */function () {
        function Matrix(width, height) {
          this.width = width;
          this.data = new Uint8ClampedArray(width * height);
        }
        Matrix.prototype.get = function (x, y) {
          return this.data[y * this.width + x];
        };
        Matrix.prototype.set = function (x, y, value) {
          this.data[y * this.width + x] = value;
        };
        return Matrix;
      }();
      function binarize(data, width, height, returnInverted) {
        if (data.length !== width * height * 4) {
          throw new Error("Malformed data passed to binarizer.");
        }
        // Convert image to greyscale
        var greyscalePixels = new Matrix(width, height);
        for (var x = 0; x < width; x++) {
          for (var y = 0; y < height; y++) {
            var r = data[(y * width + x) * 4 + 0];
            var g = data[(y * width + x) * 4 + 1];
            var b = data[(y * width + x) * 4 + 2];
            greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
          }
        }
        var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
        var verticalRegionCount = Math.ceil(height / REGION_SIZE);
        var blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount);
        for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
          for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var sum = 0;
            var min = Infinity;
            var max = 0;
            for (var y = 0; y < REGION_SIZE; y++) {
              for (var x = 0; x < REGION_SIZE; x++) {
                var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                sum += pixelLumosity;
                min = Math.min(min, pixelLumosity);
                max = Math.max(max, pixelLumosity);
              }
            }
            var average = sum / Math.pow(REGION_SIZE, 2);
            if (max - min <= MIN_DYNAMIC_RANGE) {
              // If variation within the block is low, assume this is a block with only light or only
              // dark pixels. In that case we do not want to use the average, as it would divide this
              // low contrast area into black and white pixels, essentially creating data out of noise.
              //
              // Default the blackpoint for these blocks to be half the min - effectively white them out
              average = min / 2;
              if (verticalRegion > 0 && hortizontalRegion > 0) {
                // Correct the "white background" assumption for blocks that have neighbors by comparing
                // the pixels in this block to the previously calculated black points. This is based on
                // the fact that dark barcode symbology is always surrounded by some amount of light
                // background for which reasonable black point estimates were made. The bp estimated at
                // the boundaries is used for the interior.
                // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) + 2 * blackPoints.get(hortizontalRegion - 1, verticalRegion) + blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                if (min < averageNeighborBlackPoint) {
                  average = averageNeighborBlackPoint;
                }
              }
            }
            blackPoints.set(hortizontalRegion, verticalRegion, average);
          }
        }
        var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
        var inverted = null;
        if (returnInverted) {
          inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
        }
        for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
          for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
            var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
            var sum = 0;
            for (var xRegion = -2; xRegion <= 2; xRegion++) {
              for (var yRegion = -2; yRegion <= 2; yRegion++) {
                sum += blackPoints.get(left + xRegion, top_1 + yRegion);
              }
            }
            var threshold = sum / 25;
            for (var xRegion = 0; xRegion < REGION_SIZE; xRegion++) {
              for (var yRegion = 0; yRegion < REGION_SIZE; yRegion++) {
                var x = hortizontalRegion * REGION_SIZE + xRegion;
                var y = verticalRegion * REGION_SIZE + yRegion;
                var lum = greyscalePixels.get(x, y);
                binarized.set(x, y, lum <= threshold);
                if (returnInverted) {
                  inverted.set(x, y, !(lum <= threshold));
                }
              }
            }
          }
        }
        if (returnInverted) {
          return {
            binarized: binarized,
            inverted: inverted
          };
        }
        return {
          binarized: binarized
        };
      }
      exports.binarize = binarize;

      /***/
    }, /* 5 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var BitMatrix_1 = __webpack_require__(0);
      var decodeData_1 = __webpack_require__(6);
      var reedsolomon_1 = __webpack_require__(9);
      var version_1 = __webpack_require__(10);
      // tslint:disable:no-bitwise
      function numBitsDiffering(x, y) {
        var z = x ^ y;
        var bitCount = 0;
        while (z) {
          bitCount++;
          z &= z - 1;
        }
        return bitCount;
      }
      function pushBit(bit, byte) {
        return byte << 1 | bit;
      }
      // tslint:enable:no-bitwise
      var FORMAT_INFO_TABLE = [{
        bits: 0x5412,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 0
        }
      }, {
        bits: 0x5125,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 1
        }
      }, {
        bits: 0x5E7C,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 2
        }
      }, {
        bits: 0x5B4B,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 3
        }
      }, {
        bits: 0x45F9,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 4
        }
      }, {
        bits: 0x40CE,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 5
        }
      }, {
        bits: 0x4F97,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 6
        }
      }, {
        bits: 0x4AA0,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 7
        }
      }, {
        bits: 0x77C4,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 0
        }
      }, {
        bits: 0x72F3,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 1
        }
      }, {
        bits: 0x7DAA,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 2
        }
      }, {
        bits: 0x789D,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 3
        }
      }, {
        bits: 0x662F,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 4
        }
      }, {
        bits: 0x6318,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 5
        }
      }, {
        bits: 0x6C41,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 6
        }
      }, {
        bits: 0x6976,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 7
        }
      }, {
        bits: 0x1689,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 0
        }
      }, {
        bits: 0x13BE,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 1
        }
      }, {
        bits: 0x1CE7,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 2
        }
      }, {
        bits: 0x19D0,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 3
        }
      }, {
        bits: 0x0762,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 4
        }
      }, {
        bits: 0x0255,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 5
        }
      }, {
        bits: 0x0D0C,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 6
        }
      }, {
        bits: 0x083B,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 7
        }
      }, {
        bits: 0x355F,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 0
        }
      }, {
        bits: 0x3068,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 1
        }
      }, {
        bits: 0x3F31,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 2
        }
      }, {
        bits: 0x3A06,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 3
        }
      }, {
        bits: 0x24B4,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 4
        }
      }, {
        bits: 0x2183,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 5
        }
      }, {
        bits: 0x2EDA,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 6
        }
      }, {
        bits: 0x2BED,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 7
        }
      }];
      var DATA_MASKS = [function (p) {
        return (p.y + p.x) % 2 === 0;
      }, function (p) {
        return p.y % 2 === 0;
      }, function (p) {
        return p.x % 3 === 0;
      }, function (p) {
        return (p.y + p.x) % 3 === 0;
      }, function (p) {
        return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0;
      }, function (p) {
        return p.x * p.y % 2 + p.x * p.y % 3 === 0;
      }, function (p) {
        return (p.y * p.x % 2 + p.y * p.x % 3) % 2 === 0;
      }, function (p) {
        return ((p.y + p.x) % 2 + p.y * p.x % 3) % 2 === 0;
      }];
      function buildFunctionPatternMask(version) {
        var dimension = 17 + 4 * version.versionNumber;
        var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
        matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
        matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
        matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
        // Alignment patterns
        for (var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++) {
          var x = _a[_i];
          for (var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++) {
            var y = _c[_b];
            if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) {
              matrix.setRegion(x - 2, y - 2, 5, 5, true);
            }
          }
        }
        matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
        matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
        if (version.versionNumber > 6) {
          matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
          matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
        }

        return matrix;
      }
      function readCodewords(matrix, version, formatInfo) {
        var dataMask = DATA_MASKS[formatInfo.dataMask];
        var dimension = matrix.height;
        var functionPatternMask = buildFunctionPatternMask(version);
        var codewords = [];
        var currentByte = 0;
        var bitsRead = 0;
        // Read columns in pairs, from right to left
        var readingUp = true;
        for (var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2) {
          if (columnIndex === 6) {
            // Skip whole column with vertical alignment pattern;
            columnIndex--;
          }
          for (var i = 0; i < dimension; i++) {
            var y = readingUp ? dimension - 1 - i : i;
            for (var columnOffset = 0; columnOffset < 2; columnOffset++) {
              var x = columnIndex - columnOffset;
              if (!functionPatternMask.get(x, y)) {
                bitsRead++;
                var bit = matrix.get(x, y);
                if (dataMask({
                  y: y,
                  x: x
                })) {
                  bit = !bit;
                }
                currentByte = pushBit(bit, currentByte);
                if (bitsRead === 8) {
                  // Whole bytes
                  codewords.push(currentByte);
                  bitsRead = 0;
                  currentByte = 0;
                }
              }
            }
          }
          readingUp = !readingUp;
        }
        return codewords;
      }
      function readVersion(matrix) {
        var dimension = matrix.height;
        var provisionalVersion = Math.floor((dimension - 17) / 4);
        if (provisionalVersion <= 6) {
          // 6 and under dont have version info in the QR code
          return version_1.VERSIONS[provisionalVersion - 1];
        }
        var topRightVersionBits = 0;
        for (var y = 5; y >= 0; y--) {
          for (var x = dimension - 9; x >= dimension - 11; x--) {
            topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
          }
        }
        var bottomLeftVersionBits = 0;
        for (var x = 5; x >= 0; x--) {
          for (var y = dimension - 9; y >= dimension - 11; y--) {
            bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
          }
        }
        var bestDifference = Infinity;
        var bestVersion;
        for (var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++) {
          var version = VERSIONS_1[_i];
          if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) {
            return version;
          }
          var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
          if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
          }
          difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
          if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
          }
        }
        // We can tolerate up to 3 bits of error since no two version info codewords will
        // differ in less than 8 bits.
        if (bestDifference <= 3) {
          return bestVersion;
        }
      }
      function readFormatInformation(matrix) {
        var topLeftFormatInfoBits = 0;
        for (var x = 0; x <= 8; x++) {
          if (x !== 6) {
            // Skip timing pattern bit
            topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
          }
        }
        for (var y = 7; y >= 0; y--) {
          if (y !== 6) {
            // Skip timing pattern bit
            topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
          }
        }
        var dimension = matrix.height;
        var topRightBottomRightFormatInfoBits = 0;
        for (var y = dimension - 1; y >= dimension - 7; y--) {
          // bottom left
          topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
        }
        for (var x = dimension - 8; x < dimension; x++) {
          // top right
          topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
        }
        var bestDifference = Infinity;
        var bestFormatInfo = null;
        for (var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++) {
          var _a = FORMAT_INFO_TABLE_1[_i],
            bits = _a.bits,
            formatInfo = _a.formatInfo;
          if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) {
            return formatInfo;
          }
          var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
          if (difference < bestDifference) {
            bestFormatInfo = formatInfo;
            bestDifference = difference;
          }
          if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
            // also try the other option
            difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
            if (difference < bestDifference) {
              bestFormatInfo = formatInfo;
              bestDifference = difference;
            }
          }
        }
        // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
        if (bestDifference <= 3) {
          return bestFormatInfo;
        }
        return null;
      }
      function getDataBlocks(codewords, version, ecLevel) {
        var ecInfo = version.errorCorrectionLevels[ecLevel];
        var dataBlocks = [];
        var totalCodewords = 0;
        ecInfo.ecBlocks.forEach(function (block) {
          for (var i = 0; i < block.numBlocks; i++) {
            dataBlocks.push({
              numDataCodewords: block.dataCodewordsPerBlock,
              codewords: []
            });
            totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
          }
        });
        // In some cases the QR code will be malformed enough that we pull off more or less than we should.
        // If we pull off less there's nothing we can do.
        // If we pull off more we can safely truncate
        if (codewords.length < totalCodewords) {
          return null;
        }
        codewords = codewords.slice(0, totalCodewords);
        var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
        // Pull codewords to fill the blocks up to the minimum size
        for (var i = 0; i < shortBlockSize; i++) {
          for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
            var dataBlock = dataBlocks_1[_i];
            dataBlock.codewords.push(codewords.shift());
          }
        }
        // If there are any large blocks, pull codewords to fill the last element of those
        if (ecInfo.ecBlocks.length > 1) {
          var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
          var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
          for (var i = 0; i < largeBlockCount; i++) {
            dataBlocks[smallBlockCount + i].codewords.push(codewords.shift());
          }
        }
        // Add the rest of the codewords to the blocks. These are the error correction codewords.
        while (codewords.length > 0) {
          for (var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++) {
            var dataBlock = dataBlocks_2[_a];
            dataBlock.codewords.push(codewords.shift());
          }
        }
        return dataBlocks;
      }
      function decodeMatrix(matrix) {
        var version = readVersion(matrix);
        if (!version) {
          return null;
        }
        var formatInfo = readFormatInformation(matrix);
        if (!formatInfo) {
          return null;
        }
        var codewords = readCodewords(matrix, version, formatInfo);
        var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
        if (!dataBlocks) {
          return null;
        }
        // Count total number of data bytes
        var totalBytes = dataBlocks.reduce(function (a, b) {
          return a + b.numDataCodewords;
        }, 0);
        var resultBytes = new Uint8ClampedArray(totalBytes);
        var resultIndex = 0;
        for (var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++) {
          var dataBlock = dataBlocks_3[_i];
          var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
          if (!correctedBytes) {
            return null;
          }
          for (var i = 0; i < dataBlock.numDataCodewords; i++) {
            resultBytes[resultIndex++] = correctedBytes[i];
          }
        }
        try {
          return decodeData_1.decode(resultBytes, version.versionNumber);
        } catch (_a) {
          return null;
        }
      }
      function decode(matrix) {
        if (matrix == null) {
          return null;
        }
        var result = decodeMatrix(matrix);
        if (result) {
          return result;
        }
        // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
        for (var x = 0; x < matrix.width; x++) {
          for (var y = x + 1; y < matrix.height; y++) {
            if (matrix.get(x, y) !== matrix.get(y, x)) {
              matrix.set(x, y, !matrix.get(x, y));
              matrix.set(y, x, !matrix.get(y, x));
            }
          }
        }
        return decodeMatrix(matrix);
      }
      exports.decode = decode;

      /***/
    }, /* 6 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      // tslint:disable:no-bitwise
      var BitStream_1 = __webpack_require__(7);
      var shiftJISTable_1 = __webpack_require__(8);
      var Mode;
      (function (Mode) {
        Mode["Numeric"] = "numeric";
        Mode["Alphanumeric"] = "alphanumeric";
        Mode["Byte"] = "byte";
        Mode["Kanji"] = "kanji";
        Mode["ECI"] = "eci";
      })(Mode = exports.Mode || (exports.Mode = {}));
      var ModeByte;
      (function (ModeByte) {
        ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
        ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
        ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
        ModeByte[ModeByte["Byte"] = 4] = "Byte";
        ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
        ModeByte[ModeByte["ECI"] = 7] = "ECI";
        // StructuredAppend = 0x3,
        // FNC1FirstPosition = 0x5,
        // FNC1SecondPosition = 0x9,
      })(ModeByte || (ModeByte = {}));
      function decodeNumeric(stream, size) {
        var bytes = [];
        var text = "";
        var characterCountSize = [10, 12, 14][size];
        var length = stream.readBits(characterCountSize);
        // Read digits in groups of 3
        while (length >= 3) {
          var num = stream.readBits(10);
          if (num >= 1000) {
            throw new Error("Invalid numeric value above 999");
          }
          var a = Math.floor(num / 100);
          var b = Math.floor(num / 10) % 10;
          var c = num % 10;
          bytes.push(48 + a, 48 + b, 48 + c);
          text += a.toString() + b.toString() + c.toString();
          length -= 3;
        }
        // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
        if (length === 2) {
          var num = stream.readBits(7);
          if (num >= 100) {
            throw new Error("Invalid numeric value above 99");
          }
          var a = Math.floor(num / 10);
          var b = num % 10;
          bytes.push(48 + a, 48 + b);
          text += a.toString() + b.toString();
        } else if (length === 1) {
          var num = stream.readBits(4);
          if (num >= 10) {
            throw new Error("Invalid numeric value above 9");
          }
          bytes.push(48 + num);
          text += num.toString();
        }
        return {
          bytes: bytes,
          text: text
        };
      }
      var AlphanumericCharacterCodes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
      function decodeAlphanumeric(stream, size) {
        var bytes = [];
        var text = "";
        var characterCountSize = [9, 11, 13][size];
        var length = stream.readBits(characterCountSize);
        while (length >= 2) {
          var v = stream.readBits(11);
          var a = Math.floor(v / 45);
          var b = v % 45;
          bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
          text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
          length -= 2;
        }
        if (length === 1) {
          var a = stream.readBits(6);
          bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
          text += AlphanumericCharacterCodes[a];
        }
        return {
          bytes: bytes,
          text: text
        };
      }
      function decodeByte(stream, size) {
        var bytes = [];
        var text = "";
        var characterCountSize = [8, 16, 16][size];
        var length = stream.readBits(characterCountSize);
        for (var i = 0; i < length; i++) {
          var b = stream.readBits(8);
          bytes.push(b);
        }
        try {
          text += decodeURIComponent(bytes.map(function (b) {
            return "%" + ("0" + b.toString(16)).substr(-2);
          }).join(""));
        } catch (_a) {
          // failed to decode
        }
        return {
          bytes: bytes,
          text: text
        };
      }
      function decodeKanji(stream, size) {
        var bytes = [];
        var text = "";
        var characterCountSize = [8, 10, 12][size];
        var length = stream.readBits(characterCountSize);
        for (var i = 0; i < length; i++) {
          var k = stream.readBits(13);
          var c = Math.floor(k / 0xC0) << 8 | k % 0xC0;
          if (c < 0x1F00) {
            c += 0x8140;
          } else {
            c += 0xC140;
          }
          bytes.push(c >> 8, c & 0xFF);
          text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
        }
        return {
          bytes: bytes,
          text: text
        };
      }
      function decode(data, version) {
        var _a, _b, _c, _d;
        var stream = new BitStream_1.BitStream(data);
        // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
        var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
        var result = {
          text: "",
          bytes: [],
          chunks: [],
          version: version
        };
        while (stream.available() >= 4) {
          var mode = stream.readBits(4);
          if (mode === ModeByte.Terminator) {
            return result;
          } else if (mode === ModeByte.ECI) {
            if (stream.readBits(1) === 0) {
              result.chunks.push({
                type: Mode.ECI,
                assignmentNumber: stream.readBits(7)
              });
            } else if (stream.readBits(1) === 0) {
              result.chunks.push({
                type: Mode.ECI,
                assignmentNumber: stream.readBits(14)
              });
            } else if (stream.readBits(1) === 0) {
              result.chunks.push({
                type: Mode.ECI,
                assignmentNumber: stream.readBits(21)
              });
            } else {
              // ECI data seems corrupted
              result.chunks.push({
                type: Mode.ECI,
                assignmentNumber: -1
              });
            }
          } else if (mode === ModeByte.Numeric) {
            var numericResult = decodeNumeric(stream, size);
            result.text += numericResult.text;
            (_a = result.bytes).push.apply(_a, numericResult.bytes);
            result.chunks.push({
              type: Mode.Numeric,
              text: numericResult.text
            });
          } else if (mode === ModeByte.Alphanumeric) {
            var alphanumericResult = decodeAlphanumeric(stream, size);
            result.text += alphanumericResult.text;
            (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
            result.chunks.push({
              type: Mode.Alphanumeric,
              text: alphanumericResult.text
            });
          } else if (mode === ModeByte.Byte) {
            var byteResult = decodeByte(stream, size);
            result.text += byteResult.text;
            (_c = result.bytes).push.apply(_c, byteResult.bytes);
            result.chunks.push({
              type: Mode.Byte,
              bytes: byteResult.bytes,
              text: byteResult.text
            });
          } else if (mode === ModeByte.Kanji) {
            var kanjiResult = decodeKanji(stream, size);
            result.text += kanjiResult.text;
            (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
            result.chunks.push({
              type: Mode.Kanji,
              bytes: kanjiResult.bytes,
              text: kanjiResult.text
            });
          }
        }
        // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
        if (stream.available() === 0 || stream.readBits(stream.available()) === 0) {
          return result;
        }
      }
      exports.decode = decode;

      /***/
    }, /* 7 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      // tslint:disable:no-bitwise
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var BitStream = /** @class */function () {
        function BitStream(bytes) {
          this.byteOffset = 0;
          this.bitOffset = 0;
          this.bytes = bytes;
        }
        BitStream.prototype.readBits = function (numBits) {
          if (numBits < 1 || numBits > 32 || numBits > this.available()) {
            throw new Error("Cannot read " + numBits.toString() + " bits");
          }
          var result = 0;
          // First, read remainder from current byte
          if (this.bitOffset > 0) {
            var bitsLeft = 8 - this.bitOffset;
            var toRead = numBits < bitsLeft ? numBits : bitsLeft;
            var bitsToNotRead = bitsLeft - toRead;
            var mask = 0xFF >> 8 - toRead << bitsToNotRead;
            result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
            numBits -= toRead;
            this.bitOffset += toRead;
            if (this.bitOffset === 8) {
              this.bitOffset = 0;
              this.byteOffset++;
            }
          }
          // Next read whole bytes
          if (numBits > 0) {
            while (numBits >= 8) {
              result = result << 8 | this.bytes[this.byteOffset] & 0xFF;
              this.byteOffset++;
              numBits -= 8;
            }
            // Finally read a partial byte
            if (numBits > 0) {
              var bitsToNotRead = 8 - numBits;
              var mask = 0xFF >> bitsToNotRead << bitsToNotRead;
              result = result << numBits | (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
              this.bitOffset += numBits;
            }
          }
          return result;
        };
        BitStream.prototype.available = function () {
          return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
        };
        return BitStream;
      }();
      exports.BitStream = BitStream;

      /***/
    }, /* 8 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shiftJISTable = {
        0x20: 0x0020,
        0x21: 0x0021,
        0x22: 0x0022,
        0x23: 0x0023,
        0x24: 0x0024,
        0x25: 0x0025,
        0x26: 0x0026,
        0x27: 0x0027,
        0x28: 0x0028,
        0x29: 0x0029,
        0x2A: 0x002A,
        0x2B: 0x002B,
        0x2C: 0x002C,
        0x2D: 0x002D,
        0x2E: 0x002E,
        0x2F: 0x002F,
        0x30: 0x0030,
        0x31: 0x0031,
        0x32: 0x0032,
        0x33: 0x0033,
        0x34: 0x0034,
        0x35: 0x0035,
        0x36: 0x0036,
        0x37: 0x0037,
        0x38: 0x0038,
        0x39: 0x0039,
        0x3A: 0x003A,
        0x3B: 0x003B,
        0x3C: 0x003C,
        0x3D: 0x003D,
        0x3E: 0x003E,
        0x3F: 0x003F,
        0x40: 0x0040,
        0x41: 0x0041,
        0x42: 0x0042,
        0x43: 0x0043,
        0x44: 0x0044,
        0x45: 0x0045,
        0x46: 0x0046,
        0x47: 0x0047,
        0x48: 0x0048,
        0x49: 0x0049,
        0x4A: 0x004A,
        0x4B: 0x004B,
        0x4C: 0x004C,
        0x4D: 0x004D,
        0x4E: 0x004E,
        0x4F: 0x004F,
        0x50: 0x0050,
        0x51: 0x0051,
        0x52: 0x0052,
        0x53: 0x0053,
        0x54: 0x0054,
        0x55: 0x0055,
        0x56: 0x0056,
        0x57: 0x0057,
        0x58: 0x0058,
        0x59: 0x0059,
        0x5A: 0x005A,
        0x5B: 0x005B,
        0x5C: 0x00A5,
        0x5D: 0x005D,
        0x5E: 0x005E,
        0x5F: 0x005F,
        0x60: 0x0060,
        0x61: 0x0061,
        0x62: 0x0062,
        0x63: 0x0063,
        0x64: 0x0064,
        0x65: 0x0065,
        0x66: 0x0066,
        0x67: 0x0067,
        0x68: 0x0068,
        0x69: 0x0069,
        0x6A: 0x006A,
        0x6B: 0x006B,
        0x6C: 0x006C,
        0x6D: 0x006D,
        0x6E: 0x006E,
        0x6F: 0x006F,
        0x70: 0x0070,
        0x71: 0x0071,
        0x72: 0x0072,
        0x73: 0x0073,
        0x74: 0x0074,
        0x75: 0x0075,
        0x76: 0x0076,
        0x77: 0x0077,
        0x78: 0x0078,
        0x79: 0x0079,
        0x7A: 0x007A,
        0x7B: 0x007B,
        0x7C: 0x007C,
        0x7D: 0x007D,
        0x7E: 0x203E,
        0x8140: 0x3000,
        0x8141: 0x3001,
        0x8142: 0x3002,
        0x8143: 0xFF0C,
        0x8144: 0xFF0E,
        0x8145: 0x30FB,
        0x8146: 0xFF1A,
        0x8147: 0xFF1B,
        0x8148: 0xFF1F,
        0x8149: 0xFF01,
        0x814A: 0x309B,
        0x814B: 0x309C,
        0x814C: 0x00B4,
        0x814D: 0xFF40,
        0x814E: 0x00A8,
        0x814F: 0xFF3E,
        0x8150: 0xFFE3,
        0x8151: 0xFF3F,
        0x8152: 0x30FD,
        0x8153: 0x30FE,
        0x8154: 0x309D,
        0x8155: 0x309E,
        0x8156: 0x3003,
        0x8157: 0x4EDD,
        0x8158: 0x3005,
        0x8159: 0x3006,
        0x815A: 0x3007,
        0x815B: 0x30FC,
        0x815C: 0x2015,
        0x815D: 0x2010,
        0x815E: 0xFF0F,
        0x815F: 0x005C,
        0x8160: 0x301C,
        0x8161: 0x2016,
        0x8162: 0xFF5C,
        0x8163: 0x2026,
        0x8164: 0x2025,
        0x8165: 0x2018,
        0x8166: 0x2019,
        0x8167: 0x201C,
        0x8168: 0x201D,
        0x8169: 0xFF08,
        0x816A: 0xFF09,
        0x816B: 0x3014,
        0x816C: 0x3015,
        0x816D: 0xFF3B,
        0x816E: 0xFF3D,
        0x816F: 0xFF5B,
        0x8170: 0xFF5D,
        0x8171: 0x3008,
        0x8172: 0x3009,
        0x8173: 0x300A,
        0x8174: 0x300B,
        0x8175: 0x300C,
        0x8176: 0x300D,
        0x8177: 0x300E,
        0x8178: 0x300F,
        0x8179: 0x3010,
        0x817A: 0x3011,
        0x817B: 0xFF0B,
        0x817C: 0x2212,
        0x817D: 0x00B1,
        0x817E: 0x00D7,
        0x8180: 0x00F7,
        0x8181: 0xFF1D,
        0x8182: 0x2260,
        0x8183: 0xFF1C,
        0x8184: 0xFF1E,
        0x8185: 0x2266,
        0x8186: 0x2267,
        0x8187: 0x221E,
        0x8188: 0x2234,
        0x8189: 0x2642,
        0x818A: 0x2640,
        0x818B: 0x00B0,
        0x818C: 0x2032,
        0x818D: 0x2033,
        0x818E: 0x2103,
        0x818F: 0xFFE5,
        0x8190: 0xFF04,
        0x8191: 0x00A2,
        0x8192: 0x00A3,
        0x8193: 0xFF05,
        0x8194: 0xFF03,
        0x8195: 0xFF06,
        0x8196: 0xFF0A,
        0x8197: 0xFF20,
        0x8198: 0x00A7,
        0x8199: 0x2606,
        0x819A: 0x2605,
        0x819B: 0x25CB,
        0x819C: 0x25CF,
        0x819D: 0x25CE,
        0x819E: 0x25C7,
        0x819F: 0x25C6,
        0x81A0: 0x25A1,
        0x81A1: 0x25A0,
        0x81A2: 0x25B3,
        0x81A3: 0x25B2,
        0x81A4: 0x25BD,
        0x81A5: 0x25BC,
        0x81A6: 0x203B,
        0x81A7: 0x3012,
        0x81A8: 0x2192,
        0x81A9: 0x2190,
        0x81AA: 0x2191,
        0x81AB: 0x2193,
        0x81AC: 0x3013,
        0x81B8: 0x2208,
        0x81B9: 0x220B,
        0x81BA: 0x2286,
        0x81BB: 0x2287,
        0x81BC: 0x2282,
        0x81BD: 0x2283,
        0x81BE: 0x222A,
        0x81BF: 0x2229,
        0x81C8: 0x2227,
        0x81C9: 0x2228,
        0x81CA: 0x00AC,
        0x81CB: 0x21D2,
        0x81CC: 0x21D4,
        0x81CD: 0x2200,
        0x81CE: 0x2203,
        0x81DA: 0x2220,
        0x81DB: 0x22A5,
        0x81DC: 0x2312,
        0x81DD: 0x2202,
        0x81DE: 0x2207,
        0x81DF: 0x2261,
        0x81E0: 0x2252,
        0x81E1: 0x226A,
        0x81E2: 0x226B,
        0x81E3: 0x221A,
        0x81E4: 0x223D,
        0x81E5: 0x221D,
        0x81E6: 0x2235,
        0x81E7: 0x222B,
        0x81E8: 0x222C,
        0x81F0: 0x212B,
        0x81F1: 0x2030,
        0x81F2: 0x266F,
        0x81F3: 0x266D,
        0x81F4: 0x266A,
        0x81F5: 0x2020,
        0x81F6: 0x2021,
        0x81F7: 0x00B6,
        0x81FC: 0x25EF,
        0x824F: 0xFF10,
        0x8250: 0xFF11,
        0x8251: 0xFF12,
        0x8252: 0xFF13,
        0x8253: 0xFF14,
        0x8254: 0xFF15,
        0x8255: 0xFF16,
        0x8256: 0xFF17,
        0x8257: 0xFF18,
        0x8258: 0xFF19,
        0x8260: 0xFF21,
        0x8261: 0xFF22,
        0x8262: 0xFF23,
        0x8263: 0xFF24,
        0x8264: 0xFF25,
        0x8265: 0xFF26,
        0x8266: 0xFF27,
        0x8267: 0xFF28,
        0x8268: 0xFF29,
        0x8269: 0xFF2A,
        0x826A: 0xFF2B,
        0x826B: 0xFF2C,
        0x826C: 0xFF2D,
        0x826D: 0xFF2E,
        0x826E: 0xFF2F,
        0x826F: 0xFF30,
        0x8270: 0xFF31,
        0x8271: 0xFF32,
        0x8272: 0xFF33,
        0x8273: 0xFF34,
        0x8274: 0xFF35,
        0x8275: 0xFF36,
        0x8276: 0xFF37,
        0x8277: 0xFF38,
        0x8278: 0xFF39,
        0x8279: 0xFF3A,
        0x8281: 0xFF41,
        0x8282: 0xFF42,
        0x8283: 0xFF43,
        0x8284: 0xFF44,
        0x8285: 0xFF45,
        0x8286: 0xFF46,
        0x8287: 0xFF47,
        0x8288: 0xFF48,
        0x8289: 0xFF49,
        0x828A: 0xFF4A,
        0x828B: 0xFF4B,
        0x828C: 0xFF4C,
        0x828D: 0xFF4D,
        0x828E: 0xFF4E,
        0x828F: 0xFF4F,
        0x8290: 0xFF50,
        0x8291: 0xFF51,
        0x8292: 0xFF52,
        0x8293: 0xFF53,
        0x8294: 0xFF54,
        0x8295: 0xFF55,
        0x8296: 0xFF56,
        0x8297: 0xFF57,
        0x8298: 0xFF58,
        0x8299: 0xFF59,
        0x829A: 0xFF5A,
        0x829F: 0x3041,
        0x82A0: 0x3042,
        0x82A1: 0x3043,
        0x82A2: 0x3044,
        0x82A3: 0x3045,
        0x82A4: 0x3046,
        0x82A5: 0x3047,
        0x82A6: 0x3048,
        0x82A7: 0x3049,
        0x82A8: 0x304A,
        0x82A9: 0x304B,
        0x82AA: 0x304C,
        0x82AB: 0x304D,
        0x82AC: 0x304E,
        0x82AD: 0x304F,
        0x82AE: 0x3050,
        0x82AF: 0x3051,
        0x82B0: 0x3052,
        0x82B1: 0x3053,
        0x82B2: 0x3054,
        0x82B3: 0x3055,
        0x82B4: 0x3056,
        0x82B5: 0x3057,
        0x82B6: 0x3058,
        0x82B7: 0x3059,
        0x82B8: 0x305A,
        0x82B9: 0x305B,
        0x82BA: 0x305C,
        0x82BB: 0x305D,
        0x82BC: 0x305E,
        0x82BD: 0x305F,
        0x82BE: 0x3060,
        0x82BF: 0x3061,
        0x82C0: 0x3062,
        0x82C1: 0x3063,
        0x82C2: 0x3064,
        0x82C3: 0x3065,
        0x82C4: 0x3066,
        0x82C5: 0x3067,
        0x82C6: 0x3068,
        0x82C7: 0x3069,
        0x82C8: 0x306A,
        0x82C9: 0x306B,
        0x82CA: 0x306C,
        0x82CB: 0x306D,
        0x82CC: 0x306E,
        0x82CD: 0x306F,
        0x82CE: 0x3070,
        0x82CF: 0x3071,
        0x82D0: 0x3072,
        0x82D1: 0x3073,
        0x82D2: 0x3074,
        0x82D3: 0x3075,
        0x82D4: 0x3076,
        0x82D5: 0x3077,
        0x82D6: 0x3078,
        0x82D7: 0x3079,
        0x82D8: 0x307A,
        0x82D9: 0x307B,
        0x82DA: 0x307C,
        0x82DB: 0x307D,
        0x82DC: 0x307E,
        0x82DD: 0x307F,
        0x82DE: 0x3080,
        0x82DF: 0x3081,
        0x82E0: 0x3082,
        0x82E1: 0x3083,
        0x82E2: 0x3084,
        0x82E3: 0x3085,
        0x82E4: 0x3086,
        0x82E5: 0x3087,
        0x82E6: 0x3088,
        0x82E7: 0x3089,
        0x82E8: 0x308A,
        0x82E9: 0x308B,
        0x82EA: 0x308C,
        0x82EB: 0x308D,
        0x82EC: 0x308E,
        0x82ED: 0x308F,
        0x82EE: 0x3090,
        0x82EF: 0x3091,
        0x82F0: 0x3092,
        0x82F1: 0x3093,
        0x8340: 0x30A1,
        0x8341: 0x30A2,
        0x8342: 0x30A3,
        0x8343: 0x30A4,
        0x8344: 0x30A5,
        0x8345: 0x30A6,
        0x8346: 0x30A7,
        0x8347: 0x30A8,
        0x8348: 0x30A9,
        0x8349: 0x30AA,
        0x834A: 0x30AB,
        0x834B: 0x30AC,
        0x834C: 0x30AD,
        0x834D: 0x30AE,
        0x834E: 0x30AF,
        0x834F: 0x30B0,
        0x8350: 0x30B1,
        0x8351: 0x30B2,
        0x8352: 0x30B3,
        0x8353: 0x30B4,
        0x8354: 0x30B5,
        0x8355: 0x30B6,
        0x8356: 0x30B7,
        0x8357: 0x30B8,
        0x8358: 0x30B9,
        0x8359: 0x30BA,
        0x835A: 0x30BB,
        0x835B: 0x30BC,
        0x835C: 0x30BD,
        0x835D: 0x30BE,
        0x835E: 0x30BF,
        0x835F: 0x30C0,
        0x8360: 0x30C1,
        0x8361: 0x30C2,
        0x8362: 0x30C3,
        0x8363: 0x30C4,
        0x8364: 0x30C5,
        0x8365: 0x30C6,
        0x8366: 0x30C7,
        0x8367: 0x30C8,
        0x8368: 0x30C9,
        0x8369: 0x30CA,
        0x836A: 0x30CB,
        0x836B: 0x30CC,
        0x836C: 0x30CD,
        0x836D: 0x30CE,
        0x836E: 0x30CF,
        0x836F: 0x30D0,
        0x8370: 0x30D1,
        0x8371: 0x30D2,
        0x8372: 0x30D3,
        0x8373: 0x30D4,
        0x8374: 0x30D5,
        0x8375: 0x30D6,
        0x8376: 0x30D7,
        0x8377: 0x30D8,
        0x8378: 0x30D9,
        0x8379: 0x30DA,
        0x837A: 0x30DB,
        0x837B: 0x30DC,
        0x837C: 0x30DD,
        0x837D: 0x30DE,
        0x837E: 0x30DF,
        0x8380: 0x30E0,
        0x8381: 0x30E1,
        0x8382: 0x30E2,
        0x8383: 0x30E3,
        0x8384: 0x30E4,
        0x8385: 0x30E5,
        0x8386: 0x30E6,
        0x8387: 0x30E7,
        0x8388: 0x30E8,
        0x8389: 0x30E9,
        0x838A: 0x30EA,
        0x838B: 0x30EB,
        0x838C: 0x30EC,
        0x838D: 0x30ED,
        0x838E: 0x30EE,
        0x838F: 0x30EF,
        0x8390: 0x30F0,
        0x8391: 0x30F1,
        0x8392: 0x30F2,
        0x8393: 0x30F3,
        0x8394: 0x30F4,
        0x8395: 0x30F5,
        0x8396: 0x30F6,
        0x839F: 0x0391,
        0x83A0: 0x0392,
        0x83A1: 0x0393,
        0x83A2: 0x0394,
        0x83A3: 0x0395,
        0x83A4: 0x0396,
        0x83A5: 0x0397,
        0x83A6: 0x0398,
        0x83A7: 0x0399,
        0x83A8: 0x039A,
        0x83A9: 0x039B,
        0x83AA: 0x039C,
        0x83AB: 0x039D,
        0x83AC: 0x039E,
        0x83AD: 0x039F,
        0x83AE: 0x03A0,
        0x83AF: 0x03A1,
        0x83B0: 0x03A3,
        0x83B1: 0x03A4,
        0x83B2: 0x03A5,
        0x83B3: 0x03A6,
        0x83B4: 0x03A7,
        0x83B5: 0x03A8,
        0x83B6: 0x03A9,
        0x83BF: 0x03B1,
        0x83C0: 0x03B2,
        0x83C1: 0x03B3,
        0x83C2: 0x03B4,
        0x83C3: 0x03B5,
        0x83C4: 0x03B6,
        0x83C5: 0x03B7,
        0x83C6: 0x03B8,
        0x83C7: 0x03B9,
        0x83C8: 0x03BA,
        0x83C9: 0x03BB,
        0x83CA: 0x03BC,
        0x83CB: 0x03BD,
        0x83CC: 0x03BE,
        0x83CD: 0x03BF,
        0x83CE: 0x03C0,
        0x83CF: 0x03C1,
        0x83D0: 0x03C3,
        0x83D1: 0x03C4,
        0x83D2: 0x03C5,
        0x83D3: 0x03C6,
        0x83D4: 0x03C7,
        0x83D5: 0x03C8,
        0x83D6: 0x03C9,
        0x8440: 0x0410,
        0x8441: 0x0411,
        0x8442: 0x0412,
        0x8443: 0x0413,
        0x8444: 0x0414,
        0x8445: 0x0415,
        0x8446: 0x0401,
        0x8447: 0x0416,
        0x8448: 0x0417,
        0x8449: 0x0418,
        0x844A: 0x0419,
        0x844B: 0x041A,
        0x844C: 0x041B,
        0x844D: 0x041C,
        0x844E: 0x041D,
        0x844F: 0x041E,
        0x8450: 0x041F,
        0x8451: 0x0420,
        0x8452: 0x0421,
        0x8453: 0x0422,
        0x8454: 0x0423,
        0x8455: 0x0424,
        0x8456: 0x0425,
        0x8457: 0x0426,
        0x8458: 0x0427,
        0x8459: 0x0428,
        0x845A: 0x0429,
        0x845B: 0x042A,
        0x845C: 0x042B,
        0x845D: 0x042C,
        0x845E: 0x042D,
        0x845F: 0x042E,
        0x8460: 0x042F,
        0x8470: 0x0430,
        0x8471: 0x0431,
        0x8472: 0x0432,
        0x8473: 0x0433,
        0x8474: 0x0434,
        0x8475: 0x0435,
        0x8476: 0x0451,
        0x8477: 0x0436,
        0x8478: 0x0437,
        0x8479: 0x0438,
        0x847A: 0x0439,
        0x847B: 0x043A,
        0x847C: 0x043B,
        0x847D: 0x043C,
        0x847E: 0x043D,
        0x8480: 0x043E,
        0x8481: 0x043F,
        0x8482: 0x0440,
        0x8483: 0x0441,
        0x8484: 0x0442,
        0x8485: 0x0443,
        0x8486: 0x0444,
        0x8487: 0x0445,
        0x8488: 0x0446,
        0x8489: 0x0447,
        0x848A: 0x0448,
        0x848B: 0x0449,
        0x848C: 0x044A,
        0x848D: 0x044B,
        0x848E: 0x044C,
        0x848F: 0x044D,
        0x8490: 0x044E,
        0x8491: 0x044F,
        0x849F: 0x2500,
        0x84A0: 0x2502,
        0x84A1: 0x250C,
        0x84A2: 0x2510,
        0x84A3: 0x2518,
        0x84A4: 0x2514,
        0x84A5: 0x251C,
        0x84A6: 0x252C,
        0x84A7: 0x2524,
        0x84A8: 0x2534,
        0x84A9: 0x253C,
        0x84AA: 0x2501,
        0x84AB: 0x2503,
        0x84AC: 0x250F,
        0x84AD: 0x2513,
        0x84AE: 0x251B,
        0x84AF: 0x2517,
        0x84B0: 0x2523,
        0x84B1: 0x2533,
        0x84B2: 0x252B,
        0x84B3: 0x253B,
        0x84B4: 0x254B,
        0x84B5: 0x2520,
        0x84B6: 0x252F,
        0x84B7: 0x2528,
        0x84B8: 0x2537,
        0x84B9: 0x253F,
        0x84BA: 0x251D,
        0x84BB: 0x2530,
        0x84BC: 0x2525,
        0x84BD: 0x2538,
        0x84BE: 0x2542,
        0x889F: 0x4E9C,
        0x88A0: 0x5516,
        0x88A1: 0x5A03,
        0x88A2: 0x963F,
        0x88A3: 0x54C0,
        0x88A4: 0x611B,
        0x88A5: 0x6328,
        0x88A6: 0x59F6,
        0x88A7: 0x9022,
        0x88A8: 0x8475,
        0x88A9: 0x831C,
        0x88AA: 0x7A50,
        0x88AB: 0x60AA,
        0x88AC: 0x63E1,
        0x88AD: 0x6E25,
        0x88AE: 0x65ED,
        0x88AF: 0x8466,
        0x88B0: 0x82A6,
        0x88B1: 0x9BF5,
        0x88B2: 0x6893,
        0x88B3: 0x5727,
        0x88B4: 0x65A1,
        0x88B5: 0x6271,
        0x88B6: 0x5B9B,
        0x88B7: 0x59D0,
        0x88B8: 0x867B,
        0x88B9: 0x98F4,
        0x88BA: 0x7D62,
        0x88BB: 0x7DBE,
        0x88BC: 0x9B8E,
        0x88BD: 0x6216,
        0x88BE: 0x7C9F,
        0x88BF: 0x88B7,
        0x88C0: 0x5B89,
        0x88C1: 0x5EB5,
        0x88C2: 0x6309,
        0x88C3: 0x6697,
        0x88C4: 0x6848,
        0x88C5: 0x95C7,
        0x88C6: 0x978D,
        0x88C7: 0x674F,
        0x88C8: 0x4EE5,
        0x88C9: 0x4F0A,
        0x88CA: 0x4F4D,
        0x88CB: 0x4F9D,
        0x88CC: 0x5049,
        0x88CD: 0x56F2,
        0x88CE: 0x5937,
        0x88CF: 0x59D4,
        0x88D0: 0x5A01,
        0x88D1: 0x5C09,
        0x88D2: 0x60DF,
        0x88D3: 0x610F,
        0x88D4: 0x6170,
        0x88D5: 0x6613,
        0x88D6: 0x6905,
        0x88D7: 0x70BA,
        0x88D8: 0x754F,
        0x88D9: 0x7570,
        0x88DA: 0x79FB,
        0x88DB: 0x7DAD,
        0x88DC: 0x7DEF,
        0x88DD: 0x80C3,
        0x88DE: 0x840E,
        0x88DF: 0x8863,
        0x88E0: 0x8B02,
        0x88E1: 0x9055,
        0x88E2: 0x907A,
        0x88E3: 0x533B,
        0x88E4: 0x4E95,
        0x88E5: 0x4EA5,
        0x88E6: 0x57DF,
        0x88E7: 0x80B2,
        0x88E8: 0x90C1,
        0x88E9: 0x78EF,
        0x88EA: 0x4E00,
        0x88EB: 0x58F1,
        0x88EC: 0x6EA2,
        0x88ED: 0x9038,
        0x88EE: 0x7A32,
        0x88EF: 0x8328,
        0x88F0: 0x828B,
        0x88F1: 0x9C2F,
        0x88F2: 0x5141,
        0x88F3: 0x5370,
        0x88F4: 0x54BD,
        0x88F5: 0x54E1,
        0x88F6: 0x56E0,
        0x88F7: 0x59FB,
        0x88F8: 0x5F15,
        0x88F9: 0x98F2,
        0x88FA: 0x6DEB,
        0x88FB: 0x80E4,
        0x88FC: 0x852D,
        0x8940: 0x9662,
        0x8941: 0x9670,
        0x8942: 0x96A0,
        0x8943: 0x97FB,
        0x8944: 0x540B,
        0x8945: 0x53F3,
        0x8946: 0x5B87,
        0x8947: 0x70CF,
        0x8948: 0x7FBD,
        0x8949: 0x8FC2,
        0x894A: 0x96E8,
        0x894B: 0x536F,
        0x894C: 0x9D5C,
        0x894D: 0x7ABA,
        0x894E: 0x4E11,
        0x894F: 0x7893,
        0x8950: 0x81FC,
        0x8951: 0x6E26,
        0x8952: 0x5618,
        0x8953: 0x5504,
        0x8954: 0x6B1D,
        0x8955: 0x851A,
        0x8956: 0x9C3B,
        0x8957: 0x59E5,
        0x8958: 0x53A9,
        0x8959: 0x6D66,
        0x895A: 0x74DC,
        0x895B: 0x958F,
        0x895C: 0x5642,
        0x895D: 0x4E91,
        0x895E: 0x904B,
        0x895F: 0x96F2,
        0x8960: 0x834F,
        0x8961: 0x990C,
        0x8962: 0x53E1,
        0x8963: 0x55B6,
        0x8964: 0x5B30,
        0x8965: 0x5F71,
        0x8966: 0x6620,
        0x8967: 0x66F3,
        0x8968: 0x6804,
        0x8969: 0x6C38,
        0x896A: 0x6CF3,
        0x896B: 0x6D29,
        0x896C: 0x745B,
        0x896D: 0x76C8,
        0x896E: 0x7A4E,
        0x896F: 0x9834,
        0x8970: 0x82F1,
        0x8971: 0x885B,
        0x8972: 0x8A60,
        0x8973: 0x92ED,
        0x8974: 0x6DB2,
        0x8975: 0x75AB,
        0x8976: 0x76CA,
        0x8977: 0x99C5,
        0x8978: 0x60A6,
        0x8979: 0x8B01,
        0x897A: 0x8D8A,
        0x897B: 0x95B2,
        0x897C: 0x698E,
        0x897D: 0x53AD,
        0x897E: 0x5186,
        0x8980: 0x5712,
        0x8981: 0x5830,
        0x8982: 0x5944,
        0x8983: 0x5BB4,
        0x8984: 0x5EF6,
        0x8985: 0x6028,
        0x8986: 0x63A9,
        0x8987: 0x63F4,
        0x8988: 0x6CBF,
        0x8989: 0x6F14,
        0x898A: 0x708E,
        0x898B: 0x7114,
        0x898C: 0x7159,
        0x898D: 0x71D5,
        0x898E: 0x733F,
        0x898F: 0x7E01,
        0x8990: 0x8276,
        0x8991: 0x82D1,
        0x8992: 0x8597,
        0x8993: 0x9060,
        0x8994: 0x925B,
        0x8995: 0x9D1B,
        0x8996: 0x5869,
        0x8997: 0x65BC,
        0x8998: 0x6C5A,
        0x8999: 0x7525,
        0x899A: 0x51F9,
        0x899B: 0x592E,
        0x899C: 0x5965,
        0x899D: 0x5F80,
        0x899E: 0x5FDC,
        0x899F: 0x62BC,
        0x89A0: 0x65FA,
        0x89A1: 0x6A2A,
        0x89A2: 0x6B27,
        0x89A3: 0x6BB4,
        0x89A4: 0x738B,
        0x89A5: 0x7FC1,
        0x89A6: 0x8956,
        0x89A7: 0x9D2C,
        0x89A8: 0x9D0E,
        0x89A9: 0x9EC4,
        0x89AA: 0x5CA1,
        0x89AB: 0x6C96,
        0x89AC: 0x837B,
        0x89AD: 0x5104,
        0x89AE: 0x5C4B,
        0x89AF: 0x61B6,
        0x89B0: 0x81C6,
        0x89B1: 0x6876,
        0x89B2: 0x7261,
        0x89B3: 0x4E59,
        0x89B4: 0x4FFA,
        0x89B5: 0x5378,
        0x89B6: 0x6069,
        0x89B7: 0x6E29,
        0x89B8: 0x7A4F,
        0x89B9: 0x97F3,
        0x89BA: 0x4E0B,
        0x89BB: 0x5316,
        0x89BC: 0x4EEE,
        0x89BD: 0x4F55,
        0x89BE: 0x4F3D,
        0x89BF: 0x4FA1,
        0x89C0: 0x4F73,
        0x89C1: 0x52A0,
        0x89C2: 0x53EF,
        0x89C3: 0x5609,
        0x89C4: 0x590F,
        0x89C5: 0x5AC1,
        0x89C6: 0x5BB6,
        0x89C7: 0x5BE1,
        0x89C8: 0x79D1,
        0x89C9: 0x6687,
        0x89CA: 0x679C,
        0x89CB: 0x67B6,
        0x89CC: 0x6B4C,
        0x89CD: 0x6CB3,
        0x89CE: 0x706B,
        0x89CF: 0x73C2,
        0x89D0: 0x798D,
        0x89D1: 0x79BE,
        0x89D2: 0x7A3C,
        0x89D3: 0x7B87,
        0x89D4: 0x82B1,
        0x89D5: 0x82DB,
        0x89D6: 0x8304,
        0x89D7: 0x8377,
        0x89D8: 0x83EF,
        0x89D9: 0x83D3,
        0x89DA: 0x8766,
        0x89DB: 0x8AB2,
        0x89DC: 0x5629,
        0x89DD: 0x8CA8,
        0x89DE: 0x8FE6,
        0x89DF: 0x904E,
        0x89E0: 0x971E,
        0x89E1: 0x868A,
        0x89E2: 0x4FC4,
        0x89E3: 0x5CE8,
        0x89E4: 0x6211,
        0x89E5: 0x7259,
        0x89E6: 0x753B,
        0x89E7: 0x81E5,
        0x89E8: 0x82BD,
        0x89E9: 0x86FE,
        0x89EA: 0x8CC0,
        0x89EB: 0x96C5,
        0x89EC: 0x9913,
        0x89ED: 0x99D5,
        0x89EE: 0x4ECB,
        0x89EF: 0x4F1A,
        0x89F0: 0x89E3,
        0x89F1: 0x56DE,
        0x89F2: 0x584A,
        0x89F3: 0x58CA,
        0x89F4: 0x5EFB,
        0x89F5: 0x5FEB,
        0x89F6: 0x602A,
        0x89F7: 0x6094,
        0x89F8: 0x6062,
        0x89F9: 0x61D0,
        0x89FA: 0x6212,
        0x89FB: 0x62D0,
        0x89FC: 0x6539,
        0x8A40: 0x9B41,
        0x8A41: 0x6666,
        0x8A42: 0x68B0,
        0x8A43: 0x6D77,
        0x8A44: 0x7070,
        0x8A45: 0x754C,
        0x8A46: 0x7686,
        0x8A47: 0x7D75,
        0x8A48: 0x82A5,
        0x8A49: 0x87F9,
        0x8A4A: 0x958B,
        0x8A4B: 0x968E,
        0x8A4C: 0x8C9D,
        0x8A4D: 0x51F1,
        0x8A4E: 0x52BE,
        0x8A4F: 0x5916,
        0x8A50: 0x54B3,
        0x8A51: 0x5BB3,
        0x8A52: 0x5D16,
        0x8A53: 0x6168,
        0x8A54: 0x6982,
        0x8A55: 0x6DAF,
        0x8A56: 0x788D,
        0x8A57: 0x84CB,
        0x8A58: 0x8857,
        0x8A59: 0x8A72,
        0x8A5A: 0x93A7,
        0x8A5B: 0x9AB8,
        0x8A5C: 0x6D6C,
        0x8A5D: 0x99A8,
        0x8A5E: 0x86D9,
        0x8A5F: 0x57A3,
        0x8A60: 0x67FF,
        0x8A61: 0x86CE,
        0x8A62: 0x920E,
        0x8A63: 0x5283,
        0x8A64: 0x5687,
        0x8A65: 0x5404,
        0x8A66: 0x5ED3,
        0x8A67: 0x62E1,
        0x8A68: 0x64B9,
        0x8A69: 0x683C,
        0x8A6A: 0x6838,
        0x8A6B: 0x6BBB,
        0x8A6C: 0x7372,
        0x8A6D: 0x78BA,
        0x8A6E: 0x7A6B,
        0x8A6F: 0x899A,
        0x8A70: 0x89D2,
        0x8A71: 0x8D6B,
        0x8A72: 0x8F03,
        0x8A73: 0x90ED,
        0x8A74: 0x95A3,
        0x8A75: 0x9694,
        0x8A76: 0x9769,
        0x8A77: 0x5B66,
        0x8A78: 0x5CB3,
        0x8A79: 0x697D,
        0x8A7A: 0x984D,
        0x8A7B: 0x984E,
        0x8A7C: 0x639B,
        0x8A7D: 0x7B20,
        0x8A7E: 0x6A2B,
        0x8A80: 0x6A7F,
        0x8A81: 0x68B6,
        0x8A82: 0x9C0D,
        0x8A83: 0x6F5F,
        0x8A84: 0x5272,
        0x8A85: 0x559D,
        0x8A86: 0x6070,
        0x8A87: 0x62EC,
        0x8A88: 0x6D3B,
        0x8A89: 0x6E07,
        0x8A8A: 0x6ED1,
        0x8A8B: 0x845B,
        0x8A8C: 0x8910,
        0x8A8D: 0x8F44,
        0x8A8E: 0x4E14,
        0x8A8F: 0x9C39,
        0x8A90: 0x53F6,
        0x8A91: 0x691B,
        0x8A92: 0x6A3A,
        0x8A93: 0x9784,
        0x8A94: 0x682A,
        0x8A95: 0x515C,
        0x8A96: 0x7AC3,
        0x8A97: 0x84B2,
        0x8A98: 0x91DC,
        0x8A99: 0x938C,
        0x8A9A: 0x565B,
        0x8A9B: 0x9D28,
        0x8A9C: 0x6822,
        0x8A9D: 0x8305,
        0x8A9E: 0x8431,
        0x8A9F: 0x7CA5,
        0x8AA0: 0x5208,
        0x8AA1: 0x82C5,
        0x8AA2: 0x74E6,
        0x8AA3: 0x4E7E,
        0x8AA4: 0x4F83,
        0x8AA5: 0x51A0,
        0x8AA6: 0x5BD2,
        0x8AA7: 0x520A,
        0x8AA8: 0x52D8,
        0x8AA9: 0x52E7,
        0x8AAA: 0x5DFB,
        0x8AAB: 0x559A,
        0x8AAC: 0x582A,
        0x8AAD: 0x59E6,
        0x8AAE: 0x5B8C,
        0x8AAF: 0x5B98,
        0x8AB0: 0x5BDB,
        0x8AB1: 0x5E72,
        0x8AB2: 0x5E79,
        0x8AB3: 0x60A3,
        0x8AB4: 0x611F,
        0x8AB5: 0x6163,
        0x8AB6: 0x61BE,
        0x8AB7: 0x63DB,
        0x8AB8: 0x6562,
        0x8AB9: 0x67D1,
        0x8ABA: 0x6853,
        0x8ABB: 0x68FA,
        0x8ABC: 0x6B3E,
        0x8ABD: 0x6B53,
        0x8ABE: 0x6C57,
        0x8ABF: 0x6F22,
        0x8AC0: 0x6F97,
        0x8AC1: 0x6F45,
        0x8AC2: 0x74B0,
        0x8AC3: 0x7518,
        0x8AC4: 0x76E3,
        0x8AC5: 0x770B,
        0x8AC6: 0x7AFF,
        0x8AC7: 0x7BA1,
        0x8AC8: 0x7C21,
        0x8AC9: 0x7DE9,
        0x8ACA: 0x7F36,
        0x8ACB: 0x7FF0,
        0x8ACC: 0x809D,
        0x8ACD: 0x8266,
        0x8ACE: 0x839E,
        0x8ACF: 0x89B3,
        0x8AD0: 0x8ACC,
        0x8AD1: 0x8CAB,
        0x8AD2: 0x9084,
        0x8AD3: 0x9451,
        0x8AD4: 0x9593,
        0x8AD5: 0x9591,
        0x8AD6: 0x95A2,
        0x8AD7: 0x9665,
        0x8AD8: 0x97D3,
        0x8AD9: 0x9928,
        0x8ADA: 0x8218,
        0x8ADB: 0x4E38,
        0x8ADC: 0x542B,
        0x8ADD: 0x5CB8,
        0x8ADE: 0x5DCC,
        0x8ADF: 0x73A9,
        0x8AE0: 0x764C,
        0x8AE1: 0x773C,
        0x8AE2: 0x5CA9,
        0x8AE3: 0x7FEB,
        0x8AE4: 0x8D0B,
        0x8AE5: 0x96C1,
        0x8AE6: 0x9811,
        0x8AE7: 0x9854,
        0x8AE8: 0x9858,
        0x8AE9: 0x4F01,
        0x8AEA: 0x4F0E,
        0x8AEB: 0x5371,
        0x8AEC: 0x559C,
        0x8AED: 0x5668,
        0x8AEE: 0x57FA,
        0x8AEF: 0x5947,
        0x8AF0: 0x5B09,
        0x8AF1: 0x5BC4,
        0x8AF2: 0x5C90,
        0x8AF3: 0x5E0C,
        0x8AF4: 0x5E7E,
        0x8AF5: 0x5FCC,
        0x8AF6: 0x63EE,
        0x8AF7: 0x673A,
        0x8AF8: 0x65D7,
        0x8AF9: 0x65E2,
        0x8AFA: 0x671F,
        0x8AFB: 0x68CB,
        0x8AFC: 0x68C4,
        0x8B40: 0x6A5F,
        0x8B41: 0x5E30,
        0x8B42: 0x6BC5,
        0x8B43: 0x6C17,
        0x8B44: 0x6C7D,
        0x8B45: 0x757F,
        0x8B46: 0x7948,
        0x8B47: 0x5B63,
        0x8B48: 0x7A00,
        0x8B49: 0x7D00,
        0x8B4A: 0x5FBD,
        0x8B4B: 0x898F,
        0x8B4C: 0x8A18,
        0x8B4D: 0x8CB4,
        0x8B4E: 0x8D77,
        0x8B4F: 0x8ECC,
        0x8B50: 0x8F1D,
        0x8B51: 0x98E2,
        0x8B52: 0x9A0E,
        0x8B53: 0x9B3C,
        0x8B54: 0x4E80,
        0x8B55: 0x507D,
        0x8B56: 0x5100,
        0x8B57: 0x5993,
        0x8B58: 0x5B9C,
        0x8B59: 0x622F,
        0x8B5A: 0x6280,
        0x8B5B: 0x64EC,
        0x8B5C: 0x6B3A,
        0x8B5D: 0x72A0,
        0x8B5E: 0x7591,
        0x8B5F: 0x7947,
        0x8B60: 0x7FA9,
        0x8B61: 0x87FB,
        0x8B62: 0x8ABC,
        0x8B63: 0x8B70,
        0x8B64: 0x63AC,
        0x8B65: 0x83CA,
        0x8B66: 0x97A0,
        0x8B67: 0x5409,
        0x8B68: 0x5403,
        0x8B69: 0x55AB,
        0x8B6A: 0x6854,
        0x8B6B: 0x6A58,
        0x8B6C: 0x8A70,
        0x8B6D: 0x7827,
        0x8B6E: 0x6775,
        0x8B6F: 0x9ECD,
        0x8B70: 0x5374,
        0x8B71: 0x5BA2,
        0x8B72: 0x811A,
        0x8B73: 0x8650,
        0x8B74: 0x9006,
        0x8B75: 0x4E18,
        0x8B76: 0x4E45,
        0x8B77: 0x4EC7,
        0x8B78: 0x4F11,
        0x8B79: 0x53CA,
        0x8B7A: 0x5438,
        0x8B7B: 0x5BAE,
        0x8B7C: 0x5F13,
        0x8B7D: 0x6025,
        0x8B7E: 0x6551,
        0x8B80: 0x673D,
        0x8B81: 0x6C42,
        0x8B82: 0x6C72,
        0x8B83: 0x6CE3,
        0x8B84: 0x7078,
        0x8B85: 0x7403,
        0x8B86: 0x7A76,
        0x8B87: 0x7AAE,
        0x8B88: 0x7B08,
        0x8B89: 0x7D1A,
        0x8B8A: 0x7CFE,
        0x8B8B: 0x7D66,
        0x8B8C: 0x65E7,
        0x8B8D: 0x725B,
        0x8B8E: 0x53BB,
        0x8B8F: 0x5C45,
        0x8B90: 0x5DE8,
        0x8B91: 0x62D2,
        0x8B92: 0x62E0,
        0x8B93: 0x6319,
        0x8B94: 0x6E20,
        0x8B95: 0x865A,
        0x8B96: 0x8A31,
        0x8B97: 0x8DDD,
        0x8B98: 0x92F8,
        0x8B99: 0x6F01,
        0x8B9A: 0x79A6,
        0x8B9B: 0x9B5A,
        0x8B9C: 0x4EA8,
        0x8B9D: 0x4EAB,
        0x8B9E: 0x4EAC,
        0x8B9F: 0x4F9B,
        0x8BA0: 0x4FA0,
        0x8BA1: 0x50D1,
        0x8BA2: 0x5147,
        0x8BA3: 0x7AF6,
        0x8BA4: 0x5171,
        0x8BA5: 0x51F6,
        0x8BA6: 0x5354,
        0x8BA7: 0x5321,
        0x8BA8: 0x537F,
        0x8BA9: 0x53EB,
        0x8BAA: 0x55AC,
        0x8BAB: 0x5883,
        0x8BAC: 0x5CE1,
        0x8BAD: 0x5F37,
        0x8BAE: 0x5F4A,
        0x8BAF: 0x602F,
        0x8BB0: 0x6050,
        0x8BB1: 0x606D,
        0x8BB2: 0x631F,
        0x8BB3: 0x6559,
        0x8BB4: 0x6A4B,
        0x8BB5: 0x6CC1,
        0x8BB6: 0x72C2,
        0x8BB7: 0x72ED,
        0x8BB8: 0x77EF,
        0x8BB9: 0x80F8,
        0x8BBA: 0x8105,
        0x8BBB: 0x8208,
        0x8BBC: 0x854E,
        0x8BBD: 0x90F7,
        0x8BBE: 0x93E1,
        0x8BBF: 0x97FF,
        0x8BC0: 0x9957,
        0x8BC1: 0x9A5A,
        0x8BC2: 0x4EF0,
        0x8BC3: 0x51DD,
        0x8BC4: 0x5C2D,
        0x8BC5: 0x6681,
        0x8BC6: 0x696D,
        0x8BC7: 0x5C40,
        0x8BC8: 0x66F2,
        0x8BC9: 0x6975,
        0x8BCA: 0x7389,
        0x8BCB: 0x6850,
        0x8BCC: 0x7C81,
        0x8BCD: 0x50C5,
        0x8BCE: 0x52E4,
        0x8BCF: 0x5747,
        0x8BD0: 0x5DFE,
        0x8BD1: 0x9326,
        0x8BD2: 0x65A4,
        0x8BD3: 0x6B23,
        0x8BD4: 0x6B3D,
        0x8BD5: 0x7434,
        0x8BD6: 0x7981,
        0x8BD7: 0x79BD,
        0x8BD8: 0x7B4B,
        0x8BD9: 0x7DCA,
        0x8BDA: 0x82B9,
        0x8BDB: 0x83CC,
        0x8BDC: 0x887F,
        0x8BDD: 0x895F,
        0x8BDE: 0x8B39,
        0x8BDF: 0x8FD1,
        0x8BE0: 0x91D1,
        0x8BE1: 0x541F,
        0x8BE2: 0x9280,
        0x8BE3: 0x4E5D,
        0x8BE4: 0x5036,
        0x8BE5: 0x53E5,
        0x8BE6: 0x533A,
        0x8BE7: 0x72D7,
        0x8BE8: 0x7396,
        0x8BE9: 0x77E9,
        0x8BEA: 0x82E6,
        0x8BEB: 0x8EAF,
        0x8BEC: 0x99C6,
        0x8BED: 0x99C8,
        0x8BEE: 0x99D2,
        0x8BEF: 0x5177,
        0x8BF0: 0x611A,
        0x8BF1: 0x865E,
        0x8BF2: 0x55B0,
        0x8BF3: 0x7A7A,
        0x8BF4: 0x5076,
        0x8BF5: 0x5BD3,
        0x8BF6: 0x9047,
        0x8BF7: 0x9685,
        0x8BF8: 0x4E32,
        0x8BF9: 0x6ADB,
        0x8BFA: 0x91E7,
        0x8BFB: 0x5C51,
        0x8BFC: 0x5C48,
        0x8C40: 0x6398,
        0x8C41: 0x7A9F,
        0x8C42: 0x6C93,
        0x8C43: 0x9774,
        0x8C44: 0x8F61,
        0x8C45: 0x7AAA,
        0x8C46: 0x718A,
        0x8C47: 0x9688,
        0x8C48: 0x7C82,
        0x8C49: 0x6817,
        0x8C4A: 0x7E70,
        0x8C4B: 0x6851,
        0x8C4C: 0x936C,
        0x8C4D: 0x52F2,
        0x8C4E: 0x541B,
        0x8C4F: 0x85AB,
        0x8C50: 0x8A13,
        0x8C51: 0x7FA4,
        0x8C52: 0x8ECD,
        0x8C53: 0x90E1,
        0x8C54: 0x5366,
        0x8C55: 0x8888,
        0x8C56: 0x7941,
        0x8C57: 0x4FC2,
        0x8C58: 0x50BE,
        0x8C59: 0x5211,
        0x8C5A: 0x5144,
        0x8C5B: 0x5553,
        0x8C5C: 0x572D,
        0x8C5D: 0x73EA,
        0x8C5E: 0x578B,
        0x8C5F: 0x5951,
        0x8C60: 0x5F62,
        0x8C61: 0x5F84,
        0x8C62: 0x6075,
        0x8C63: 0x6176,
        0x8C64: 0x6167,
        0x8C65: 0x61A9,
        0x8C66: 0x63B2,
        0x8C67: 0x643A,
        0x8C68: 0x656C,
        0x8C69: 0x666F,
        0x8C6A: 0x6842,
        0x8C6B: 0x6E13,
        0x8C6C: 0x7566,
        0x8C6D: 0x7A3D,
        0x8C6E: 0x7CFB,
        0x8C6F: 0x7D4C,
        0x8C70: 0x7D99,
        0x8C71: 0x7E4B,
        0x8C72: 0x7F6B,
        0x8C73: 0x830E,
        0x8C74: 0x834A,
        0x8C75: 0x86CD,
        0x8C76: 0x8A08,
        0x8C77: 0x8A63,
        0x8C78: 0x8B66,
        0x8C79: 0x8EFD,
        0x8C7A: 0x981A,
        0x8C7B: 0x9D8F,
        0x8C7C: 0x82B8,
        0x8C7D: 0x8FCE,
        0x8C7E: 0x9BE8,
        0x8C80: 0x5287,
        0x8C81: 0x621F,
        0x8C82: 0x6483,
        0x8C83: 0x6FC0,
        0x8C84: 0x9699,
        0x8C85: 0x6841,
        0x8C86: 0x5091,
        0x8C87: 0x6B20,
        0x8C88: 0x6C7A,
        0x8C89: 0x6F54,
        0x8C8A: 0x7A74,
        0x8C8B: 0x7D50,
        0x8C8C: 0x8840,
        0x8C8D: 0x8A23,
        0x8C8E: 0x6708,
        0x8C8F: 0x4EF6,
        0x8C90: 0x5039,
        0x8C91: 0x5026,
        0x8C92: 0x5065,
        0x8C93: 0x517C,
        0x8C94: 0x5238,
        0x8C95: 0x5263,
        0x8C96: 0x55A7,
        0x8C97: 0x570F,
        0x8C98: 0x5805,
        0x8C99: 0x5ACC,
        0x8C9A: 0x5EFA,
        0x8C9B: 0x61B2,
        0x8C9C: 0x61F8,
        0x8C9D: 0x62F3,
        0x8C9E: 0x6372,
        0x8C9F: 0x691C,
        0x8CA0: 0x6A29,
        0x8CA1: 0x727D,
        0x8CA2: 0x72AC,
        0x8CA3: 0x732E,
        0x8CA4: 0x7814,
        0x8CA5: 0x786F,
        0x8CA6: 0x7D79,
        0x8CA7: 0x770C,
        0x8CA8: 0x80A9,
        0x8CA9: 0x898B,
        0x8CAA: 0x8B19,
        0x8CAB: 0x8CE2,
        0x8CAC: 0x8ED2,
        0x8CAD: 0x9063,
        0x8CAE: 0x9375,
        0x8CAF: 0x967A,
        0x8CB0: 0x9855,
        0x8CB1: 0x9A13,
        0x8CB2: 0x9E78,
        0x8CB3: 0x5143,
        0x8CB4: 0x539F,
        0x8CB5: 0x53B3,
        0x8CB6: 0x5E7B,
        0x8CB7: 0x5F26,
        0x8CB8: 0x6E1B,
        0x8CB9: 0x6E90,
        0x8CBA: 0x7384,
        0x8CBB: 0x73FE,
        0x8CBC: 0x7D43,
        0x8CBD: 0x8237,
        0x8CBE: 0x8A00,
        0x8CBF: 0x8AFA,
        0x8CC0: 0x9650,
        0x8CC1: 0x4E4E,
        0x8CC2: 0x500B,
        0x8CC3: 0x53E4,
        0x8CC4: 0x547C,
        0x8CC5: 0x56FA,
        0x8CC6: 0x59D1,
        0x8CC7: 0x5B64,
        0x8CC8: 0x5DF1,
        0x8CC9: 0x5EAB,
        0x8CCA: 0x5F27,
        0x8CCB: 0x6238,
        0x8CCC: 0x6545,
        0x8CCD: 0x67AF,
        0x8CCE: 0x6E56,
        0x8CCF: 0x72D0,
        0x8CD0: 0x7CCA,
        0x8CD1: 0x88B4,
        0x8CD2: 0x80A1,
        0x8CD3: 0x80E1,
        0x8CD4: 0x83F0,
        0x8CD5: 0x864E,
        0x8CD6: 0x8A87,
        0x8CD7: 0x8DE8,
        0x8CD8: 0x9237,
        0x8CD9: 0x96C7,
        0x8CDA: 0x9867,
        0x8CDB: 0x9F13,
        0x8CDC: 0x4E94,
        0x8CDD: 0x4E92,
        0x8CDE: 0x4F0D,
        0x8CDF: 0x5348,
        0x8CE0: 0x5449,
        0x8CE1: 0x543E,
        0x8CE2: 0x5A2F,
        0x8CE3: 0x5F8C,
        0x8CE4: 0x5FA1,
        0x8CE5: 0x609F,
        0x8CE6: 0x68A7,
        0x8CE7: 0x6A8E,
        0x8CE8: 0x745A,
        0x8CE9: 0x7881,
        0x8CEA: 0x8A9E,
        0x8CEB: 0x8AA4,
        0x8CEC: 0x8B77,
        0x8CED: 0x9190,
        0x8CEE: 0x4E5E,
        0x8CEF: 0x9BC9,
        0x8CF0: 0x4EA4,
        0x8CF1: 0x4F7C,
        0x8CF2: 0x4FAF,
        0x8CF3: 0x5019,
        0x8CF4: 0x5016,
        0x8CF5: 0x5149,
        0x8CF6: 0x516C,
        0x8CF7: 0x529F,
        0x8CF8: 0x52B9,
        0x8CF9: 0x52FE,
        0x8CFA: 0x539A,
        0x8CFB: 0x53E3,
        0x8CFC: 0x5411,
        0x8D40: 0x540E,
        0x8D41: 0x5589,
        0x8D42: 0x5751,
        0x8D43: 0x57A2,
        0x8D44: 0x597D,
        0x8D45: 0x5B54,
        0x8D46: 0x5B5D,
        0x8D47: 0x5B8F,
        0x8D48: 0x5DE5,
        0x8D49: 0x5DE7,
        0x8D4A: 0x5DF7,
        0x8D4B: 0x5E78,
        0x8D4C: 0x5E83,
        0x8D4D: 0x5E9A,
        0x8D4E: 0x5EB7,
        0x8D4F: 0x5F18,
        0x8D50: 0x6052,
        0x8D51: 0x614C,
        0x8D52: 0x6297,
        0x8D53: 0x62D8,
        0x8D54: 0x63A7,
        0x8D55: 0x653B,
        0x8D56: 0x6602,
        0x8D57: 0x6643,
        0x8D58: 0x66F4,
        0x8D59: 0x676D,
        0x8D5A: 0x6821,
        0x8D5B: 0x6897,
        0x8D5C: 0x69CB,
        0x8D5D: 0x6C5F,
        0x8D5E: 0x6D2A,
        0x8D5F: 0x6D69,
        0x8D60: 0x6E2F,
        0x8D61: 0x6E9D,
        0x8D62: 0x7532,
        0x8D63: 0x7687,
        0x8D64: 0x786C,
        0x8D65: 0x7A3F,
        0x8D66: 0x7CE0,
        0x8D67: 0x7D05,
        0x8D68: 0x7D18,
        0x8D69: 0x7D5E,
        0x8D6A: 0x7DB1,
        0x8D6B: 0x8015,
        0x8D6C: 0x8003,
        0x8D6D: 0x80AF,
        0x8D6E: 0x80B1,
        0x8D6F: 0x8154,
        0x8D70: 0x818F,
        0x8D71: 0x822A,
        0x8D72: 0x8352,
        0x8D73: 0x884C,
        0x8D74: 0x8861,
        0x8D75: 0x8B1B,
        0x8D76: 0x8CA2,
        0x8D77: 0x8CFC,
        0x8D78: 0x90CA,
        0x8D79: 0x9175,
        0x8D7A: 0x9271,
        0x8D7B: 0x783F,
        0x8D7C: 0x92FC,
        0x8D7D: 0x95A4,
        0x8D7E: 0x964D,
        0x8D80: 0x9805,
        0x8D81: 0x9999,
        0x8D82: 0x9AD8,
        0x8D83: 0x9D3B,
        0x8D84: 0x525B,
        0x8D85: 0x52AB,
        0x8D86: 0x53F7,
        0x8D87: 0x5408,
        0x8D88: 0x58D5,
        0x8D89: 0x62F7,
        0x8D8A: 0x6FE0,
        0x8D8B: 0x8C6A,
        0x8D8C: 0x8F5F,
        0x8D8D: 0x9EB9,
        0x8D8E: 0x514B,
        0x8D8F: 0x523B,
        0x8D90: 0x544A,
        0x8D91: 0x56FD,
        0x8D92: 0x7A40,
        0x8D93: 0x9177,
        0x8D94: 0x9D60,
        0x8D95: 0x9ED2,
        0x8D96: 0x7344,
        0x8D97: 0x6F09,
        0x8D98: 0x8170,
        0x8D99: 0x7511,
        0x8D9A: 0x5FFD,
        0x8D9B: 0x60DA,
        0x8D9C: 0x9AA8,
        0x8D9D: 0x72DB,
        0x8D9E: 0x8FBC,
        0x8D9F: 0x6B64,
        0x8DA0: 0x9803,
        0x8DA1: 0x4ECA,
        0x8DA2: 0x56F0,
        0x8DA3: 0x5764,
        0x8DA4: 0x58BE,
        0x8DA5: 0x5A5A,
        0x8DA6: 0x6068,
        0x8DA7: 0x61C7,
        0x8DA8: 0x660F,
        0x8DA9: 0x6606,
        0x8DAA: 0x6839,
        0x8DAB: 0x68B1,
        0x8DAC: 0x6DF7,
        0x8DAD: 0x75D5,
        0x8DAE: 0x7D3A,
        0x8DAF: 0x826E,
        0x8DB0: 0x9B42,
        0x8DB1: 0x4E9B,
        0x8DB2: 0x4F50,
        0x8DB3: 0x53C9,
        0x8DB4: 0x5506,
        0x8DB5: 0x5D6F,
        0x8DB6: 0x5DE6,
        0x8DB7: 0x5DEE,
        0x8DB8: 0x67FB,
        0x8DB9: 0x6C99,
        0x8DBA: 0x7473,
        0x8DBB: 0x7802,
        0x8DBC: 0x8A50,
        0x8DBD: 0x9396,
        0x8DBE: 0x88DF,
        0x8DBF: 0x5750,
        0x8DC0: 0x5EA7,
        0x8DC1: 0x632B,
        0x8DC2: 0x50B5,
        0x8DC3: 0x50AC,
        0x8DC4: 0x518D,
        0x8DC5: 0x6700,
        0x8DC6: 0x54C9,
        0x8DC7: 0x585E,
        0x8DC8: 0x59BB,
        0x8DC9: 0x5BB0,
        0x8DCA: 0x5F69,
        0x8DCB: 0x624D,
        0x8DCC: 0x63A1,
        0x8DCD: 0x683D,
        0x8DCE: 0x6B73,
        0x8DCF: 0x6E08,
        0x8DD0: 0x707D,
        0x8DD1: 0x91C7,
        0x8DD2: 0x7280,
        0x8DD3: 0x7815,
        0x8DD4: 0x7826,
        0x8DD5: 0x796D,
        0x8DD6: 0x658E,
        0x8DD7: 0x7D30,
        0x8DD8: 0x83DC,
        0x8DD9: 0x88C1,
        0x8DDA: 0x8F09,
        0x8DDB: 0x969B,
        0x8DDC: 0x5264,
        0x8DDD: 0x5728,
        0x8DDE: 0x6750,
        0x8DDF: 0x7F6A,
        0x8DE0: 0x8CA1,
        0x8DE1: 0x51B4,
        0x8DE2: 0x5742,
        0x8DE3: 0x962A,
        0x8DE4: 0x583A,
        0x8DE5: 0x698A,
        0x8DE6: 0x80B4,
        0x8DE7: 0x54B2,
        0x8DE8: 0x5D0E,
        0x8DE9: 0x57FC,
        0x8DEA: 0x7895,
        0x8DEB: 0x9DFA,
        0x8DEC: 0x4F5C,
        0x8DED: 0x524A,
        0x8DEE: 0x548B,
        0x8DEF: 0x643E,
        0x8DF0: 0x6628,
        0x8DF1: 0x6714,
        0x8DF2: 0x67F5,
        0x8DF3: 0x7A84,
        0x8DF4: 0x7B56,
        0x8DF5: 0x7D22,
        0x8DF6: 0x932F,
        0x8DF7: 0x685C,
        0x8DF8: 0x9BAD,
        0x8DF9: 0x7B39,
        0x8DFA: 0x5319,
        0x8DFB: 0x518A,
        0x8DFC: 0x5237,
        0x8E40: 0x5BDF,
        0x8E41: 0x62F6,
        0x8E42: 0x64AE,
        0x8E43: 0x64E6,
        0x8E44: 0x672D,
        0x8E45: 0x6BBA,
        0x8E46: 0x85A9,
        0x8E47: 0x96D1,
        0x8E48: 0x7690,
        0x8E49: 0x9BD6,
        0x8E4A: 0x634C,
        0x8E4B: 0x9306,
        0x8E4C: 0x9BAB,
        0x8E4D: 0x76BF,
        0x8E4E: 0x6652,
        0x8E4F: 0x4E09,
        0x8E50: 0x5098,
        0x8E51: 0x53C2,
        0x8E52: 0x5C71,
        0x8E53: 0x60E8,
        0x8E54: 0x6492,
        0x8E55: 0x6563,
        0x8E56: 0x685F,
        0x8E57: 0x71E6,
        0x8E58: 0x73CA,
        0x8E59: 0x7523,
        0x8E5A: 0x7B97,
        0x8E5B: 0x7E82,
        0x8E5C: 0x8695,
        0x8E5D: 0x8B83,
        0x8E5E: 0x8CDB,
        0x8E5F: 0x9178,
        0x8E60: 0x9910,
        0x8E61: 0x65AC,
        0x8E62: 0x66AB,
        0x8E63: 0x6B8B,
        0x8E64: 0x4ED5,
        0x8E65: 0x4ED4,
        0x8E66: 0x4F3A,
        0x8E67: 0x4F7F,
        0x8E68: 0x523A,
        0x8E69: 0x53F8,
        0x8E6A: 0x53F2,
        0x8E6B: 0x55E3,
        0x8E6C: 0x56DB,
        0x8E6D: 0x58EB,
        0x8E6E: 0x59CB,
        0x8E6F: 0x59C9,
        0x8E70: 0x59FF,
        0x8E71: 0x5B50,
        0x8E72: 0x5C4D,
        0x8E73: 0x5E02,
        0x8E74: 0x5E2B,
        0x8E75: 0x5FD7,
        0x8E76: 0x601D,
        0x8E77: 0x6307,
        0x8E78: 0x652F,
        0x8E79: 0x5B5C,
        0x8E7A: 0x65AF,
        0x8E7B: 0x65BD,
        0x8E7C: 0x65E8,
        0x8E7D: 0x679D,
        0x8E7E: 0x6B62,
        0x8E80: 0x6B7B,
        0x8E81: 0x6C0F,
        0x8E82: 0x7345,
        0x8E83: 0x7949,
        0x8E84: 0x79C1,
        0x8E85: 0x7CF8,
        0x8E86: 0x7D19,
        0x8E87: 0x7D2B,
        0x8E88: 0x80A2,
        0x8E89: 0x8102,
        0x8E8A: 0x81F3,
        0x8E8B: 0x8996,
        0x8E8C: 0x8A5E,
        0x8E8D: 0x8A69,
        0x8E8E: 0x8A66,
        0x8E8F: 0x8A8C,
        0x8E90: 0x8AEE,
        0x8E91: 0x8CC7,
        0x8E92: 0x8CDC,
        0x8E93: 0x96CC,
        0x8E94: 0x98FC,
        0x8E95: 0x6B6F,
        0x8E96: 0x4E8B,
        0x8E97: 0x4F3C,
        0x8E98: 0x4F8D,
        0x8E99: 0x5150,
        0x8E9A: 0x5B57,
        0x8E9B: 0x5BFA,
        0x8E9C: 0x6148,
        0x8E9D: 0x6301,
        0x8E9E: 0x6642,
        0x8E9F: 0x6B21,
        0x8EA0: 0x6ECB,
        0x8EA1: 0x6CBB,
        0x8EA2: 0x723E,
        0x8EA3: 0x74BD,
        0x8EA4: 0x75D4,
        0x8EA5: 0x78C1,
        0x8EA6: 0x793A,
        0x8EA7: 0x800C,
        0x8EA8: 0x8033,
        0x8EA9: 0x81EA,
        0x8EAA: 0x8494,
        0x8EAB: 0x8F9E,
        0x8EAC: 0x6C50,
        0x8EAD: 0x9E7F,
        0x8EAE: 0x5F0F,
        0x8EAF: 0x8B58,
        0x8EB0: 0x9D2B,
        0x8EB1: 0x7AFA,
        0x8EB2: 0x8EF8,
        0x8EB3: 0x5B8D,
        0x8EB4: 0x96EB,
        0x8EB5: 0x4E03,
        0x8EB6: 0x53F1,
        0x8EB7: 0x57F7,
        0x8EB8: 0x5931,
        0x8EB9: 0x5AC9,
        0x8EBA: 0x5BA4,
        0x8EBB: 0x6089,
        0x8EBC: 0x6E7F,
        0x8EBD: 0x6F06,
        0x8EBE: 0x75BE,
        0x8EBF: 0x8CEA,
        0x8EC0: 0x5B9F,
        0x8EC1: 0x8500,
        0x8EC2: 0x7BE0,
        0x8EC3: 0x5072,
        0x8EC4: 0x67F4,
        0x8EC5: 0x829D,
        0x8EC6: 0x5C61,
        0x8EC7: 0x854A,
        0x8EC8: 0x7E1E,
        0x8EC9: 0x820E,
        0x8ECA: 0x5199,
        0x8ECB: 0x5C04,
        0x8ECC: 0x6368,
        0x8ECD: 0x8D66,
        0x8ECE: 0x659C,
        0x8ECF: 0x716E,
        0x8ED0: 0x793E,
        0x8ED1: 0x7D17,
        0x8ED2: 0x8005,
        0x8ED3: 0x8B1D,
        0x8ED4: 0x8ECA,
        0x8ED5: 0x906E,
        0x8ED6: 0x86C7,
        0x8ED7: 0x90AA,
        0x8ED8: 0x501F,
        0x8ED9: 0x52FA,
        0x8EDA: 0x5C3A,
        0x8EDB: 0x6753,
        0x8EDC: 0x707C,
        0x8EDD: 0x7235,
        0x8EDE: 0x914C,
        0x8EDF: 0x91C8,
        0x8EE0: 0x932B,
        0x8EE1: 0x82E5,
        0x8EE2: 0x5BC2,
        0x8EE3: 0x5F31,
        0x8EE4: 0x60F9,
        0x8EE5: 0x4E3B,
        0x8EE6: 0x53D6,
        0x8EE7: 0x5B88,
        0x8EE8: 0x624B,
        0x8EE9: 0x6731,
        0x8EEA: 0x6B8A,
        0x8EEB: 0x72E9,
        0x8EEC: 0x73E0,
        0x8EED: 0x7A2E,
        0x8EEE: 0x816B,
        0x8EEF: 0x8DA3,
        0x8EF0: 0x9152,
        0x8EF1: 0x9996,
        0x8EF2: 0x5112,
        0x8EF3: 0x53D7,
        0x8EF4: 0x546A,
        0x8EF5: 0x5BFF,
        0x8EF6: 0x6388,
        0x8EF7: 0x6A39,
        0x8EF8: 0x7DAC,
        0x8EF9: 0x9700,
        0x8EFA: 0x56DA,
        0x8EFB: 0x53CE,
        0x8EFC: 0x5468,
        0x8F40: 0x5B97,
        0x8F41: 0x5C31,
        0x8F42: 0x5DDE,
        0x8F43: 0x4FEE,
        0x8F44: 0x6101,
        0x8F45: 0x62FE,
        0x8F46: 0x6D32,
        0x8F47: 0x79C0,
        0x8F48: 0x79CB,
        0x8F49: 0x7D42,
        0x8F4A: 0x7E4D,
        0x8F4B: 0x7FD2,
        0x8F4C: 0x81ED,
        0x8F4D: 0x821F,
        0x8F4E: 0x8490,
        0x8F4F: 0x8846,
        0x8F50: 0x8972,
        0x8F51: 0x8B90,
        0x8F52: 0x8E74,
        0x8F53: 0x8F2F,
        0x8F54: 0x9031,
        0x8F55: 0x914B,
        0x8F56: 0x916C,
        0x8F57: 0x96C6,
        0x8F58: 0x919C,
        0x8F59: 0x4EC0,
        0x8F5A: 0x4F4F,
        0x8F5B: 0x5145,
        0x8F5C: 0x5341,
        0x8F5D: 0x5F93,
        0x8F5E: 0x620E,
        0x8F5F: 0x67D4,
        0x8F60: 0x6C41,
        0x8F61: 0x6E0B,
        0x8F62: 0x7363,
        0x8F63: 0x7E26,
        0x8F64: 0x91CD,
        0x8F65: 0x9283,
        0x8F66: 0x53D4,
        0x8F67: 0x5919,
        0x8F68: 0x5BBF,
        0x8F69: 0x6DD1,
        0x8F6A: 0x795D,
        0x8F6B: 0x7E2E,
        0x8F6C: 0x7C9B,
        0x8F6D: 0x587E,
        0x8F6E: 0x719F,
        0x8F6F: 0x51FA,
        0x8F70: 0x8853,
        0x8F71: 0x8FF0,
        0x8F72: 0x4FCA,
        0x8F73: 0x5CFB,
        0x8F74: 0x6625,
        0x8F75: 0x77AC,
        0x8F76: 0x7AE3,
        0x8F77: 0x821C,
        0x8F78: 0x99FF,
        0x8F79: 0x51C6,
        0x8F7A: 0x5FAA,
        0x8F7B: 0x65EC,
        0x8F7C: 0x696F,
        0x8F7D: 0x6B89,
        0x8F7E: 0x6DF3,
        0x8F80: 0x6E96,
        0x8F81: 0x6F64,
        0x8F82: 0x76FE,
        0x8F83: 0x7D14,
        0x8F84: 0x5DE1,
        0x8F85: 0x9075,
        0x8F86: 0x9187,
        0x8F87: 0x9806,
        0x8F88: 0x51E6,
        0x8F89: 0x521D,
        0x8F8A: 0x6240,
        0x8F8B: 0x6691,
        0x8F8C: 0x66D9,
        0x8F8D: 0x6E1A,
        0x8F8E: 0x5EB6,
        0x8F8F: 0x7DD2,
        0x8F90: 0x7F72,
        0x8F91: 0x66F8,
        0x8F92: 0x85AF,
        0x8F93: 0x85F7,
        0x8F94: 0x8AF8,
        0x8F95: 0x52A9,
        0x8F96: 0x53D9,
        0x8F97: 0x5973,
        0x8F98: 0x5E8F,
        0x8F99: 0x5F90,
        0x8F9A: 0x6055,
        0x8F9B: 0x92E4,
        0x8F9C: 0x9664,
        0x8F9D: 0x50B7,
        0x8F9E: 0x511F,
        0x8F9F: 0x52DD,
        0x8FA0: 0x5320,
        0x8FA1: 0x5347,
        0x8FA2: 0x53EC,
        0x8FA3: 0x54E8,
        0x8FA4: 0x5546,
        0x8FA5: 0x5531,
        0x8FA6: 0x5617,
        0x8FA7: 0x5968,
        0x8FA8: 0x59BE,
        0x8FA9: 0x5A3C,
        0x8FAA: 0x5BB5,
        0x8FAB: 0x5C06,
        0x8FAC: 0x5C0F,
        0x8FAD: 0x5C11,
        0x8FAE: 0x5C1A,
        0x8FAF: 0x5E84,
        0x8FB0: 0x5E8A,
        0x8FB1: 0x5EE0,
        0x8FB2: 0x5F70,
        0x8FB3: 0x627F,
        0x8FB4: 0x6284,
        0x8FB5: 0x62DB,
        0x8FB6: 0x638C,
        0x8FB7: 0x6377,
        0x8FB8: 0x6607,
        0x8FB9: 0x660C,
        0x8FBA: 0x662D,
        0x8FBB: 0x6676,
        0x8FBC: 0x677E,
        0x8FBD: 0x68A2,
        0x8FBE: 0x6A1F,
        0x8FBF: 0x6A35,
        0x8FC0: 0x6CBC,
        0x8FC1: 0x6D88,
        0x8FC2: 0x6E09,
        0x8FC3: 0x6E58,
        0x8FC4: 0x713C,
        0x8FC5: 0x7126,
        0x8FC6: 0x7167,
        0x8FC7: 0x75C7,
        0x8FC8: 0x7701,
        0x8FC9: 0x785D,
        0x8FCA: 0x7901,
        0x8FCB: 0x7965,
        0x8FCC: 0x79F0,
        0x8FCD: 0x7AE0,
        0x8FCE: 0x7B11,
        0x8FCF: 0x7CA7,
        0x8FD0: 0x7D39,
        0x8FD1: 0x8096,
        0x8FD2: 0x83D6,
        0x8FD3: 0x848B,
        0x8FD4: 0x8549,
        0x8FD5: 0x885D,
        0x8FD6: 0x88F3,
        0x8FD7: 0x8A1F,
        0x8FD8: 0x8A3C,
        0x8FD9: 0x8A54,
        0x8FDA: 0x8A73,
        0x8FDB: 0x8C61,
        0x8FDC: 0x8CDE,
        0x8FDD: 0x91A4,
        0x8FDE: 0x9266,
        0x8FDF: 0x937E,
        0x8FE0: 0x9418,
        0x8FE1: 0x969C,
        0x8FE2: 0x9798,
        0x8FE3: 0x4E0A,
        0x8FE4: 0x4E08,
        0x8FE5: 0x4E1E,
        0x8FE6: 0x4E57,
        0x8FE7: 0x5197,
        0x8FE8: 0x5270,
        0x8FE9: 0x57CE,
        0x8FEA: 0x5834,
        0x8FEB: 0x58CC,
        0x8FEC: 0x5B22,
        0x8FED: 0x5E38,
        0x8FEE: 0x60C5,
        0x8FEF: 0x64FE,
        0x8FF0: 0x6761,
        0x8FF1: 0x6756,
        0x8FF2: 0x6D44,
        0x8FF3: 0x72B6,
        0x8FF4: 0x7573,
        0x8FF5: 0x7A63,
        0x8FF6: 0x84B8,
        0x8FF7: 0x8B72,
        0x8FF8: 0x91B8,
        0x8FF9: 0x9320,
        0x8FFA: 0x5631,
        0x8FFB: 0x57F4,
        0x8FFC: 0x98FE,
        0x9040: 0x62ED,
        0x9041: 0x690D,
        0x9042: 0x6B96,
        0x9043: 0x71ED,
        0x9044: 0x7E54,
        0x9045: 0x8077,
        0x9046: 0x8272,
        0x9047: 0x89E6,
        0x9048: 0x98DF,
        0x9049: 0x8755,
        0x904A: 0x8FB1,
        0x904B: 0x5C3B,
        0x904C: 0x4F38,
        0x904D: 0x4FE1,
        0x904E: 0x4FB5,
        0x904F: 0x5507,
        0x9050: 0x5A20,
        0x9051: 0x5BDD,
        0x9052: 0x5BE9,
        0x9053: 0x5FC3,
        0x9054: 0x614E,
        0x9055: 0x632F,
        0x9056: 0x65B0,
        0x9057: 0x664B,
        0x9058: 0x68EE,
        0x9059: 0x699B,
        0x905A: 0x6D78,
        0x905B: 0x6DF1,
        0x905C: 0x7533,
        0x905D: 0x75B9,
        0x905E: 0x771F,
        0x905F: 0x795E,
        0x9060: 0x79E6,
        0x9061: 0x7D33,
        0x9062: 0x81E3,
        0x9063: 0x82AF,
        0x9064: 0x85AA,
        0x9065: 0x89AA,
        0x9066: 0x8A3A,
        0x9067: 0x8EAB,
        0x9068: 0x8F9B,
        0x9069: 0x9032,
        0x906A: 0x91DD,
        0x906B: 0x9707,
        0x906C: 0x4EBA,
        0x906D: 0x4EC1,
        0x906E: 0x5203,
        0x906F: 0x5875,
        0x9070: 0x58EC,
        0x9071: 0x5C0B,
        0x9072: 0x751A,
        0x9073: 0x5C3D,
        0x9074: 0x814E,
        0x9075: 0x8A0A,
        0x9076: 0x8FC5,
        0x9077: 0x9663,
        0x9078: 0x976D,
        0x9079: 0x7B25,
        0x907A: 0x8ACF,
        0x907B: 0x9808,
        0x907C: 0x9162,
        0x907D: 0x56F3,
        0x907E: 0x53A8,
        0x9080: 0x9017,
        0x9081: 0x5439,
        0x9082: 0x5782,
        0x9083: 0x5E25,
        0x9084: 0x63A8,
        0x9085: 0x6C34,
        0x9086: 0x708A,
        0x9087: 0x7761,
        0x9088: 0x7C8B,
        0x9089: 0x7FE0,
        0x908A: 0x8870,
        0x908B: 0x9042,
        0x908C: 0x9154,
        0x908D: 0x9310,
        0x908E: 0x9318,
        0x908F: 0x968F,
        0x9090: 0x745E,
        0x9091: 0x9AC4,
        0x9092: 0x5D07,
        0x9093: 0x5D69,
        0x9094: 0x6570,
        0x9095: 0x67A2,
        0x9096: 0x8DA8,
        0x9097: 0x96DB,
        0x9098: 0x636E,
        0x9099: 0x6749,
        0x909A: 0x6919,
        0x909B: 0x83C5,
        0x909C: 0x9817,
        0x909D: 0x96C0,
        0x909E: 0x88FE,
        0x909F: 0x6F84,
        0x90A0: 0x647A,
        0x90A1: 0x5BF8,
        0x90A2: 0x4E16,
        0x90A3: 0x702C,
        0x90A4: 0x755D,
        0x90A5: 0x662F,
        0x90A6: 0x51C4,
        0x90A7: 0x5236,
        0x90A8: 0x52E2,
        0x90A9: 0x59D3,
        0x90AA: 0x5F81,
        0x90AB: 0x6027,
        0x90AC: 0x6210,
        0x90AD: 0x653F,
        0x90AE: 0x6574,
        0x90AF: 0x661F,
        0x90B0: 0x6674,
        0x90B1: 0x68F2,
        0x90B2: 0x6816,
        0x90B3: 0x6B63,
        0x90B4: 0x6E05,
        0x90B5: 0x7272,
        0x90B6: 0x751F,
        0x90B7: 0x76DB,
        0x90B8: 0x7CBE,
        0x90B9: 0x8056,
        0x90BA: 0x58F0,
        0x90BB: 0x88FD,
        0x90BC: 0x897F,
        0x90BD: 0x8AA0,
        0x90BE: 0x8A93,
        0x90BF: 0x8ACB,
        0x90C0: 0x901D,
        0x90C1: 0x9192,
        0x90C2: 0x9752,
        0x90C3: 0x9759,
        0x90C4: 0x6589,
        0x90C5: 0x7A0E,
        0x90C6: 0x8106,
        0x90C7: 0x96BB,
        0x90C8: 0x5E2D,
        0x90C9: 0x60DC,
        0x90CA: 0x621A,
        0x90CB: 0x65A5,
        0x90CC: 0x6614,
        0x90CD: 0x6790,
        0x90CE: 0x77F3,
        0x90CF: 0x7A4D,
        0x90D0: 0x7C4D,
        0x90D1: 0x7E3E,
        0x90D2: 0x810A,
        0x90D3: 0x8CAC,
        0x90D4: 0x8D64,
        0x90D5: 0x8DE1,
        0x90D6: 0x8E5F,
        0x90D7: 0x78A9,
        0x90D8: 0x5207,
        0x90D9: 0x62D9,
        0x90DA: 0x63A5,
        0x90DB: 0x6442,
        0x90DC: 0x6298,
        0x90DD: 0x8A2D,
        0x90DE: 0x7A83,
        0x90DF: 0x7BC0,
        0x90E0: 0x8AAC,
        0x90E1: 0x96EA,
        0x90E2: 0x7D76,
        0x90E3: 0x820C,
        0x90E4: 0x8749,
        0x90E5: 0x4ED9,
        0x90E6: 0x5148,
        0x90E7: 0x5343,
        0x90E8: 0x5360,
        0x90E9: 0x5BA3,
        0x90EA: 0x5C02,
        0x90EB: 0x5C16,
        0x90EC: 0x5DDD,
        0x90ED: 0x6226,
        0x90EE: 0x6247,
        0x90EF: 0x64B0,
        0x90F0: 0x6813,
        0x90F1: 0x6834,
        0x90F2: 0x6CC9,
        0x90F3: 0x6D45,
        0x90F4: 0x6D17,
        0x90F5: 0x67D3,
        0x90F6: 0x6F5C,
        0x90F7: 0x714E,
        0x90F8: 0x717D,
        0x90F9: 0x65CB,
        0x90FA: 0x7A7F,
        0x90FB: 0x7BAD,
        0x90FC: 0x7DDA,
        0x9140: 0x7E4A,
        0x9141: 0x7FA8,
        0x9142: 0x817A,
        0x9143: 0x821B,
        0x9144: 0x8239,
        0x9145: 0x85A6,
        0x9146: 0x8A6E,
        0x9147: 0x8CCE,
        0x9148: 0x8DF5,
        0x9149: 0x9078,
        0x914A: 0x9077,
        0x914B: 0x92AD,
        0x914C: 0x9291,
        0x914D: 0x9583,
        0x914E: 0x9BAE,
        0x914F: 0x524D,
        0x9150: 0x5584,
        0x9151: 0x6F38,
        0x9152: 0x7136,
        0x9153: 0x5168,
        0x9154: 0x7985,
        0x9155: 0x7E55,
        0x9156: 0x81B3,
        0x9157: 0x7CCE,
        0x9158: 0x564C,
        0x9159: 0x5851,
        0x915A: 0x5CA8,
        0x915B: 0x63AA,
        0x915C: 0x66FE,
        0x915D: 0x66FD,
        0x915E: 0x695A,
        0x915F: 0x72D9,
        0x9160: 0x758F,
        0x9161: 0x758E,
        0x9162: 0x790E,
        0x9163: 0x7956,
        0x9164: 0x79DF,
        0x9165: 0x7C97,
        0x9166: 0x7D20,
        0x9167: 0x7D44,
        0x9168: 0x8607,
        0x9169: 0x8A34,
        0x916A: 0x963B,
        0x916B: 0x9061,
        0x916C: 0x9F20,
        0x916D: 0x50E7,
        0x916E: 0x5275,
        0x916F: 0x53CC,
        0x9170: 0x53E2,
        0x9171: 0x5009,
        0x9172: 0x55AA,
        0x9173: 0x58EE,
        0x9174: 0x594F,
        0x9175: 0x723D,
        0x9176: 0x5B8B,
        0x9177: 0x5C64,
        0x9178: 0x531D,
        0x9179: 0x60E3,
        0x917A: 0x60F3,
        0x917B: 0x635C,
        0x917C: 0x6383,
        0x917D: 0x633F,
        0x917E: 0x63BB,
        0x9180: 0x64CD,
        0x9181: 0x65E9,
        0x9182: 0x66F9,
        0x9183: 0x5DE3,
        0x9184: 0x69CD,
        0x9185: 0x69FD,
        0x9186: 0x6F15,
        0x9187: 0x71E5,
        0x9188: 0x4E89,
        0x9189: 0x75E9,
        0x918A: 0x76F8,
        0x918B: 0x7A93,
        0x918C: 0x7CDF,
        0x918D: 0x7DCF,
        0x918E: 0x7D9C,
        0x918F: 0x8061,
        0x9190: 0x8349,
        0x9191: 0x8358,
        0x9192: 0x846C,
        0x9193: 0x84BC,
        0x9194: 0x85FB,
        0x9195: 0x88C5,
        0x9196: 0x8D70,
        0x9197: 0x9001,
        0x9198: 0x906D,
        0x9199: 0x9397,
        0x919A: 0x971C,
        0x919B: 0x9A12,
        0x919C: 0x50CF,
        0x919D: 0x5897,
        0x919E: 0x618E,
        0x919F: 0x81D3,
        0x91A0: 0x8535,
        0x91A1: 0x8D08,
        0x91A2: 0x9020,
        0x91A3: 0x4FC3,
        0x91A4: 0x5074,
        0x91A5: 0x5247,
        0x91A6: 0x5373,
        0x91A7: 0x606F,
        0x91A8: 0x6349,
        0x91A9: 0x675F,
        0x91AA: 0x6E2C,
        0x91AB: 0x8DB3,
        0x91AC: 0x901F,
        0x91AD: 0x4FD7,
        0x91AE: 0x5C5E,
        0x91AF: 0x8CCA,
        0x91B0: 0x65CF,
        0x91B1: 0x7D9A,
        0x91B2: 0x5352,
        0x91B3: 0x8896,
        0x91B4: 0x5176,
        0x91B5: 0x63C3,
        0x91B6: 0x5B58,
        0x91B7: 0x5B6B,
        0x91B8: 0x5C0A,
        0x91B9: 0x640D,
        0x91BA: 0x6751,
        0x91BB: 0x905C,
        0x91BC: 0x4ED6,
        0x91BD: 0x591A,
        0x91BE: 0x592A,
        0x91BF: 0x6C70,
        0x91C0: 0x8A51,
        0x91C1: 0x553E,
        0x91C2: 0x5815,
        0x91C3: 0x59A5,
        0x91C4: 0x60F0,
        0x91C5: 0x6253,
        0x91C6: 0x67C1,
        0x91C7: 0x8235,
        0x91C8: 0x6955,
        0x91C9: 0x9640,
        0x91CA: 0x99C4,
        0x91CB: 0x9A28,
        0x91CC: 0x4F53,
        0x91CD: 0x5806,
        0x91CE: 0x5BFE,
        0x91CF: 0x8010,
        0x91D0: 0x5CB1,
        0x91D1: 0x5E2F,
        0x91D2: 0x5F85,
        0x91D3: 0x6020,
        0x91D4: 0x614B,
        0x91D5: 0x6234,
        0x91D6: 0x66FF,
        0x91D7: 0x6CF0,
        0x91D8: 0x6EDE,
        0x91D9: 0x80CE,
        0x91DA: 0x817F,
        0x91DB: 0x82D4,
        0x91DC: 0x888B,
        0x91DD: 0x8CB8,
        0x91DE: 0x9000,
        0x91DF: 0x902E,
        0x91E0: 0x968A,
        0x91E1: 0x9EDB,
        0x91E2: 0x9BDB,
        0x91E3: 0x4EE3,
        0x91E4: 0x53F0,
        0x91E5: 0x5927,
        0x91E6: 0x7B2C,
        0x91E7: 0x918D,
        0x91E8: 0x984C,
        0x91E9: 0x9DF9,
        0x91EA: 0x6EDD,
        0x91EB: 0x7027,
        0x91EC: 0x5353,
        0x91ED: 0x5544,
        0x91EE: 0x5B85,
        0x91EF: 0x6258,
        0x91F0: 0x629E,
        0x91F1: 0x62D3,
        0x91F2: 0x6CA2,
        0x91F3: 0x6FEF,
        0x91F4: 0x7422,
        0x91F5: 0x8A17,
        0x91F6: 0x9438,
        0x91F7: 0x6FC1,
        0x91F8: 0x8AFE,
        0x91F9: 0x8338,
        0x91FA: 0x51E7,
        0x91FB: 0x86F8,
        0x91FC: 0x53EA,
        0x9240: 0x53E9,
        0x9241: 0x4F46,
        0x9242: 0x9054,
        0x9243: 0x8FB0,
        0x9244: 0x596A,
        0x9245: 0x8131,
        0x9246: 0x5DFD,
        0x9247: 0x7AEA,
        0x9248: 0x8FBF,
        0x9249: 0x68DA,
        0x924A: 0x8C37,
        0x924B: 0x72F8,
        0x924C: 0x9C48,
        0x924D: 0x6A3D,
        0x924E: 0x8AB0,
        0x924F: 0x4E39,
        0x9250: 0x5358,
        0x9251: 0x5606,
        0x9252: 0x5766,
        0x9253: 0x62C5,
        0x9254: 0x63A2,
        0x9255: 0x65E6,
        0x9256: 0x6B4E,
        0x9257: 0x6DE1,
        0x9258: 0x6E5B,
        0x9259: 0x70AD,
        0x925A: 0x77ED,
        0x925B: 0x7AEF,
        0x925C: 0x7BAA,
        0x925D: 0x7DBB,
        0x925E: 0x803D,
        0x925F: 0x80C6,
        0x9260: 0x86CB,
        0x9261: 0x8A95,
        0x9262: 0x935B,
        0x9263: 0x56E3,
        0x9264: 0x58C7,
        0x9265: 0x5F3E,
        0x9266: 0x65AD,
        0x9267: 0x6696,
        0x9268: 0x6A80,
        0x9269: 0x6BB5,
        0x926A: 0x7537,
        0x926B: 0x8AC7,
        0x926C: 0x5024,
        0x926D: 0x77E5,
        0x926E: 0x5730,
        0x926F: 0x5F1B,
        0x9270: 0x6065,
        0x9271: 0x667A,
        0x9272: 0x6C60,
        0x9273: 0x75F4,
        0x9274: 0x7A1A,
        0x9275: 0x7F6E,
        0x9276: 0x81F4,
        0x9277: 0x8718,
        0x9278: 0x9045,
        0x9279: 0x99B3,
        0x927A: 0x7BC9,
        0x927B: 0x755C,
        0x927C: 0x7AF9,
        0x927D: 0x7B51,
        0x927E: 0x84C4,
        0x9280: 0x9010,
        0x9281: 0x79E9,
        0x9282: 0x7A92,
        0x9283: 0x8336,
        0x9284: 0x5AE1,
        0x9285: 0x7740,
        0x9286: 0x4E2D,
        0x9287: 0x4EF2,
        0x9288: 0x5B99,
        0x9289: 0x5FE0,
        0x928A: 0x62BD,
        0x928B: 0x663C,
        0x928C: 0x67F1,
        0x928D: 0x6CE8,
        0x928E: 0x866B,
        0x928F: 0x8877,
        0x9290: 0x8A3B,
        0x9291: 0x914E,
        0x9292: 0x92F3,
        0x9293: 0x99D0,
        0x9294: 0x6A17,
        0x9295: 0x7026,
        0x9296: 0x732A,
        0x9297: 0x82E7,
        0x9298: 0x8457,
        0x9299: 0x8CAF,
        0x929A: 0x4E01,
        0x929B: 0x5146,
        0x929C: 0x51CB,
        0x929D: 0x558B,
        0x929E: 0x5BF5,
        0x929F: 0x5E16,
        0x92A0: 0x5E33,
        0x92A1: 0x5E81,
        0x92A2: 0x5F14,
        0x92A3: 0x5F35,
        0x92A4: 0x5F6B,
        0x92A5: 0x5FB4,
        0x92A6: 0x61F2,
        0x92A7: 0x6311,
        0x92A8: 0x66A2,
        0x92A9: 0x671D,
        0x92AA: 0x6F6E,
        0x92AB: 0x7252,
        0x92AC: 0x753A,
        0x92AD: 0x773A,
        0x92AE: 0x8074,
        0x92AF: 0x8139,
        0x92B0: 0x8178,
        0x92B1: 0x8776,
        0x92B2: 0x8ABF,
        0x92B3: 0x8ADC,
        0x92B4: 0x8D85,
        0x92B5: 0x8DF3,
        0x92B6: 0x929A,
        0x92B7: 0x9577,
        0x92B8: 0x9802,
        0x92B9: 0x9CE5,
        0x92BA: 0x52C5,
        0x92BB: 0x6357,
        0x92BC: 0x76F4,
        0x92BD: 0x6715,
        0x92BE: 0x6C88,
        0x92BF: 0x73CD,
        0x92C0: 0x8CC3,
        0x92C1: 0x93AE,
        0x92C2: 0x9673,
        0x92C3: 0x6D25,
        0x92C4: 0x589C,
        0x92C5: 0x690E,
        0x92C6: 0x69CC,
        0x92C7: 0x8FFD,
        0x92C8: 0x939A,
        0x92C9: 0x75DB,
        0x92CA: 0x901A,
        0x92CB: 0x585A,
        0x92CC: 0x6802,
        0x92CD: 0x63B4,
        0x92CE: 0x69FB,
        0x92CF: 0x4F43,
        0x92D0: 0x6F2C,
        0x92D1: 0x67D8,
        0x92D2: 0x8FBB,
        0x92D3: 0x8526,
        0x92D4: 0x7DB4,
        0x92D5: 0x9354,
        0x92D6: 0x693F,
        0x92D7: 0x6F70,
        0x92D8: 0x576A,
        0x92D9: 0x58F7,
        0x92DA: 0x5B2C,
        0x92DB: 0x7D2C,
        0x92DC: 0x722A,
        0x92DD: 0x540A,
        0x92DE: 0x91E3,
        0x92DF: 0x9DB4,
        0x92E0: 0x4EAD,
        0x92E1: 0x4F4E,
        0x92E2: 0x505C,
        0x92E3: 0x5075,
        0x92E4: 0x5243,
        0x92E5: 0x8C9E,
        0x92E6: 0x5448,
        0x92E7: 0x5824,
        0x92E8: 0x5B9A,
        0x92E9: 0x5E1D,
        0x92EA: 0x5E95,
        0x92EB: 0x5EAD,
        0x92EC: 0x5EF7,
        0x92ED: 0x5F1F,
        0x92EE: 0x608C,
        0x92EF: 0x62B5,
        0x92F0: 0x633A,
        0x92F1: 0x63D0,
        0x92F2: 0x68AF,
        0x92F3: 0x6C40,
        0x92F4: 0x7887,
        0x92F5: 0x798E,
        0x92F6: 0x7A0B,
        0x92F7: 0x7DE0,
        0x92F8: 0x8247,
        0x92F9: 0x8A02,
        0x92FA: 0x8AE6,
        0x92FB: 0x8E44,
        0x92FC: 0x9013,
        0x9340: 0x90B8,
        0x9341: 0x912D,
        0x9342: 0x91D8,
        0x9343: 0x9F0E,
        0x9344: 0x6CE5,
        0x9345: 0x6458,
        0x9346: 0x64E2,
        0x9347: 0x6575,
        0x9348: 0x6EF4,
        0x9349: 0x7684,
        0x934A: 0x7B1B,
        0x934B: 0x9069,
        0x934C: 0x93D1,
        0x934D: 0x6EBA,
        0x934E: 0x54F2,
        0x934F: 0x5FB9,
        0x9350: 0x64A4,
        0x9351: 0x8F4D,
        0x9352: 0x8FED,
        0x9353: 0x9244,
        0x9354: 0x5178,
        0x9355: 0x586B,
        0x9356: 0x5929,
        0x9357: 0x5C55,
        0x9358: 0x5E97,
        0x9359: 0x6DFB,
        0x935A: 0x7E8F,
        0x935B: 0x751C,
        0x935C: 0x8CBC,
        0x935D: 0x8EE2,
        0x935E: 0x985B,
        0x935F: 0x70B9,
        0x9360: 0x4F1D,
        0x9361: 0x6BBF,
        0x9362: 0x6FB1,
        0x9363: 0x7530,
        0x9364: 0x96FB,
        0x9365: 0x514E,
        0x9366: 0x5410,
        0x9367: 0x5835,
        0x9368: 0x5857,
        0x9369: 0x59AC,
        0x936A: 0x5C60,
        0x936B: 0x5F92,
        0x936C: 0x6597,
        0x936D: 0x675C,
        0x936E: 0x6E21,
        0x936F: 0x767B,
        0x9370: 0x83DF,
        0x9371: 0x8CED,
        0x9372: 0x9014,
        0x9373: 0x90FD,
        0x9374: 0x934D,
        0x9375: 0x7825,
        0x9376: 0x783A,
        0x9377: 0x52AA,
        0x9378: 0x5EA6,
        0x9379: 0x571F,
        0x937A: 0x5974,
        0x937B: 0x6012,
        0x937C: 0x5012,
        0x937D: 0x515A,
        0x937E: 0x51AC,
        0x9380: 0x51CD,
        0x9381: 0x5200,
        0x9382: 0x5510,
        0x9383: 0x5854,
        0x9384: 0x5858,
        0x9385: 0x5957,
        0x9386: 0x5B95,
        0x9387: 0x5CF6,
        0x9388: 0x5D8B,
        0x9389: 0x60BC,
        0x938A: 0x6295,
        0x938B: 0x642D,
        0x938C: 0x6771,
        0x938D: 0x6843,
        0x938E: 0x68BC,
        0x938F: 0x68DF,
        0x9390: 0x76D7,
        0x9391: 0x6DD8,
        0x9392: 0x6E6F,
        0x9393: 0x6D9B,
        0x9394: 0x706F,
        0x9395: 0x71C8,
        0x9396: 0x5F53,
        0x9397: 0x75D8,
        0x9398: 0x7977,
        0x9399: 0x7B49,
        0x939A: 0x7B54,
        0x939B: 0x7B52,
        0x939C: 0x7CD6,
        0x939D: 0x7D71,
        0x939E: 0x5230,
        0x939F: 0x8463,
        0x93A0: 0x8569,
        0x93A1: 0x85E4,
        0x93A2: 0x8A0E,
        0x93A3: 0x8B04,
        0x93A4: 0x8C46,
        0x93A5: 0x8E0F,
        0x93A6: 0x9003,
        0x93A7: 0x900F,
        0x93A8: 0x9419,
        0x93A9: 0x9676,
        0x93AA: 0x982D,
        0x93AB: 0x9A30,
        0x93AC: 0x95D8,
        0x93AD: 0x50CD,
        0x93AE: 0x52D5,
        0x93AF: 0x540C,
        0x93B0: 0x5802,
        0x93B1: 0x5C0E,
        0x93B2: 0x61A7,
        0x93B3: 0x649E,
        0x93B4: 0x6D1E,
        0x93B5: 0x77B3,
        0x93B6: 0x7AE5,
        0x93B7: 0x80F4,
        0x93B8: 0x8404,
        0x93B9: 0x9053,
        0x93BA: 0x9285,
        0x93BB: 0x5CE0,
        0x93BC: 0x9D07,
        0x93BD: 0x533F,
        0x93BE: 0x5F97,
        0x93BF: 0x5FB3,
        0x93C0: 0x6D9C,
        0x93C1: 0x7279,
        0x93C2: 0x7763,
        0x93C3: 0x79BF,
        0x93C4: 0x7BE4,
        0x93C5: 0x6BD2,
        0x93C6: 0x72EC,
        0x93C7: 0x8AAD,
        0x93C8: 0x6803,
        0x93C9: 0x6A61,
        0x93CA: 0x51F8,
        0x93CB: 0x7A81,
        0x93CC: 0x6934,
        0x93CD: 0x5C4A,
        0x93CE: 0x9CF6,
        0x93CF: 0x82EB,
        0x93D0: 0x5BC5,
        0x93D1: 0x9149,
        0x93D2: 0x701E,
        0x93D3: 0x5678,
        0x93D4: 0x5C6F,
        0x93D5: 0x60C7,
        0x93D6: 0x6566,
        0x93D7: 0x6C8C,
        0x93D8: 0x8C5A,
        0x93D9: 0x9041,
        0x93DA: 0x9813,
        0x93DB: 0x5451,
        0x93DC: 0x66C7,
        0x93DD: 0x920D,
        0x93DE: 0x5948,
        0x93DF: 0x90A3,
        0x93E0: 0x5185,
        0x93E1: 0x4E4D,
        0x93E2: 0x51EA,
        0x93E3: 0x8599,
        0x93E4: 0x8B0E,
        0x93E5: 0x7058,
        0x93E6: 0x637A,
        0x93E7: 0x934B,
        0x93E8: 0x6962,
        0x93E9: 0x99B4,
        0x93EA: 0x7E04,
        0x93EB: 0x7577,
        0x93EC: 0x5357,
        0x93ED: 0x6960,
        0x93EE: 0x8EDF,
        0x93EF: 0x96E3,
        0x93F0: 0x6C5D,
        0x93F1: 0x4E8C,
        0x93F2: 0x5C3C,
        0x93F3: 0x5F10,
        0x93F4: 0x8FE9,
        0x93F5: 0x5302,
        0x93F6: 0x8CD1,
        0x93F7: 0x8089,
        0x93F8: 0x8679,
        0x93F9: 0x5EFF,
        0x93FA: 0x65E5,
        0x93FB: 0x4E73,
        0x93FC: 0x5165,
        0x9440: 0x5982,
        0x9441: 0x5C3F,
        0x9442: 0x97EE,
        0x9443: 0x4EFB,
        0x9444: 0x598A,
        0x9445: 0x5FCD,
        0x9446: 0x8A8D,
        0x9447: 0x6FE1,
        0x9448: 0x79B0,
        0x9449: 0x7962,
        0x944A: 0x5BE7,
        0x944B: 0x8471,
        0x944C: 0x732B,
        0x944D: 0x71B1,
        0x944E: 0x5E74,
        0x944F: 0x5FF5,
        0x9450: 0x637B,
        0x9451: 0x649A,
        0x9452: 0x71C3,
        0x9453: 0x7C98,
        0x9454: 0x4E43,
        0x9455: 0x5EFC,
        0x9456: 0x4E4B,
        0x9457: 0x57DC,
        0x9458: 0x56A2,
        0x9459: 0x60A9,
        0x945A: 0x6FC3,
        0x945B: 0x7D0D,
        0x945C: 0x80FD,
        0x945D: 0x8133,
        0x945E: 0x81BF,
        0x945F: 0x8FB2,
        0x9460: 0x8997,
        0x9461: 0x86A4,
        0x9462: 0x5DF4,
        0x9463: 0x628A,
        0x9464: 0x64AD,
        0x9465: 0x8987,
        0x9466: 0x6777,
        0x9467: 0x6CE2,
        0x9468: 0x6D3E,
        0x9469: 0x7436,
        0x946A: 0x7834,
        0x946B: 0x5A46,
        0x946C: 0x7F75,
        0x946D: 0x82AD,
        0x946E: 0x99AC,
        0x946F: 0x4FF3,
        0x9470: 0x5EC3,
        0x9471: 0x62DD,
        0x9472: 0x6392,
        0x9473: 0x6557,
        0x9474: 0x676F,
        0x9475: 0x76C3,
        0x9476: 0x724C,
        0x9477: 0x80CC,
        0x9478: 0x80BA,
        0x9479: 0x8F29,
        0x947A: 0x914D,
        0x947B: 0x500D,
        0x947C: 0x57F9,
        0x947D: 0x5A92,
        0x947E: 0x6885,
        0x9480: 0x6973,
        0x9481: 0x7164,
        0x9482: 0x72FD,
        0x9483: 0x8CB7,
        0x9484: 0x58F2,
        0x9485: 0x8CE0,
        0x9486: 0x966A,
        0x9487: 0x9019,
        0x9488: 0x877F,
        0x9489: 0x79E4,
        0x948A: 0x77E7,
        0x948B: 0x8429,
        0x948C: 0x4F2F,
        0x948D: 0x5265,
        0x948E: 0x535A,
        0x948F: 0x62CD,
        0x9490: 0x67CF,
        0x9491: 0x6CCA,
        0x9492: 0x767D,
        0x9493: 0x7B94,
        0x9494: 0x7C95,
        0x9495: 0x8236,
        0x9496: 0x8584,
        0x9497: 0x8FEB,
        0x9498: 0x66DD,
        0x9499: 0x6F20,
        0x949A: 0x7206,
        0x949B: 0x7E1B,
        0x949C: 0x83AB,
        0x949D: 0x99C1,
        0x949E: 0x9EA6,
        0x949F: 0x51FD,
        0x94A0: 0x7BB1,
        0x94A1: 0x7872,
        0x94A2: 0x7BB8,
        0x94A3: 0x8087,
        0x94A4: 0x7B48,
        0x94A5: 0x6AE8,
        0x94A6: 0x5E61,
        0x94A7: 0x808C,
        0x94A8: 0x7551,
        0x94A9: 0x7560,
        0x94AA: 0x516B,
        0x94AB: 0x9262,
        0x94AC: 0x6E8C,
        0x94AD: 0x767A,
        0x94AE: 0x9197,
        0x94AF: 0x9AEA,
        0x94B0: 0x4F10,
        0x94B1: 0x7F70,
        0x94B2: 0x629C,
        0x94B3: 0x7B4F,
        0x94B4: 0x95A5,
        0x94B5: 0x9CE9,
        0x94B6: 0x567A,
        0x94B7: 0x5859,
        0x94B8: 0x86E4,
        0x94B9: 0x96BC,
        0x94BA: 0x4F34,
        0x94BB: 0x5224,
        0x94BC: 0x534A,
        0x94BD: 0x53CD,
        0x94BE: 0x53DB,
        0x94BF: 0x5E06,
        0x94C0: 0x642C,
        0x94C1: 0x6591,
        0x94C2: 0x677F,
        0x94C3: 0x6C3E,
        0x94C4: 0x6C4E,
        0x94C5: 0x7248,
        0x94C6: 0x72AF,
        0x94C7: 0x73ED,
        0x94C8: 0x7554,
        0x94C9: 0x7E41,
        0x94CA: 0x822C,
        0x94CB: 0x85E9,
        0x94CC: 0x8CA9,
        0x94CD: 0x7BC4,
        0x94CE: 0x91C6,
        0x94CF: 0x7169,
        0x94D0: 0x9812,
        0x94D1: 0x98EF,
        0x94D2: 0x633D,
        0x94D3: 0x6669,
        0x94D4: 0x756A,
        0x94D5: 0x76E4,
        0x94D6: 0x78D0,
        0x94D7: 0x8543,
        0x94D8: 0x86EE,
        0x94D9: 0x532A,
        0x94DA: 0x5351,
        0x94DB: 0x5426,
        0x94DC: 0x5983,
        0x94DD: 0x5E87,
        0x94DE: 0x5F7C,
        0x94DF: 0x60B2,
        0x94E0: 0x6249,
        0x94E1: 0x6279,
        0x94E2: 0x62AB,
        0x94E3: 0x6590,
        0x94E4: 0x6BD4,
        0x94E5: 0x6CCC,
        0x94E6: 0x75B2,
        0x94E7: 0x76AE,
        0x94E8: 0x7891,
        0x94E9: 0x79D8,
        0x94EA: 0x7DCB,
        0x94EB: 0x7F77,
        0x94EC: 0x80A5,
        0x94ED: 0x88AB,
        0x94EE: 0x8AB9,
        0x94EF: 0x8CBB,
        0x94F0: 0x907F,
        0x94F1: 0x975E,
        0x94F2: 0x98DB,
        0x94F3: 0x6A0B,
        0x94F4: 0x7C38,
        0x94F5: 0x5099,
        0x94F6: 0x5C3E,
        0x94F7: 0x5FAE,
        0x94F8: 0x6787,
        0x94F9: 0x6BD8,
        0x94FA: 0x7435,
        0x94FB: 0x7709,
        0x94FC: 0x7F8E,
        0x9540: 0x9F3B,
        0x9541: 0x67CA,
        0x9542: 0x7A17,
        0x9543: 0x5339,
        0x9544: 0x758B,
        0x9545: 0x9AED,
        0x9546: 0x5F66,
        0x9547: 0x819D,
        0x9548: 0x83F1,
        0x9549: 0x8098,
        0x954A: 0x5F3C,
        0x954B: 0x5FC5,
        0x954C: 0x7562,
        0x954D: 0x7B46,
        0x954E: 0x903C,
        0x954F: 0x6867,
        0x9550: 0x59EB,
        0x9551: 0x5A9B,
        0x9552: 0x7D10,
        0x9553: 0x767E,
        0x9554: 0x8B2C,
        0x9555: 0x4FF5,
        0x9556: 0x5F6A,
        0x9557: 0x6A19,
        0x9558: 0x6C37,
        0x9559: 0x6F02,
        0x955A: 0x74E2,
        0x955B: 0x7968,
        0x955C: 0x8868,
        0x955D: 0x8A55,
        0x955E: 0x8C79,
        0x955F: 0x5EDF,
        0x9560: 0x63CF,
        0x9561: 0x75C5,
        0x9562: 0x79D2,
        0x9563: 0x82D7,
        0x9564: 0x9328,
        0x9565: 0x92F2,
        0x9566: 0x849C,
        0x9567: 0x86ED,
        0x9568: 0x9C2D,
        0x9569: 0x54C1,
        0x956A: 0x5F6C,
        0x956B: 0x658C,
        0x956C: 0x6D5C,
        0x956D: 0x7015,
        0x956E: 0x8CA7,
        0x956F: 0x8CD3,
        0x9570: 0x983B,
        0x9571: 0x654F,
        0x9572: 0x74F6,
        0x9573: 0x4E0D,
        0x9574: 0x4ED8,
        0x9575: 0x57E0,
        0x9576: 0x592B,
        0x9577: 0x5A66,
        0x9578: 0x5BCC,
        0x9579: 0x51A8,
        0x957A: 0x5E03,
        0x957B: 0x5E9C,
        0x957C: 0x6016,
        0x957D: 0x6276,
        0x957E: 0x6577,
        0x9580: 0x65A7,
        0x9581: 0x666E,
        0x9582: 0x6D6E,
        0x9583: 0x7236,
        0x9584: 0x7B26,
        0x9585: 0x8150,
        0x9586: 0x819A,
        0x9587: 0x8299,
        0x9588: 0x8B5C,
        0x9589: 0x8CA0,
        0x958A: 0x8CE6,
        0x958B: 0x8D74,
        0x958C: 0x961C,
        0x958D: 0x9644,
        0x958E: 0x4FAE,
        0x958F: 0x64AB,
        0x9590: 0x6B66,
        0x9591: 0x821E,
        0x9592: 0x8461,
        0x9593: 0x856A,
        0x9594: 0x90E8,
        0x9595: 0x5C01,
        0x9596: 0x6953,
        0x9597: 0x98A8,
        0x9598: 0x847A,
        0x9599: 0x8557,
        0x959A: 0x4F0F,
        0x959B: 0x526F,
        0x959C: 0x5FA9,
        0x959D: 0x5E45,
        0x959E: 0x670D,
        0x959F: 0x798F,
        0x95A0: 0x8179,
        0x95A1: 0x8907,
        0x95A2: 0x8986,
        0x95A3: 0x6DF5,
        0x95A4: 0x5F17,
        0x95A5: 0x6255,
        0x95A6: 0x6CB8,
        0x95A7: 0x4ECF,
        0x95A8: 0x7269,
        0x95A9: 0x9B92,
        0x95AA: 0x5206,
        0x95AB: 0x543B,
        0x95AC: 0x5674,
        0x95AD: 0x58B3,
        0x95AE: 0x61A4,
        0x95AF: 0x626E,
        0x95B0: 0x711A,
        0x95B1: 0x596E,
        0x95B2: 0x7C89,
        0x95B3: 0x7CDE,
        0x95B4: 0x7D1B,
        0x95B5: 0x96F0,
        0x95B6: 0x6587,
        0x95B7: 0x805E,
        0x95B8: 0x4E19,
        0x95B9: 0x4F75,
        0x95BA: 0x5175,
        0x95BB: 0x5840,
        0x95BC: 0x5E63,
        0x95BD: 0x5E73,
        0x95BE: 0x5F0A,
        0x95BF: 0x67C4,
        0x95C0: 0x4E26,
        0x95C1: 0x853D,
        0x95C2: 0x9589,
        0x95C3: 0x965B,
        0x95C4: 0x7C73,
        0x95C5: 0x9801,
        0x95C6: 0x50FB,
        0x95C7: 0x58C1,
        0x95C8: 0x7656,
        0x95C9: 0x78A7,
        0x95CA: 0x5225,
        0x95CB: 0x77A5,
        0x95CC: 0x8511,
        0x95CD: 0x7B86,
        0x95CE: 0x504F,
        0x95CF: 0x5909,
        0x95D0: 0x7247,
        0x95D1: 0x7BC7,
        0x95D2: 0x7DE8,
        0x95D3: 0x8FBA,
        0x95D4: 0x8FD4,
        0x95D5: 0x904D,
        0x95D6: 0x4FBF,
        0x95D7: 0x52C9,
        0x95D8: 0x5A29,
        0x95D9: 0x5F01,
        0x95DA: 0x97AD,
        0x95DB: 0x4FDD,
        0x95DC: 0x8217,
        0x95DD: 0x92EA,
        0x95DE: 0x5703,
        0x95DF: 0x6355,
        0x95E0: 0x6B69,
        0x95E1: 0x752B,
        0x95E2: 0x88DC,
        0x95E3: 0x8F14,
        0x95E4: 0x7A42,
        0x95E5: 0x52DF,
        0x95E6: 0x5893,
        0x95E7: 0x6155,
        0x95E8: 0x620A,
        0x95E9: 0x66AE,
        0x95EA: 0x6BCD,
        0x95EB: 0x7C3F,
        0x95EC: 0x83E9,
        0x95ED: 0x5023,
        0x95EE: 0x4FF8,
        0x95EF: 0x5305,
        0x95F0: 0x5446,
        0x95F1: 0x5831,
        0x95F2: 0x5949,
        0x95F3: 0x5B9D,
        0x95F4: 0x5CF0,
        0x95F5: 0x5CEF,
        0x95F6: 0x5D29,
        0x95F7: 0x5E96,
        0x95F8: 0x62B1,
        0x95F9: 0x6367,
        0x95FA: 0x653E,
        0x95FB: 0x65B9,
        0x95FC: 0x670B,
        0x9640: 0x6CD5,
        0x9641: 0x6CE1,
        0x9642: 0x70F9,
        0x9643: 0x7832,
        0x9644: 0x7E2B,
        0x9645: 0x80DE,
        0x9646: 0x82B3,
        0x9647: 0x840C,
        0x9648: 0x84EC,
        0x9649: 0x8702,
        0x964A: 0x8912,
        0x964B: 0x8A2A,
        0x964C: 0x8C4A,
        0x964D: 0x90A6,
        0x964E: 0x92D2,
        0x964F: 0x98FD,
        0x9650: 0x9CF3,
        0x9651: 0x9D6C,
        0x9652: 0x4E4F,
        0x9653: 0x4EA1,
        0x9654: 0x508D,
        0x9655: 0x5256,
        0x9656: 0x574A,
        0x9657: 0x59A8,
        0x9658: 0x5E3D,
        0x9659: 0x5FD8,
        0x965A: 0x5FD9,
        0x965B: 0x623F,
        0x965C: 0x66B4,
        0x965D: 0x671B,
        0x965E: 0x67D0,
        0x965F: 0x68D2,
        0x9660: 0x5192,
        0x9661: 0x7D21,
        0x9662: 0x80AA,
        0x9663: 0x81A8,
        0x9664: 0x8B00,
        0x9665: 0x8C8C,
        0x9666: 0x8CBF,
        0x9667: 0x927E,
        0x9668: 0x9632,
        0x9669: 0x5420,
        0x966A: 0x982C,
        0x966B: 0x5317,
        0x966C: 0x50D5,
        0x966D: 0x535C,
        0x966E: 0x58A8,
        0x966F: 0x64B2,
        0x9670: 0x6734,
        0x9671: 0x7267,
        0x9672: 0x7766,
        0x9673: 0x7A46,
        0x9674: 0x91E6,
        0x9675: 0x52C3,
        0x9676: 0x6CA1,
        0x9677: 0x6B86,
        0x9678: 0x5800,
        0x9679: 0x5E4C,
        0x967A: 0x5954,
        0x967B: 0x672C,
        0x967C: 0x7FFB,
        0x967D: 0x51E1,
        0x967E: 0x76C6,
        0x9680: 0x6469,
        0x9681: 0x78E8,
        0x9682: 0x9B54,
        0x9683: 0x9EBB,
        0x9684: 0x57CB,
        0x9685: 0x59B9,
        0x9686: 0x6627,
        0x9687: 0x679A,
        0x9688: 0x6BCE,
        0x9689: 0x54E9,
        0x968A: 0x69D9,
        0x968B: 0x5E55,
        0x968C: 0x819C,
        0x968D: 0x6795,
        0x968E: 0x9BAA,
        0x968F: 0x67FE,
        0x9690: 0x9C52,
        0x9691: 0x685D,
        0x9692: 0x4EA6,
        0x9693: 0x4FE3,
        0x9694: 0x53C8,
        0x9695: 0x62B9,
        0x9696: 0x672B,
        0x9697: 0x6CAB,
        0x9698: 0x8FC4,
        0x9699: 0x4FAD,
        0x969A: 0x7E6D,
        0x969B: 0x9EBF,
        0x969C: 0x4E07,
        0x969D: 0x6162,
        0x969E: 0x6E80,
        0x969F: 0x6F2B,
        0x96A0: 0x8513,
        0x96A1: 0x5473,
        0x96A2: 0x672A,
        0x96A3: 0x9B45,
        0x96A4: 0x5DF3,
        0x96A5: 0x7B95,
        0x96A6: 0x5CAC,
        0x96A7: 0x5BC6,
        0x96A8: 0x871C,
        0x96A9: 0x6E4A,
        0x96AA: 0x84D1,
        0x96AB: 0x7A14,
        0x96AC: 0x8108,
        0x96AD: 0x5999,
        0x96AE: 0x7C8D,
        0x96AF: 0x6C11,
        0x96B0: 0x7720,
        0x96B1: 0x52D9,
        0x96B2: 0x5922,
        0x96B3: 0x7121,
        0x96B4: 0x725F,
        0x96B5: 0x77DB,
        0x96B6: 0x9727,
        0x96B7: 0x9D61,
        0x96B8: 0x690B,
        0x96B9: 0x5A7F,
        0x96BA: 0x5A18,
        0x96BB: 0x51A5,
        0x96BC: 0x540D,
        0x96BD: 0x547D,
        0x96BE: 0x660E,
        0x96BF: 0x76DF,
        0x96C0: 0x8FF7,
        0x96C1: 0x9298,
        0x96C2: 0x9CF4,
        0x96C3: 0x59EA,
        0x96C4: 0x725D,
        0x96C5: 0x6EC5,
        0x96C6: 0x514D,
        0x96C7: 0x68C9,
        0x96C8: 0x7DBF,
        0x96C9: 0x7DEC,
        0x96CA: 0x9762,
        0x96CB: 0x9EBA,
        0x96CC: 0x6478,
        0x96CD: 0x6A21,
        0x96CE: 0x8302,
        0x96CF: 0x5984,
        0x96D0: 0x5B5F,
        0x96D1: 0x6BDB,
        0x96D2: 0x731B,
        0x96D3: 0x76F2,
        0x96D4: 0x7DB2,
        0x96D5: 0x8017,
        0x96D6: 0x8499,
        0x96D7: 0x5132,
        0x96D8: 0x6728,
        0x96D9: 0x9ED9,
        0x96DA: 0x76EE,
        0x96DB: 0x6762,
        0x96DC: 0x52FF,
        0x96DD: 0x9905,
        0x96DE: 0x5C24,
        0x96DF: 0x623B,
        0x96E0: 0x7C7E,
        0x96E1: 0x8CB0,
        0x96E2: 0x554F,
        0x96E3: 0x60B6,
        0x96E4: 0x7D0B,
        0x96E5: 0x9580,
        0x96E6: 0x5301,
        0x96E7: 0x4E5F,
        0x96E8: 0x51B6,
        0x96E9: 0x591C,
        0x96EA: 0x723A,
        0x96EB: 0x8036,
        0x96EC: 0x91CE,
        0x96ED: 0x5F25,
        0x96EE: 0x77E2,
        0x96EF: 0x5384,
        0x96F0: 0x5F79,
        0x96F1: 0x7D04,
        0x96F2: 0x85AC,
        0x96F3: 0x8A33,
        0x96F4: 0x8E8D,
        0x96F5: 0x9756,
        0x96F6: 0x67F3,
        0x96F7: 0x85AE,
        0x96F8: 0x9453,
        0x96F9: 0x6109,
        0x96FA: 0x6108,
        0x96FB: 0x6CB9,
        0x96FC: 0x7652,
        0x9740: 0x8AED,
        0x9741: 0x8F38,
        0x9742: 0x552F,
        0x9743: 0x4F51,
        0x9744: 0x512A,
        0x9745: 0x52C7,
        0x9746: 0x53CB,
        0x9747: 0x5BA5,
        0x9748: 0x5E7D,
        0x9749: 0x60A0,
        0x974A: 0x6182,
        0x974B: 0x63D6,
        0x974C: 0x6709,
        0x974D: 0x67DA,
        0x974E: 0x6E67,
        0x974F: 0x6D8C,
        0x9750: 0x7336,
        0x9751: 0x7337,
        0x9752: 0x7531,
        0x9753: 0x7950,
        0x9754: 0x88D5,
        0x9755: 0x8A98,
        0x9756: 0x904A,
        0x9757: 0x9091,
        0x9758: 0x90F5,
        0x9759: 0x96C4,
        0x975A: 0x878D,
        0x975B: 0x5915,
        0x975C: 0x4E88,
        0x975D: 0x4F59,
        0x975E: 0x4E0E,
        0x975F: 0x8A89,
        0x9760: 0x8F3F,
        0x9761: 0x9810,
        0x9762: 0x50AD,
        0x9763: 0x5E7C,
        0x9764: 0x5996,
        0x9765: 0x5BB9,
        0x9766: 0x5EB8,
        0x9767: 0x63DA,
        0x9768: 0x63FA,
        0x9769: 0x64C1,
        0x976A: 0x66DC,
        0x976B: 0x694A,
        0x976C: 0x69D8,
        0x976D: 0x6D0B,
        0x976E: 0x6EB6,
        0x976F: 0x7194,
        0x9770: 0x7528,
        0x9771: 0x7AAF,
        0x9772: 0x7F8A,
        0x9773: 0x8000,
        0x9774: 0x8449,
        0x9775: 0x84C9,
        0x9776: 0x8981,
        0x9777: 0x8B21,
        0x9778: 0x8E0A,
        0x9779: 0x9065,
        0x977A: 0x967D,
        0x977B: 0x990A,
        0x977C: 0x617E,
        0x977D: 0x6291,
        0x977E: 0x6B32,
        0x9780: 0x6C83,
        0x9781: 0x6D74,
        0x9782: 0x7FCC,
        0x9783: 0x7FFC,
        0x9784: 0x6DC0,
        0x9785: 0x7F85,
        0x9786: 0x87BA,
        0x9787: 0x88F8,
        0x9788: 0x6765,
        0x9789: 0x83B1,
        0x978A: 0x983C,
        0x978B: 0x96F7,
        0x978C: 0x6D1B,
        0x978D: 0x7D61,
        0x978E: 0x843D,
        0x978F: 0x916A,
        0x9790: 0x4E71,
        0x9791: 0x5375,
        0x9792: 0x5D50,
        0x9793: 0x6B04,
        0x9794: 0x6FEB,
        0x9795: 0x85CD,
        0x9796: 0x862D,
        0x9797: 0x89A7,
        0x9798: 0x5229,
        0x9799: 0x540F,
        0x979A: 0x5C65,
        0x979B: 0x674E,
        0x979C: 0x68A8,
        0x979D: 0x7406,
        0x979E: 0x7483,
        0x979F: 0x75E2,
        0x97A0: 0x88CF,
        0x97A1: 0x88E1,
        0x97A2: 0x91CC,
        0x97A3: 0x96E2,
        0x97A4: 0x9678,
        0x97A5: 0x5F8B,
        0x97A6: 0x7387,
        0x97A7: 0x7ACB,
        0x97A8: 0x844E,
        0x97A9: 0x63A0,
        0x97AA: 0x7565,
        0x97AB: 0x5289,
        0x97AC: 0x6D41,
        0x97AD: 0x6E9C,
        0x97AE: 0x7409,
        0x97AF: 0x7559,
        0x97B0: 0x786B,
        0x97B1: 0x7C92,
        0x97B2: 0x9686,
        0x97B3: 0x7ADC,
        0x97B4: 0x9F8D,
        0x97B5: 0x4FB6,
        0x97B6: 0x616E,
        0x97B7: 0x65C5,
        0x97B8: 0x865C,
        0x97B9: 0x4E86,
        0x97BA: 0x4EAE,
        0x97BB: 0x50DA,
        0x97BC: 0x4E21,
        0x97BD: 0x51CC,
        0x97BE: 0x5BEE,
        0x97BF: 0x6599,
        0x97C0: 0x6881,
        0x97C1: 0x6DBC,
        0x97C2: 0x731F,
        0x97C3: 0x7642,
        0x97C4: 0x77AD,
        0x97C5: 0x7A1C,
        0x97C6: 0x7CE7,
        0x97C7: 0x826F,
        0x97C8: 0x8AD2,
        0x97C9: 0x907C,
        0x97CA: 0x91CF,
        0x97CB: 0x9675,
        0x97CC: 0x9818,
        0x97CD: 0x529B,
        0x97CE: 0x7DD1,
        0x97CF: 0x502B,
        0x97D0: 0x5398,
        0x97D1: 0x6797,
        0x97D2: 0x6DCB,
        0x97D3: 0x71D0,
        0x97D4: 0x7433,
        0x97D5: 0x81E8,
        0x97D6: 0x8F2A,
        0x97D7: 0x96A3,
        0x97D8: 0x9C57,
        0x97D9: 0x9E9F,
        0x97DA: 0x7460,
        0x97DB: 0x5841,
        0x97DC: 0x6D99,
        0x97DD: 0x7D2F,
        0x97DE: 0x985E,
        0x97DF: 0x4EE4,
        0x97E0: 0x4F36,
        0x97E1: 0x4F8B,
        0x97E2: 0x51B7,
        0x97E3: 0x52B1,
        0x97E4: 0x5DBA,
        0x97E5: 0x601C,
        0x97E6: 0x73B2,
        0x97E7: 0x793C,
        0x97E8: 0x82D3,
        0x97E9: 0x9234,
        0x97EA: 0x96B7,
        0x97EB: 0x96F6,
        0x97EC: 0x970A,
        0x97ED: 0x9E97,
        0x97EE: 0x9F62,
        0x97EF: 0x66A6,
        0x97F0: 0x6B74,
        0x97F1: 0x5217,
        0x97F2: 0x52A3,
        0x97F3: 0x70C8,
        0x97F4: 0x88C2,
        0x97F5: 0x5EC9,
        0x97F6: 0x604B,
        0x97F7: 0x6190,
        0x97F8: 0x6F23,
        0x97F9: 0x7149,
        0x97FA: 0x7C3E,
        0x97FB: 0x7DF4,
        0x97FC: 0x806F,
        0x9840: 0x84EE,
        0x9841: 0x9023,
        0x9842: 0x932C,
        0x9843: 0x5442,
        0x9844: 0x9B6F,
        0x9845: 0x6AD3,
        0x9846: 0x7089,
        0x9847: 0x8CC2,
        0x9848: 0x8DEF,
        0x9849: 0x9732,
        0x984A: 0x52B4,
        0x984B: 0x5A41,
        0x984C: 0x5ECA,
        0x984D: 0x5F04,
        0x984E: 0x6717,
        0x984F: 0x697C,
        0x9850: 0x6994,
        0x9851: 0x6D6A,
        0x9852: 0x6F0F,
        0x9853: 0x7262,
        0x9854: 0x72FC,
        0x9855: 0x7BED,
        0x9856: 0x8001,
        0x9857: 0x807E,
        0x9858: 0x874B,
        0x9859: 0x90CE,
        0x985A: 0x516D,
        0x985B: 0x9E93,
        0x985C: 0x7984,
        0x985D: 0x808B,
        0x985E: 0x9332,
        0x985F: 0x8AD6,
        0x9860: 0x502D,
        0x9861: 0x548C,
        0x9862: 0x8A71,
        0x9863: 0x6B6A,
        0x9864: 0x8CC4,
        0x9865: 0x8107,
        0x9866: 0x60D1,
        0x9867: 0x67A0,
        0x9868: 0x9DF2,
        0x9869: 0x4E99,
        0x986A: 0x4E98,
        0x986B: 0x9C10,
        0x986C: 0x8A6B,
        0x986D: 0x85C1,
        0x986E: 0x8568,
        0x986F: 0x6900,
        0x9870: 0x6E7E,
        0x9871: 0x7897,
        0x9872: 0x8155,
        0x989F: 0x5F0C,
        0x98A0: 0x4E10,
        0x98A1: 0x4E15,
        0x98A2: 0x4E2A,
        0x98A3: 0x4E31,
        0x98A4: 0x4E36,
        0x98A5: 0x4E3C,
        0x98A6: 0x4E3F,
        0x98A7: 0x4E42,
        0x98A8: 0x4E56,
        0x98A9: 0x4E58,
        0x98AA: 0x4E82,
        0x98AB: 0x4E85,
        0x98AC: 0x8C6B,
        0x98AD: 0x4E8A,
        0x98AE: 0x8212,
        0x98AF: 0x5F0D,
        0x98B0: 0x4E8E,
        0x98B1: 0x4E9E,
        0x98B2: 0x4E9F,
        0x98B3: 0x4EA0,
        0x98B4: 0x4EA2,
        0x98B5: 0x4EB0,
        0x98B6: 0x4EB3,
        0x98B7: 0x4EB6,
        0x98B8: 0x4ECE,
        0x98B9: 0x4ECD,
        0x98BA: 0x4EC4,
        0x98BB: 0x4EC6,
        0x98BC: 0x4EC2,
        0x98BD: 0x4ED7,
        0x98BE: 0x4EDE,
        0x98BF: 0x4EED,
        0x98C0: 0x4EDF,
        0x98C1: 0x4EF7,
        0x98C2: 0x4F09,
        0x98C3: 0x4F5A,
        0x98C4: 0x4F30,
        0x98C5: 0x4F5B,
        0x98C6: 0x4F5D,
        0x98C7: 0x4F57,
        0x98C8: 0x4F47,
        0x98C9: 0x4F76,
        0x98CA: 0x4F88,
        0x98CB: 0x4F8F,
        0x98CC: 0x4F98,
        0x98CD: 0x4F7B,
        0x98CE: 0x4F69,
        0x98CF: 0x4F70,
        0x98D0: 0x4F91,
        0x98D1: 0x4F6F,
        0x98D2: 0x4F86,
        0x98D3: 0x4F96,
        0x98D4: 0x5118,
        0x98D5: 0x4FD4,
        0x98D6: 0x4FDF,
        0x98D7: 0x4FCE,
        0x98D8: 0x4FD8,
        0x98D9: 0x4FDB,
        0x98DA: 0x4FD1,
        0x98DB: 0x4FDA,
        0x98DC: 0x4FD0,
        0x98DD: 0x4FE4,
        0x98DE: 0x4FE5,
        0x98DF: 0x501A,
        0x98E0: 0x5028,
        0x98E1: 0x5014,
        0x98E2: 0x502A,
        0x98E3: 0x5025,
        0x98E4: 0x5005,
        0x98E5: 0x4F1C,
        0x98E6: 0x4FF6,
        0x98E7: 0x5021,
        0x98E8: 0x5029,
        0x98E9: 0x502C,
        0x98EA: 0x4FFE,
        0x98EB: 0x4FEF,
        0x98EC: 0x5011,
        0x98ED: 0x5006,
        0x98EE: 0x5043,
        0x98EF: 0x5047,
        0x98F0: 0x6703,
        0x98F1: 0x5055,
        0x98F2: 0x5050,
        0x98F3: 0x5048,
        0x98F4: 0x505A,
        0x98F5: 0x5056,
        0x98F6: 0x506C,
        0x98F7: 0x5078,
        0x98F8: 0x5080,
        0x98F9: 0x509A,
        0x98FA: 0x5085,
        0x98FB: 0x50B4,
        0x98FC: 0x50B2,
        0x9940: 0x50C9,
        0x9941: 0x50CA,
        0x9942: 0x50B3,
        0x9943: 0x50C2,
        0x9944: 0x50D6,
        0x9945: 0x50DE,
        0x9946: 0x50E5,
        0x9947: 0x50ED,
        0x9948: 0x50E3,
        0x9949: 0x50EE,
        0x994A: 0x50F9,
        0x994B: 0x50F5,
        0x994C: 0x5109,
        0x994D: 0x5101,
        0x994E: 0x5102,
        0x994F: 0x5116,
        0x9950: 0x5115,
        0x9951: 0x5114,
        0x9952: 0x511A,
        0x9953: 0x5121,
        0x9954: 0x513A,
        0x9955: 0x5137,
        0x9956: 0x513C,
        0x9957: 0x513B,
        0x9958: 0x513F,
        0x9959: 0x5140,
        0x995A: 0x5152,
        0x995B: 0x514C,
        0x995C: 0x5154,
        0x995D: 0x5162,
        0x995E: 0x7AF8,
        0x995F: 0x5169,
        0x9960: 0x516A,
        0x9961: 0x516E,
        0x9962: 0x5180,
        0x9963: 0x5182,
        0x9964: 0x56D8,
        0x9965: 0x518C,
        0x9966: 0x5189,
        0x9967: 0x518F,
        0x9968: 0x5191,
        0x9969: 0x5193,
        0x996A: 0x5195,
        0x996B: 0x5196,
        0x996C: 0x51A4,
        0x996D: 0x51A6,
        0x996E: 0x51A2,
        0x996F: 0x51A9,
        0x9970: 0x51AA,
        0x9971: 0x51AB,
        0x9972: 0x51B3,
        0x9973: 0x51B1,
        0x9974: 0x51B2,
        0x9975: 0x51B0,
        0x9976: 0x51B5,
        0x9977: 0x51BD,
        0x9978: 0x51C5,
        0x9979: 0x51C9,
        0x997A: 0x51DB,
        0x997B: 0x51E0,
        0x997C: 0x8655,
        0x997D: 0x51E9,
        0x997E: 0x51ED,
        0x9980: 0x51F0,
        0x9981: 0x51F5,
        0x9982: 0x51FE,
        0x9983: 0x5204,
        0x9984: 0x520B,
        0x9985: 0x5214,
        0x9986: 0x520E,
        0x9987: 0x5227,
        0x9988: 0x522A,
        0x9989: 0x522E,
        0x998A: 0x5233,
        0x998B: 0x5239,
        0x998C: 0x524F,
        0x998D: 0x5244,
        0x998E: 0x524B,
        0x998F: 0x524C,
        0x9990: 0x525E,
        0x9991: 0x5254,
        0x9992: 0x526A,
        0x9993: 0x5274,
        0x9994: 0x5269,
        0x9995: 0x5273,
        0x9996: 0x527F,
        0x9997: 0x527D,
        0x9998: 0x528D,
        0x9999: 0x5294,
        0x999A: 0x5292,
        0x999B: 0x5271,
        0x999C: 0x5288,
        0x999D: 0x5291,
        0x999E: 0x8FA8,
        0x999F: 0x8FA7,
        0x99A0: 0x52AC,
        0x99A1: 0x52AD,
        0x99A2: 0x52BC,
        0x99A3: 0x52B5,
        0x99A4: 0x52C1,
        0x99A5: 0x52CD,
        0x99A6: 0x52D7,
        0x99A7: 0x52DE,
        0x99A8: 0x52E3,
        0x99A9: 0x52E6,
        0x99AA: 0x98ED,
        0x99AB: 0x52E0,
        0x99AC: 0x52F3,
        0x99AD: 0x52F5,
        0x99AE: 0x52F8,
        0x99AF: 0x52F9,
        0x99B0: 0x5306,
        0x99B1: 0x5308,
        0x99B2: 0x7538,
        0x99B3: 0x530D,
        0x99B4: 0x5310,
        0x99B5: 0x530F,
        0x99B6: 0x5315,
        0x99B7: 0x531A,
        0x99B8: 0x5323,
        0x99B9: 0x532F,
        0x99BA: 0x5331,
        0x99BB: 0x5333,
        0x99BC: 0x5338,
        0x99BD: 0x5340,
        0x99BE: 0x5346,
        0x99BF: 0x5345,
        0x99C0: 0x4E17,
        0x99C1: 0x5349,
        0x99C2: 0x534D,
        0x99C3: 0x51D6,
        0x99C4: 0x535E,
        0x99C5: 0x5369,
        0x99C6: 0x536E,
        0x99C7: 0x5918,
        0x99C8: 0x537B,
        0x99C9: 0x5377,
        0x99CA: 0x5382,
        0x99CB: 0x5396,
        0x99CC: 0x53A0,
        0x99CD: 0x53A6,
        0x99CE: 0x53A5,
        0x99CF: 0x53AE,
        0x99D0: 0x53B0,
        0x99D1: 0x53B6,
        0x99D2: 0x53C3,
        0x99D3: 0x7C12,
        0x99D4: 0x96D9,
        0x99D5: 0x53DF,
        0x99D6: 0x66FC,
        0x99D7: 0x71EE,
        0x99D8: 0x53EE,
        0x99D9: 0x53E8,
        0x99DA: 0x53ED,
        0x99DB: 0x53FA,
        0x99DC: 0x5401,
        0x99DD: 0x543D,
        0x99DE: 0x5440,
        0x99DF: 0x542C,
        0x99E0: 0x542D,
        0x99E1: 0x543C,
        0x99E2: 0x542E,
        0x99E3: 0x5436,
        0x99E4: 0x5429,
        0x99E5: 0x541D,
        0x99E6: 0x544E,
        0x99E7: 0x548F,
        0x99E8: 0x5475,
        0x99E9: 0x548E,
        0x99EA: 0x545F,
        0x99EB: 0x5471,
        0x99EC: 0x5477,
        0x99ED: 0x5470,
        0x99EE: 0x5492,
        0x99EF: 0x547B,
        0x99F0: 0x5480,
        0x99F1: 0x5476,
        0x99F2: 0x5484,
        0x99F3: 0x5490,
        0x99F4: 0x5486,
        0x99F5: 0x54C7,
        0x99F6: 0x54A2,
        0x99F7: 0x54B8,
        0x99F8: 0x54A5,
        0x99F9: 0x54AC,
        0x99FA: 0x54C4,
        0x99FB: 0x54C8,
        0x99FC: 0x54A8,
        0x9A40: 0x54AB,
        0x9A41: 0x54C2,
        0x9A42: 0x54A4,
        0x9A43: 0x54BE,
        0x9A44: 0x54BC,
        0x9A45: 0x54D8,
        0x9A46: 0x54E5,
        0x9A47: 0x54E6,
        0x9A48: 0x550F,
        0x9A49: 0x5514,
        0x9A4A: 0x54FD,
        0x9A4B: 0x54EE,
        0x9A4C: 0x54ED,
        0x9A4D: 0x54FA,
        0x9A4E: 0x54E2,
        0x9A4F: 0x5539,
        0x9A50: 0x5540,
        0x9A51: 0x5563,
        0x9A52: 0x554C,
        0x9A53: 0x552E,
        0x9A54: 0x555C,
        0x9A55: 0x5545,
        0x9A56: 0x5556,
        0x9A57: 0x5557,
        0x9A58: 0x5538,
        0x9A59: 0x5533,
        0x9A5A: 0x555D,
        0x9A5B: 0x5599,
        0x9A5C: 0x5580,
        0x9A5D: 0x54AF,
        0x9A5E: 0x558A,
        0x9A5F: 0x559F,
        0x9A60: 0x557B,
        0x9A61: 0x557E,
        0x9A62: 0x5598,
        0x9A63: 0x559E,
        0x9A64: 0x55AE,
        0x9A65: 0x557C,
        0x9A66: 0x5583,
        0x9A67: 0x55A9,
        0x9A68: 0x5587,
        0x9A69: 0x55A8,
        0x9A6A: 0x55DA,
        0x9A6B: 0x55C5,
        0x9A6C: 0x55DF,
        0x9A6D: 0x55C4,
        0x9A6E: 0x55DC,
        0x9A6F: 0x55E4,
        0x9A70: 0x55D4,
        0x9A71: 0x5614,
        0x9A72: 0x55F7,
        0x9A73: 0x5616,
        0x9A74: 0x55FE,
        0x9A75: 0x55FD,
        0x9A76: 0x561B,
        0x9A77: 0x55F9,
        0x9A78: 0x564E,
        0x9A79: 0x5650,
        0x9A7A: 0x71DF,
        0x9A7B: 0x5634,
        0x9A7C: 0x5636,
        0x9A7D: 0x5632,
        0x9A7E: 0x5638,
        0x9A80: 0x566B,
        0x9A81: 0x5664,
        0x9A82: 0x562F,
        0x9A83: 0x566C,
        0x9A84: 0x566A,
        0x9A85: 0x5686,
        0x9A86: 0x5680,
        0x9A87: 0x568A,
        0x9A88: 0x56A0,
        0x9A89: 0x5694,
        0x9A8A: 0x568F,
        0x9A8B: 0x56A5,
        0x9A8C: 0x56AE,
        0x9A8D: 0x56B6,
        0x9A8E: 0x56B4,
        0x9A8F: 0x56C2,
        0x9A90: 0x56BC,
        0x9A91: 0x56C1,
        0x9A92: 0x56C3,
        0x9A93: 0x56C0,
        0x9A94: 0x56C8,
        0x9A95: 0x56CE,
        0x9A96: 0x56D1,
        0x9A97: 0x56D3,
        0x9A98: 0x56D7,
        0x9A99: 0x56EE,
        0x9A9A: 0x56F9,
        0x9A9B: 0x5700,
        0x9A9C: 0x56FF,
        0x9A9D: 0x5704,
        0x9A9E: 0x5709,
        0x9A9F: 0x5708,
        0x9AA0: 0x570B,
        0x9AA1: 0x570D,
        0x9AA2: 0x5713,
        0x9AA3: 0x5718,
        0x9AA4: 0x5716,
        0x9AA5: 0x55C7,
        0x9AA6: 0x571C,
        0x9AA7: 0x5726,
        0x9AA8: 0x5737,
        0x9AA9: 0x5738,
        0x9AAA: 0x574E,
        0x9AAB: 0x573B,
        0x9AAC: 0x5740,
        0x9AAD: 0x574F,
        0x9AAE: 0x5769,
        0x9AAF: 0x57C0,
        0x9AB0: 0x5788,
        0x9AB1: 0x5761,
        0x9AB2: 0x577F,
        0x9AB3: 0x5789,
        0x9AB4: 0x5793,
        0x9AB5: 0x57A0,
        0x9AB6: 0x57B3,
        0x9AB7: 0x57A4,
        0x9AB8: 0x57AA,
        0x9AB9: 0x57B0,
        0x9ABA: 0x57C3,
        0x9ABB: 0x57C6,
        0x9ABC: 0x57D4,
        0x9ABD: 0x57D2,
        0x9ABE: 0x57D3,
        0x9ABF: 0x580A,
        0x9AC0: 0x57D6,
        0x9AC1: 0x57E3,
        0x9AC2: 0x580B,
        0x9AC3: 0x5819,
        0x9AC4: 0x581D,
        0x9AC5: 0x5872,
        0x9AC6: 0x5821,
        0x9AC7: 0x5862,
        0x9AC8: 0x584B,
        0x9AC9: 0x5870,
        0x9ACA: 0x6BC0,
        0x9ACB: 0x5852,
        0x9ACC: 0x583D,
        0x9ACD: 0x5879,
        0x9ACE: 0x5885,
        0x9ACF: 0x58B9,
        0x9AD0: 0x589F,
        0x9AD1: 0x58AB,
        0x9AD2: 0x58BA,
        0x9AD3: 0x58DE,
        0x9AD4: 0x58BB,
        0x9AD5: 0x58B8,
        0x9AD6: 0x58AE,
        0x9AD7: 0x58C5,
        0x9AD8: 0x58D3,
        0x9AD9: 0x58D1,
        0x9ADA: 0x58D7,
        0x9ADB: 0x58D9,
        0x9ADC: 0x58D8,
        0x9ADD: 0x58E5,
        0x9ADE: 0x58DC,
        0x9ADF: 0x58E4,
        0x9AE0: 0x58DF,
        0x9AE1: 0x58EF,
        0x9AE2: 0x58FA,
        0x9AE3: 0x58F9,
        0x9AE4: 0x58FB,
        0x9AE5: 0x58FC,
        0x9AE6: 0x58FD,
        0x9AE7: 0x5902,
        0x9AE8: 0x590A,
        0x9AE9: 0x5910,
        0x9AEA: 0x591B,
        0x9AEB: 0x68A6,
        0x9AEC: 0x5925,
        0x9AED: 0x592C,
        0x9AEE: 0x592D,
        0x9AEF: 0x5932,
        0x9AF0: 0x5938,
        0x9AF1: 0x593E,
        0x9AF2: 0x7AD2,
        0x9AF3: 0x5955,
        0x9AF4: 0x5950,
        0x9AF5: 0x594E,
        0x9AF6: 0x595A,
        0x9AF7: 0x5958,
        0x9AF8: 0x5962,
        0x9AF9: 0x5960,
        0x9AFA: 0x5967,
        0x9AFB: 0x596C,
        0x9AFC: 0x5969,
        0x9B40: 0x5978,
        0x9B41: 0x5981,
        0x9B42: 0x599D,
        0x9B43: 0x4F5E,
        0x9B44: 0x4FAB,
        0x9B45: 0x59A3,
        0x9B46: 0x59B2,
        0x9B47: 0x59C6,
        0x9B48: 0x59E8,
        0x9B49: 0x59DC,
        0x9B4A: 0x598D,
        0x9B4B: 0x59D9,
        0x9B4C: 0x59DA,
        0x9B4D: 0x5A25,
        0x9B4E: 0x5A1F,
        0x9B4F: 0x5A11,
        0x9B50: 0x5A1C,
        0x9B51: 0x5A09,
        0x9B52: 0x5A1A,
        0x9B53: 0x5A40,
        0x9B54: 0x5A6C,
        0x9B55: 0x5A49,
        0x9B56: 0x5A35,
        0x9B57: 0x5A36,
        0x9B58: 0x5A62,
        0x9B59: 0x5A6A,
        0x9B5A: 0x5A9A,
        0x9B5B: 0x5ABC,
        0x9B5C: 0x5ABE,
        0x9B5D: 0x5ACB,
        0x9B5E: 0x5AC2,
        0x9B5F: 0x5ABD,
        0x9B60: 0x5AE3,
        0x9B61: 0x5AD7,
        0x9B62: 0x5AE6,
        0x9B63: 0x5AE9,
        0x9B64: 0x5AD6,
        0x9B65: 0x5AFA,
        0x9B66: 0x5AFB,
        0x9B67: 0x5B0C,
        0x9B68: 0x5B0B,
        0x9B69: 0x5B16,
        0x9B6A: 0x5B32,
        0x9B6B: 0x5AD0,
        0x9B6C: 0x5B2A,
        0x9B6D: 0x5B36,
        0x9B6E: 0x5B3E,
        0x9B6F: 0x5B43,
        0x9B70: 0x5B45,
        0x9B71: 0x5B40,
        0x9B72: 0x5B51,
        0x9B73: 0x5B55,
        0x9B74: 0x5B5A,
        0x9B75: 0x5B5B,
        0x9B76: 0x5B65,
        0x9B77: 0x5B69,
        0x9B78: 0x5B70,
        0x9B79: 0x5B73,
        0x9B7A: 0x5B75,
        0x9B7B: 0x5B78,
        0x9B7C: 0x6588,
        0x9B7D: 0x5B7A,
        0x9B7E: 0x5B80,
        0x9B80: 0x5B83,
        0x9B81: 0x5BA6,
        0x9B82: 0x5BB8,
        0x9B83: 0x5BC3,
        0x9B84: 0x5BC7,
        0x9B85: 0x5BC9,
        0x9B86: 0x5BD4,
        0x9B87: 0x5BD0,
        0x9B88: 0x5BE4,
        0x9B89: 0x5BE6,
        0x9B8A: 0x5BE2,
        0x9B8B: 0x5BDE,
        0x9B8C: 0x5BE5,
        0x9B8D: 0x5BEB,
        0x9B8E: 0x5BF0,
        0x9B8F: 0x5BF6,
        0x9B90: 0x5BF3,
        0x9B91: 0x5C05,
        0x9B92: 0x5C07,
        0x9B93: 0x5C08,
        0x9B94: 0x5C0D,
        0x9B95: 0x5C13,
        0x9B96: 0x5C20,
        0x9B97: 0x5C22,
        0x9B98: 0x5C28,
        0x9B99: 0x5C38,
        0x9B9A: 0x5C39,
        0x9B9B: 0x5C41,
        0x9B9C: 0x5C46,
        0x9B9D: 0x5C4E,
        0x9B9E: 0x5C53,
        0x9B9F: 0x5C50,
        0x9BA0: 0x5C4F,
        0x9BA1: 0x5B71,
        0x9BA2: 0x5C6C,
        0x9BA3: 0x5C6E,
        0x9BA4: 0x4E62,
        0x9BA5: 0x5C76,
        0x9BA6: 0x5C79,
        0x9BA7: 0x5C8C,
        0x9BA8: 0x5C91,
        0x9BA9: 0x5C94,
        0x9BAA: 0x599B,
        0x9BAB: 0x5CAB,
        0x9BAC: 0x5CBB,
        0x9BAD: 0x5CB6,
        0x9BAE: 0x5CBC,
        0x9BAF: 0x5CB7,
        0x9BB0: 0x5CC5,
        0x9BB1: 0x5CBE,
        0x9BB2: 0x5CC7,
        0x9BB3: 0x5CD9,
        0x9BB4: 0x5CE9,
        0x9BB5: 0x5CFD,
        0x9BB6: 0x5CFA,
        0x9BB7: 0x5CED,
        0x9BB8: 0x5D8C,
        0x9BB9: 0x5CEA,
        0x9BBA: 0x5D0B,
        0x9BBB: 0x5D15,
        0x9BBC: 0x5D17,
        0x9BBD: 0x5D5C,
        0x9BBE: 0x5D1F,
        0x9BBF: 0x5D1B,
        0x9BC0: 0x5D11,
        0x9BC1: 0x5D14,
        0x9BC2: 0x5D22,
        0x9BC3: 0x5D1A,
        0x9BC4: 0x5D19,
        0x9BC5: 0x5D18,
        0x9BC6: 0x5D4C,
        0x9BC7: 0x5D52,
        0x9BC8: 0x5D4E,
        0x9BC9: 0x5D4B,
        0x9BCA: 0x5D6C,
        0x9BCB: 0x5D73,
        0x9BCC: 0x5D76,
        0x9BCD: 0x5D87,
        0x9BCE: 0x5D84,
        0x9BCF: 0x5D82,
        0x9BD0: 0x5DA2,
        0x9BD1: 0x5D9D,
        0x9BD2: 0x5DAC,
        0x9BD3: 0x5DAE,
        0x9BD4: 0x5DBD,
        0x9BD5: 0x5D90,
        0x9BD6: 0x5DB7,
        0x9BD7: 0x5DBC,
        0x9BD8: 0x5DC9,
        0x9BD9: 0x5DCD,
        0x9BDA: 0x5DD3,
        0x9BDB: 0x5DD2,
        0x9BDC: 0x5DD6,
        0x9BDD: 0x5DDB,
        0x9BDE: 0x5DEB,
        0x9BDF: 0x5DF2,
        0x9BE0: 0x5DF5,
        0x9BE1: 0x5E0B,
        0x9BE2: 0x5E1A,
        0x9BE3: 0x5E19,
        0x9BE4: 0x5E11,
        0x9BE5: 0x5E1B,
        0x9BE6: 0x5E36,
        0x9BE7: 0x5E37,
        0x9BE8: 0x5E44,
        0x9BE9: 0x5E43,
        0x9BEA: 0x5E40,
        0x9BEB: 0x5E4E,
        0x9BEC: 0x5E57,
        0x9BED: 0x5E54,
        0x9BEE: 0x5E5F,
        0x9BEF: 0x5E62,
        0x9BF0: 0x5E64,
        0x9BF1: 0x5E47,
        0x9BF2: 0x5E75,
        0x9BF3: 0x5E76,
        0x9BF4: 0x5E7A,
        0x9BF5: 0x9EBC,
        0x9BF6: 0x5E7F,
        0x9BF7: 0x5EA0,
        0x9BF8: 0x5EC1,
        0x9BF9: 0x5EC2,
        0x9BFA: 0x5EC8,
        0x9BFB: 0x5ED0,
        0x9BFC: 0x5ECF,
        0x9C40: 0x5ED6,
        0x9C41: 0x5EE3,
        0x9C42: 0x5EDD,
        0x9C43: 0x5EDA,
        0x9C44: 0x5EDB,
        0x9C45: 0x5EE2,
        0x9C46: 0x5EE1,
        0x9C47: 0x5EE8,
        0x9C48: 0x5EE9,
        0x9C49: 0x5EEC,
        0x9C4A: 0x5EF1,
        0x9C4B: 0x5EF3,
        0x9C4C: 0x5EF0,
        0x9C4D: 0x5EF4,
        0x9C4E: 0x5EF8,
        0x9C4F: 0x5EFE,
        0x9C50: 0x5F03,
        0x9C51: 0x5F09,
        0x9C52: 0x5F5D,
        0x9C53: 0x5F5C,
        0x9C54: 0x5F0B,
        0x9C55: 0x5F11,
        0x9C56: 0x5F16,
        0x9C57: 0x5F29,
        0x9C58: 0x5F2D,
        0x9C59: 0x5F38,
        0x9C5A: 0x5F41,
        0x9C5B: 0x5F48,
        0x9C5C: 0x5F4C,
        0x9C5D: 0x5F4E,
        0x9C5E: 0x5F2F,
        0x9C5F: 0x5F51,
        0x9C60: 0x5F56,
        0x9C61: 0x5F57,
        0x9C62: 0x5F59,
        0x9C63: 0x5F61,
        0x9C64: 0x5F6D,
        0x9C65: 0x5F73,
        0x9C66: 0x5F77,
        0x9C67: 0x5F83,
        0x9C68: 0x5F82,
        0x9C69: 0x5F7F,
        0x9C6A: 0x5F8A,
        0x9C6B: 0x5F88,
        0x9C6C: 0x5F91,
        0x9C6D: 0x5F87,
        0x9C6E: 0x5F9E,
        0x9C6F: 0x5F99,
        0x9C70: 0x5F98,
        0x9C71: 0x5FA0,
        0x9C72: 0x5FA8,
        0x9C73: 0x5FAD,
        0x9C74: 0x5FBC,
        0x9C75: 0x5FD6,
        0x9C76: 0x5FFB,
        0x9C77: 0x5FE4,
        0x9C78: 0x5FF8,
        0x9C79: 0x5FF1,
        0x9C7A: 0x5FDD,
        0x9C7B: 0x60B3,
        0x9C7C: 0x5FFF,
        0x9C7D: 0x6021,
        0x9C7E: 0x6060,
        0x9C80: 0x6019,
        0x9C81: 0x6010,
        0x9C82: 0x6029,
        0x9C83: 0x600E,
        0x9C84: 0x6031,
        0x9C85: 0x601B,
        0x9C86: 0x6015,
        0x9C87: 0x602B,
        0x9C88: 0x6026,
        0x9C89: 0x600F,
        0x9C8A: 0x603A,
        0x9C8B: 0x605A,
        0x9C8C: 0x6041,
        0x9C8D: 0x606A,
        0x9C8E: 0x6077,
        0x9C8F: 0x605F,
        0x9C90: 0x604A,
        0x9C91: 0x6046,
        0x9C92: 0x604D,
        0x9C93: 0x6063,
        0x9C94: 0x6043,
        0x9C95: 0x6064,
        0x9C96: 0x6042,
        0x9C97: 0x606C,
        0x9C98: 0x606B,
        0x9C99: 0x6059,
        0x9C9A: 0x6081,
        0x9C9B: 0x608D,
        0x9C9C: 0x60E7,
        0x9C9D: 0x6083,
        0x9C9E: 0x609A,
        0x9C9F: 0x6084,
        0x9CA0: 0x609B,
        0x9CA1: 0x6096,
        0x9CA2: 0x6097,
        0x9CA3: 0x6092,
        0x9CA4: 0x60A7,
        0x9CA5: 0x608B,
        0x9CA6: 0x60E1,
        0x9CA7: 0x60B8,
        0x9CA8: 0x60E0,
        0x9CA9: 0x60D3,
        0x9CAA: 0x60B4,
        0x9CAB: 0x5FF0,
        0x9CAC: 0x60BD,
        0x9CAD: 0x60C6,
        0x9CAE: 0x60B5,
        0x9CAF: 0x60D8,
        0x9CB0: 0x614D,
        0x9CB1: 0x6115,
        0x9CB2: 0x6106,
        0x9CB3: 0x60F6,
        0x9CB4: 0x60F7,
        0x9CB5: 0x6100,
        0x9CB6: 0x60F4,
        0x9CB7: 0x60FA,
        0x9CB8: 0x6103,
        0x9CB9: 0x6121,
        0x9CBA: 0x60FB,
        0x9CBB: 0x60F1,
        0x9CBC: 0x610D,
        0x9CBD: 0x610E,
        0x9CBE: 0x6147,
        0x9CBF: 0x613E,
        0x9CC0: 0x6128,
        0x9CC1: 0x6127,
        0x9CC2: 0x614A,
        0x9CC3: 0x613F,
        0x9CC4: 0x613C,
        0x9CC5: 0x612C,
        0x9CC6: 0x6134,
        0x9CC7: 0x613D,
        0x9CC8: 0x6142,
        0x9CC9: 0x6144,
        0x9CCA: 0x6173,
        0x9CCB: 0x6177,
        0x9CCC: 0x6158,
        0x9CCD: 0x6159,
        0x9CCE: 0x615A,
        0x9CCF: 0x616B,
        0x9CD0: 0x6174,
        0x9CD1: 0x616F,
        0x9CD2: 0x6165,
        0x9CD3: 0x6171,
        0x9CD4: 0x615F,
        0x9CD5: 0x615D,
        0x9CD6: 0x6153,
        0x9CD7: 0x6175,
        0x9CD8: 0x6199,
        0x9CD9: 0x6196,
        0x9CDA: 0x6187,
        0x9CDB: 0x61AC,
        0x9CDC: 0x6194,
        0x9CDD: 0x619A,
        0x9CDE: 0x618A,
        0x9CDF: 0x6191,
        0x9CE0: 0x61AB,
        0x9CE1: 0x61AE,
        0x9CE2: 0x61CC,
        0x9CE3: 0x61CA,
        0x9CE4: 0x61C9,
        0x9CE5: 0x61F7,
        0x9CE6: 0x61C8,
        0x9CE7: 0x61C3,
        0x9CE8: 0x61C6,
        0x9CE9: 0x61BA,
        0x9CEA: 0x61CB,
        0x9CEB: 0x7F79,
        0x9CEC: 0x61CD,
        0x9CED: 0x61E6,
        0x9CEE: 0x61E3,
        0x9CEF: 0x61F6,
        0x9CF0: 0x61FA,
        0x9CF1: 0x61F4,
        0x9CF2: 0x61FF,
        0x9CF3: 0x61FD,
        0x9CF4: 0x61FC,
        0x9CF5: 0x61FE,
        0x9CF6: 0x6200,
        0x9CF7: 0x6208,
        0x9CF8: 0x6209,
        0x9CF9: 0x620D,
        0x9CFA: 0x620C,
        0x9CFB: 0x6214,
        0x9CFC: 0x621B,
        0x9D40: 0x621E,
        0x9D41: 0x6221,
        0x9D42: 0x622A,
        0x9D43: 0x622E,
        0x9D44: 0x6230,
        0x9D45: 0x6232,
        0x9D46: 0x6233,
        0x9D47: 0x6241,
        0x9D48: 0x624E,
        0x9D49: 0x625E,
        0x9D4A: 0x6263,
        0x9D4B: 0x625B,
        0x9D4C: 0x6260,
        0x9D4D: 0x6268,
        0x9D4E: 0x627C,
        0x9D4F: 0x6282,
        0x9D50: 0x6289,
        0x9D51: 0x627E,
        0x9D52: 0x6292,
        0x9D53: 0x6293,
        0x9D54: 0x6296,
        0x9D55: 0x62D4,
        0x9D56: 0x6283,
        0x9D57: 0x6294,
        0x9D58: 0x62D7,
        0x9D59: 0x62D1,
        0x9D5A: 0x62BB,
        0x9D5B: 0x62CF,
        0x9D5C: 0x62FF,
        0x9D5D: 0x62C6,
        0x9D5E: 0x64D4,
        0x9D5F: 0x62C8,
        0x9D60: 0x62DC,
        0x9D61: 0x62CC,
        0x9D62: 0x62CA,
        0x9D63: 0x62C2,
        0x9D64: 0x62C7,
        0x9D65: 0x629B,
        0x9D66: 0x62C9,
        0x9D67: 0x630C,
        0x9D68: 0x62EE,
        0x9D69: 0x62F1,
        0x9D6A: 0x6327,
        0x9D6B: 0x6302,
        0x9D6C: 0x6308,
        0x9D6D: 0x62EF,
        0x9D6E: 0x62F5,
        0x9D6F: 0x6350,
        0x9D70: 0x633E,
        0x9D71: 0x634D,
        0x9D72: 0x641C,
        0x9D73: 0x634F,
        0x9D74: 0x6396,
        0x9D75: 0x638E,
        0x9D76: 0x6380,
        0x9D77: 0x63AB,
        0x9D78: 0x6376,
        0x9D79: 0x63A3,
        0x9D7A: 0x638F,
        0x9D7B: 0x6389,
        0x9D7C: 0x639F,
        0x9D7D: 0x63B5,
        0x9D7E: 0x636B,
        0x9D80: 0x6369,
        0x9D81: 0x63BE,
        0x9D82: 0x63E9,
        0x9D83: 0x63C0,
        0x9D84: 0x63C6,
        0x9D85: 0x63E3,
        0x9D86: 0x63C9,
        0x9D87: 0x63D2,
        0x9D88: 0x63F6,
        0x9D89: 0x63C4,
        0x9D8A: 0x6416,
        0x9D8B: 0x6434,
        0x9D8C: 0x6406,
        0x9D8D: 0x6413,
        0x9D8E: 0x6426,
        0x9D8F: 0x6436,
        0x9D90: 0x651D,
        0x9D91: 0x6417,
        0x9D92: 0x6428,
        0x9D93: 0x640F,
        0x9D94: 0x6467,
        0x9D95: 0x646F,
        0x9D96: 0x6476,
        0x9D97: 0x644E,
        0x9D98: 0x652A,
        0x9D99: 0x6495,
        0x9D9A: 0x6493,
        0x9D9B: 0x64A5,
        0x9D9C: 0x64A9,
        0x9D9D: 0x6488,
        0x9D9E: 0x64BC,
        0x9D9F: 0x64DA,
        0x9DA0: 0x64D2,
        0x9DA1: 0x64C5,
        0x9DA2: 0x64C7,
        0x9DA3: 0x64BB,
        0x9DA4: 0x64D8,
        0x9DA5: 0x64C2,
        0x9DA6: 0x64F1,
        0x9DA7: 0x64E7,
        0x9DA8: 0x8209,
        0x9DA9: 0x64E0,
        0x9DAA: 0x64E1,
        0x9DAB: 0x62AC,
        0x9DAC: 0x64E3,
        0x9DAD: 0x64EF,
        0x9DAE: 0x652C,
        0x9DAF: 0x64F6,
        0x9DB0: 0x64F4,
        0x9DB1: 0x64F2,
        0x9DB2: 0x64FA,
        0x9DB3: 0x6500,
        0x9DB4: 0x64FD,
        0x9DB5: 0x6518,
        0x9DB6: 0x651C,
        0x9DB7: 0x6505,
        0x9DB8: 0x6524,
        0x9DB9: 0x6523,
        0x9DBA: 0x652B,
        0x9DBB: 0x6534,
        0x9DBC: 0x6535,
        0x9DBD: 0x6537,
        0x9DBE: 0x6536,
        0x9DBF: 0x6538,
        0x9DC0: 0x754B,
        0x9DC1: 0x6548,
        0x9DC2: 0x6556,
        0x9DC3: 0x6555,
        0x9DC4: 0x654D,
        0x9DC5: 0x6558,
        0x9DC6: 0x655E,
        0x9DC7: 0x655D,
        0x9DC8: 0x6572,
        0x9DC9: 0x6578,
        0x9DCA: 0x6582,
        0x9DCB: 0x6583,
        0x9DCC: 0x8B8A,
        0x9DCD: 0x659B,
        0x9DCE: 0x659F,
        0x9DCF: 0x65AB,
        0x9DD0: 0x65B7,
        0x9DD1: 0x65C3,
        0x9DD2: 0x65C6,
        0x9DD3: 0x65C1,
        0x9DD4: 0x65C4,
        0x9DD5: 0x65CC,
        0x9DD6: 0x65D2,
        0x9DD7: 0x65DB,
        0x9DD8: 0x65D9,
        0x9DD9: 0x65E0,
        0x9DDA: 0x65E1,
        0x9DDB: 0x65F1,
        0x9DDC: 0x6772,
        0x9DDD: 0x660A,
        0x9DDE: 0x6603,
        0x9DDF: 0x65FB,
        0x9DE0: 0x6773,
        0x9DE1: 0x6635,
        0x9DE2: 0x6636,
        0x9DE3: 0x6634,
        0x9DE4: 0x661C,
        0x9DE5: 0x664F,
        0x9DE6: 0x6644,
        0x9DE7: 0x6649,
        0x9DE8: 0x6641,
        0x9DE9: 0x665E,
        0x9DEA: 0x665D,
        0x9DEB: 0x6664,
        0x9DEC: 0x6667,
        0x9DED: 0x6668,
        0x9DEE: 0x665F,
        0x9DEF: 0x6662,
        0x9DF0: 0x6670,
        0x9DF1: 0x6683,
        0x9DF2: 0x6688,
        0x9DF3: 0x668E,
        0x9DF4: 0x6689,
        0x9DF5: 0x6684,
        0x9DF6: 0x6698,
        0x9DF7: 0x669D,
        0x9DF8: 0x66C1,
        0x9DF9: 0x66B9,
        0x9DFA: 0x66C9,
        0x9DFB: 0x66BE,
        0x9DFC: 0x66BC,
        0x9E40: 0x66C4,
        0x9E41: 0x66B8,
        0x9E42: 0x66D6,
        0x9E43: 0x66DA,
        0x9E44: 0x66E0,
        0x9E45: 0x663F,
        0x9E46: 0x66E6,
        0x9E47: 0x66E9,
        0x9E48: 0x66F0,
        0x9E49: 0x66F5,
        0x9E4A: 0x66F7,
        0x9E4B: 0x670F,
        0x9E4C: 0x6716,
        0x9E4D: 0x671E,
        0x9E4E: 0x6726,
        0x9E4F: 0x6727,
        0x9E50: 0x9738,
        0x9E51: 0x672E,
        0x9E52: 0x673F,
        0x9E53: 0x6736,
        0x9E54: 0x6741,
        0x9E55: 0x6738,
        0x9E56: 0x6737,
        0x9E57: 0x6746,
        0x9E58: 0x675E,
        0x9E59: 0x6760,
        0x9E5A: 0x6759,
        0x9E5B: 0x6763,
        0x9E5C: 0x6764,
        0x9E5D: 0x6789,
        0x9E5E: 0x6770,
        0x9E5F: 0x67A9,
        0x9E60: 0x677C,
        0x9E61: 0x676A,
        0x9E62: 0x678C,
        0x9E63: 0x678B,
        0x9E64: 0x67A6,
        0x9E65: 0x67A1,
        0x9E66: 0x6785,
        0x9E67: 0x67B7,
        0x9E68: 0x67EF,
        0x9E69: 0x67B4,
        0x9E6A: 0x67EC,
        0x9E6B: 0x67B3,
        0x9E6C: 0x67E9,
        0x9E6D: 0x67B8,
        0x9E6E: 0x67E4,
        0x9E6F: 0x67DE,
        0x9E70: 0x67DD,
        0x9E71: 0x67E2,
        0x9E72: 0x67EE,
        0x9E73: 0x67B9,
        0x9E74: 0x67CE,
        0x9E75: 0x67C6,
        0x9E76: 0x67E7,
        0x9E77: 0x6A9C,
        0x9E78: 0x681E,
        0x9E79: 0x6846,
        0x9E7A: 0x6829,
        0x9E7B: 0x6840,
        0x9E7C: 0x684D,
        0x9E7D: 0x6832,
        0x9E7E: 0x684E,
        0x9E80: 0x68B3,
        0x9E81: 0x682B,
        0x9E82: 0x6859,
        0x9E83: 0x6863,
        0x9E84: 0x6877,
        0x9E85: 0x687F,
        0x9E86: 0x689F,
        0x9E87: 0x688F,
        0x9E88: 0x68AD,
        0x9E89: 0x6894,
        0x9E8A: 0x689D,
        0x9E8B: 0x689B,
        0x9E8C: 0x6883,
        0x9E8D: 0x6AAE,
        0x9E8E: 0x68B9,
        0x9E8F: 0x6874,
        0x9E90: 0x68B5,
        0x9E91: 0x68A0,
        0x9E92: 0x68BA,
        0x9E93: 0x690F,
        0x9E94: 0x688D,
        0x9E95: 0x687E,
        0x9E96: 0x6901,
        0x9E97: 0x68CA,
        0x9E98: 0x6908,
        0x9E99: 0x68D8,
        0x9E9A: 0x6922,
        0x9E9B: 0x6926,
        0x9E9C: 0x68E1,
        0x9E9D: 0x690C,
        0x9E9E: 0x68CD,
        0x9E9F: 0x68D4,
        0x9EA0: 0x68E7,
        0x9EA1: 0x68D5,
        0x9EA2: 0x6936,
        0x9EA3: 0x6912,
        0x9EA4: 0x6904,
        0x9EA5: 0x68D7,
        0x9EA6: 0x68E3,
        0x9EA7: 0x6925,
        0x9EA8: 0x68F9,
        0x9EA9: 0x68E0,
        0x9EAA: 0x68EF,
        0x9EAB: 0x6928,
        0x9EAC: 0x692A,
        0x9EAD: 0x691A,
        0x9EAE: 0x6923,
        0x9EAF: 0x6921,
        0x9EB0: 0x68C6,
        0x9EB1: 0x6979,
        0x9EB2: 0x6977,
        0x9EB3: 0x695C,
        0x9EB4: 0x6978,
        0x9EB5: 0x696B,
        0x9EB6: 0x6954,
        0x9EB7: 0x697E,
        0x9EB8: 0x696E,
        0x9EB9: 0x6939,
        0x9EBA: 0x6974,
        0x9EBB: 0x693D,
        0x9EBC: 0x6959,
        0x9EBD: 0x6930,
        0x9EBE: 0x6961,
        0x9EBF: 0x695E,
        0x9EC0: 0x695D,
        0x9EC1: 0x6981,
        0x9EC2: 0x696A,
        0x9EC3: 0x69B2,
        0x9EC4: 0x69AE,
        0x9EC5: 0x69D0,
        0x9EC6: 0x69BF,
        0x9EC7: 0x69C1,
        0x9EC8: 0x69D3,
        0x9EC9: 0x69BE,
        0x9ECA: 0x69CE,
        0x9ECB: 0x5BE8,
        0x9ECC: 0x69CA,
        0x9ECD: 0x69DD,
        0x9ECE: 0x69BB,
        0x9ECF: 0x69C3,
        0x9ED0: 0x69A7,
        0x9ED1: 0x6A2E,
        0x9ED2: 0x6991,
        0x9ED3: 0x69A0,
        0x9ED4: 0x699C,
        0x9ED5: 0x6995,
        0x9ED6: 0x69B4,
        0x9ED7: 0x69DE,
        0x9ED8: 0x69E8,
        0x9ED9: 0x6A02,
        0x9EDA: 0x6A1B,
        0x9EDB: 0x69FF,
        0x9EDC: 0x6B0A,
        0x9EDD: 0x69F9,
        0x9EDE: 0x69F2,
        0x9EDF: 0x69E7,
        0x9EE0: 0x6A05,
        0x9EE1: 0x69B1,
        0x9EE2: 0x6A1E,
        0x9EE3: 0x69ED,
        0x9EE4: 0x6A14,
        0x9EE5: 0x69EB,
        0x9EE6: 0x6A0A,
        0x9EE7: 0x6A12,
        0x9EE8: 0x6AC1,
        0x9EE9: 0x6A23,
        0x9EEA: 0x6A13,
        0x9EEB: 0x6A44,
        0x9EEC: 0x6A0C,
        0x9EED: 0x6A72,
        0x9EEE: 0x6A36,
        0x9EEF: 0x6A78,
        0x9EF0: 0x6A47,
        0x9EF1: 0x6A62,
        0x9EF2: 0x6A59,
        0x9EF3: 0x6A66,
        0x9EF4: 0x6A48,
        0x9EF5: 0x6A38,
        0x9EF6: 0x6A22,
        0x9EF7: 0x6A90,
        0x9EF8: 0x6A8D,
        0x9EF9: 0x6AA0,
        0x9EFA: 0x6A84,
        0x9EFB: 0x6AA2,
        0x9EFC: 0x6AA3,
        0x9F40: 0x6A97,
        0x9F41: 0x8617,
        0x9F42: 0x6ABB,
        0x9F43: 0x6AC3,
        0x9F44: 0x6AC2,
        0x9F45: 0x6AB8,
        0x9F46: 0x6AB3,
        0x9F47: 0x6AAC,
        0x9F48: 0x6ADE,
        0x9F49: 0x6AD1,
        0x9F4A: 0x6ADF,
        0x9F4B: 0x6AAA,
        0x9F4C: 0x6ADA,
        0x9F4D: 0x6AEA,
        0x9F4E: 0x6AFB,
        0x9F4F: 0x6B05,
        0x9F50: 0x8616,
        0x9F51: 0x6AFA,
        0x9F52: 0x6B12,
        0x9F53: 0x6B16,
        0x9F54: 0x9B31,
        0x9F55: 0x6B1F,
        0x9F56: 0x6B38,
        0x9F57: 0x6B37,
        0x9F58: 0x76DC,
        0x9F59: 0x6B39,
        0x9F5A: 0x98EE,
        0x9F5B: 0x6B47,
        0x9F5C: 0x6B43,
        0x9F5D: 0x6B49,
        0x9F5E: 0x6B50,
        0x9F5F: 0x6B59,
        0x9F60: 0x6B54,
        0x9F61: 0x6B5B,
        0x9F62: 0x6B5F,
        0x9F63: 0x6B61,
        0x9F64: 0x6B78,
        0x9F65: 0x6B79,
        0x9F66: 0x6B7F,
        0x9F67: 0x6B80,
        0x9F68: 0x6B84,
        0x9F69: 0x6B83,
        0x9F6A: 0x6B8D,
        0x9F6B: 0x6B98,
        0x9F6C: 0x6B95,
        0x9F6D: 0x6B9E,
        0x9F6E: 0x6BA4,
        0x9F6F: 0x6BAA,
        0x9F70: 0x6BAB,
        0x9F71: 0x6BAF,
        0x9F72: 0x6BB2,
        0x9F73: 0x6BB1,
        0x9F74: 0x6BB3,
        0x9F75: 0x6BB7,
        0x9F76: 0x6BBC,
        0x9F77: 0x6BC6,
        0x9F78: 0x6BCB,
        0x9F79: 0x6BD3,
        0x9F7A: 0x6BDF,
        0x9F7B: 0x6BEC,
        0x9F7C: 0x6BEB,
        0x9F7D: 0x6BF3,
        0x9F7E: 0x6BEF,
        0x9F80: 0x9EBE,
        0x9F81: 0x6C08,
        0x9F82: 0x6C13,
        0x9F83: 0x6C14,
        0x9F84: 0x6C1B,
        0x9F85: 0x6C24,
        0x9F86: 0x6C23,
        0x9F87: 0x6C5E,
        0x9F88: 0x6C55,
        0x9F89: 0x6C62,
        0x9F8A: 0x6C6A,
        0x9F8B: 0x6C82,
        0x9F8C: 0x6C8D,
        0x9F8D: 0x6C9A,
        0x9F8E: 0x6C81,
        0x9F8F: 0x6C9B,
        0x9F90: 0x6C7E,
        0x9F91: 0x6C68,
        0x9F92: 0x6C73,
        0x9F93: 0x6C92,
        0x9F94: 0x6C90,
        0x9F95: 0x6CC4,
        0x9F96: 0x6CF1,
        0x9F97: 0x6CD3,
        0x9F98: 0x6CBD,
        0x9F99: 0x6CD7,
        0x9F9A: 0x6CC5,
        0x9F9B: 0x6CDD,
        0x9F9C: 0x6CAE,
        0x9F9D: 0x6CB1,
        0x9F9E: 0x6CBE,
        0x9F9F: 0x6CBA,
        0x9FA0: 0x6CDB,
        0x9FA1: 0x6CEF,
        0x9FA2: 0x6CD9,
        0x9FA3: 0x6CEA,
        0x9FA4: 0x6D1F,
        0x9FA5: 0x884D,
        0x9FA6: 0x6D36,
        0x9FA7: 0x6D2B,
        0x9FA8: 0x6D3D,
        0x9FA9: 0x6D38,
        0x9FAA: 0x6D19,
        0x9FAB: 0x6D35,
        0x9FAC: 0x6D33,
        0x9FAD: 0x6D12,
        0x9FAE: 0x6D0C,
        0x9FAF: 0x6D63,
        0x9FB0: 0x6D93,
        0x9FB1: 0x6D64,
        0x9FB2: 0x6D5A,
        0x9FB3: 0x6D79,
        0x9FB4: 0x6D59,
        0x9FB5: 0x6D8E,
        0x9FB6: 0x6D95,
        0x9FB7: 0x6FE4,
        0x9FB8: 0x6D85,
        0x9FB9: 0x6DF9,
        0x9FBA: 0x6E15,
        0x9FBB: 0x6E0A,
        0x9FBC: 0x6DB5,
        0x9FBD: 0x6DC7,
        0x9FBE: 0x6DE6,
        0x9FBF: 0x6DB8,
        0x9FC0: 0x6DC6,
        0x9FC1: 0x6DEC,
        0x9FC2: 0x6DDE,
        0x9FC3: 0x6DCC,
        0x9FC4: 0x6DE8,
        0x9FC5: 0x6DD2,
        0x9FC6: 0x6DC5,
        0x9FC7: 0x6DFA,
        0x9FC8: 0x6DD9,
        0x9FC9: 0x6DE4,
        0x9FCA: 0x6DD5,
        0x9FCB: 0x6DEA,
        0x9FCC: 0x6DEE,
        0x9FCD: 0x6E2D,
        0x9FCE: 0x6E6E,
        0x9FCF: 0x6E2E,
        0x9FD0: 0x6E19,
        0x9FD1: 0x6E72,
        0x9FD2: 0x6E5F,
        0x9FD3: 0x6E3E,
        0x9FD4: 0x6E23,
        0x9FD5: 0x6E6B,
        0x9FD6: 0x6E2B,
        0x9FD7: 0x6E76,
        0x9FD8: 0x6E4D,
        0x9FD9: 0x6E1F,
        0x9FDA: 0x6E43,
        0x9FDB: 0x6E3A,
        0x9FDC: 0x6E4E,
        0x9FDD: 0x6E24,
        0x9FDE: 0x6EFF,
        0x9FDF: 0x6E1D,
        0x9FE0: 0x6E38,
        0x9FE1: 0x6E82,
        0x9FE2: 0x6EAA,
        0x9FE3: 0x6E98,
        0x9FE4: 0x6EC9,
        0x9FE5: 0x6EB7,
        0x9FE6: 0x6ED3,
        0x9FE7: 0x6EBD,
        0x9FE8: 0x6EAF,
        0x9FE9: 0x6EC4,
        0x9FEA: 0x6EB2,
        0x9FEB: 0x6ED4,
        0x9FEC: 0x6ED5,
        0x9FED: 0x6E8F,
        0x9FEE: 0x6EA5,
        0x9FEF: 0x6EC2,
        0x9FF0: 0x6E9F,
        0x9FF1: 0x6F41,
        0x9FF2: 0x6F11,
        0x9FF3: 0x704C,
        0x9FF4: 0x6EEC,
        0x9FF5: 0x6EF8,
        0x9FF6: 0x6EFE,
        0x9FF7: 0x6F3F,
        0x9FF8: 0x6EF2,
        0x9FF9: 0x6F31,
        0x9FFA: 0x6EEF,
        0x9FFB: 0x6F32,
        0x9FFC: 0x6ECC,
        0xA1: 0xFF61,
        0xA2: 0xFF62,
        0xA3: 0xFF63,
        0xA4: 0xFF64,
        0xA5: 0xFF65,
        0xA6: 0xFF66,
        0xA7: 0xFF67,
        0xA8: 0xFF68,
        0xA9: 0xFF69,
        0xAA: 0xFF6A,
        0xAB: 0xFF6B,
        0xAC: 0xFF6C,
        0xAD: 0xFF6D,
        0xAE: 0xFF6E,
        0xAF: 0xFF6F,
        0xB0: 0xFF70,
        0xB1: 0xFF71,
        0xB2: 0xFF72,
        0xB3: 0xFF73,
        0xB4: 0xFF74,
        0xB5: 0xFF75,
        0xB6: 0xFF76,
        0xB7: 0xFF77,
        0xB8: 0xFF78,
        0xB9: 0xFF79,
        0xBA: 0xFF7A,
        0xBB: 0xFF7B,
        0xBC: 0xFF7C,
        0xBD: 0xFF7D,
        0xBE: 0xFF7E,
        0xBF: 0xFF7F,
        0xC0: 0xFF80,
        0xC1: 0xFF81,
        0xC2: 0xFF82,
        0xC3: 0xFF83,
        0xC4: 0xFF84,
        0xC5: 0xFF85,
        0xC6: 0xFF86,
        0xC7: 0xFF87,
        0xC8: 0xFF88,
        0xC9: 0xFF89,
        0xCA: 0xFF8A,
        0xCB: 0xFF8B,
        0xCC: 0xFF8C,
        0xCD: 0xFF8D,
        0xCE: 0xFF8E,
        0xCF: 0xFF8F,
        0xD0: 0xFF90,
        0xD1: 0xFF91,
        0xD2: 0xFF92,
        0xD3: 0xFF93,
        0xD4: 0xFF94,
        0xD5: 0xFF95,
        0xD6: 0xFF96,
        0xD7: 0xFF97,
        0xD8: 0xFF98,
        0xD9: 0xFF99,
        0xDA: 0xFF9A,
        0xDB: 0xFF9B,
        0xDC: 0xFF9C,
        0xDD: 0xFF9D,
        0xDE: 0xFF9E,
        0xDF: 0xFF9F,
        0xE040: 0x6F3E,
        0xE041: 0x6F13,
        0xE042: 0x6EF7,
        0xE043: 0x6F86,
        0xE044: 0x6F7A,
        0xE045: 0x6F78,
        0xE046: 0x6F81,
        0xE047: 0x6F80,
        0xE048: 0x6F6F,
        0xE049: 0x6F5B,
        0xE04A: 0x6FF3,
        0xE04B: 0x6F6D,
        0xE04C: 0x6F82,
        0xE04D: 0x6F7C,
        0xE04E: 0x6F58,
        0xE04F: 0x6F8E,
        0xE050: 0x6F91,
        0xE051: 0x6FC2,
        0xE052: 0x6F66,
        0xE053: 0x6FB3,
        0xE054: 0x6FA3,
        0xE055: 0x6FA1,
        0xE056: 0x6FA4,
        0xE057: 0x6FB9,
        0xE058: 0x6FC6,
        0xE059: 0x6FAA,
        0xE05A: 0x6FDF,
        0xE05B: 0x6FD5,
        0xE05C: 0x6FEC,
        0xE05D: 0x6FD4,
        0xE05E: 0x6FD8,
        0xE05F: 0x6FF1,
        0xE060: 0x6FEE,
        0xE061: 0x6FDB,
        0xE062: 0x7009,
        0xE063: 0x700B,
        0xE064: 0x6FFA,
        0xE065: 0x7011,
        0xE066: 0x7001,
        0xE067: 0x700F,
        0xE068: 0x6FFE,
        0xE069: 0x701B,
        0xE06A: 0x701A,
        0xE06B: 0x6F74,
        0xE06C: 0x701D,
        0xE06D: 0x7018,
        0xE06E: 0x701F,
        0xE06F: 0x7030,
        0xE070: 0x703E,
        0xE071: 0x7032,
        0xE072: 0x7051,
        0xE073: 0x7063,
        0xE074: 0x7099,
        0xE075: 0x7092,
        0xE076: 0x70AF,
        0xE077: 0x70F1,
        0xE078: 0x70AC,
        0xE079: 0x70B8,
        0xE07A: 0x70B3,
        0xE07B: 0x70AE,
        0xE07C: 0x70DF,
        0xE07D: 0x70CB,
        0xE07E: 0x70DD,
        0xE080: 0x70D9,
        0xE081: 0x7109,
        0xE082: 0x70FD,
        0xE083: 0x711C,
        0xE084: 0x7119,
        0xE085: 0x7165,
        0xE086: 0x7155,
        0xE087: 0x7188,
        0xE088: 0x7166,
        0xE089: 0x7162,
        0xE08A: 0x714C,
        0xE08B: 0x7156,
        0xE08C: 0x716C,
        0xE08D: 0x718F,
        0xE08E: 0x71FB,
        0xE08F: 0x7184,
        0xE090: 0x7195,
        0xE091: 0x71A8,
        0xE092: 0x71AC,
        0xE093: 0x71D7,
        0xE094: 0x71B9,
        0xE095: 0x71BE,
        0xE096: 0x71D2,
        0xE097: 0x71C9,
        0xE098: 0x71D4,
        0xE099: 0x71CE,
        0xE09A: 0x71E0,
        0xE09B: 0x71EC,
        0xE09C: 0x71E7,
        0xE09D: 0x71F5,
        0xE09E: 0x71FC,
        0xE09F: 0x71F9,
        0xE0A0: 0x71FF,
        0xE0A1: 0x720D,
        0xE0A2: 0x7210,
        0xE0A3: 0x721B,
        0xE0A4: 0x7228,
        0xE0A5: 0x722D,
        0xE0A6: 0x722C,
        0xE0A7: 0x7230,
        0xE0A8: 0x7232,
        0xE0A9: 0x723B,
        0xE0AA: 0x723C,
        0xE0AB: 0x723F,
        0xE0AC: 0x7240,
        0xE0AD: 0x7246,
        0xE0AE: 0x724B,
        0xE0AF: 0x7258,
        0xE0B0: 0x7274,
        0xE0B1: 0x727E,
        0xE0B2: 0x7282,
        0xE0B3: 0x7281,
        0xE0B4: 0x7287,
        0xE0B5: 0x7292,
        0xE0B6: 0x7296,
        0xE0B7: 0x72A2,
        0xE0B8: 0x72A7,
        0xE0B9: 0x72B9,
        0xE0BA: 0x72B2,
        0xE0BB: 0x72C3,
        0xE0BC: 0x72C6,
        0xE0BD: 0x72C4,
        0xE0BE: 0x72CE,
        0xE0BF: 0x72D2,
        0xE0C0: 0x72E2,
        0xE0C1: 0x72E0,
        0xE0C2: 0x72E1,
        0xE0C3: 0x72F9,
        0xE0C4: 0x72F7,
        0xE0C5: 0x500F,
        0xE0C6: 0x7317,
        0xE0C7: 0x730A,
        0xE0C8: 0x731C,
        0xE0C9: 0x7316,
        0xE0CA: 0x731D,
        0xE0CB: 0x7334,
        0xE0CC: 0x732F,
        0xE0CD: 0x7329,
        0xE0CE: 0x7325,
        0xE0CF: 0x733E,
        0xE0D0: 0x734E,
        0xE0D1: 0x734F,
        0xE0D2: 0x9ED8,
        0xE0D3: 0x7357,
        0xE0D4: 0x736A,
        0xE0D5: 0x7368,
        0xE0D6: 0x7370,
        0xE0D7: 0x7378,
        0xE0D8: 0x7375,
        0xE0D9: 0x737B,
        0xE0DA: 0x737A,
        0xE0DB: 0x73C8,
        0xE0DC: 0x73B3,
        0xE0DD: 0x73CE,
        0xE0DE: 0x73BB,
        0xE0DF: 0x73C0,
        0xE0E0: 0x73E5,
        0xE0E1: 0x73EE,
        0xE0E2: 0x73DE,
        0xE0E3: 0x74A2,
        0xE0E4: 0x7405,
        0xE0E5: 0x746F,
        0xE0E6: 0x7425,
        0xE0E7: 0x73F8,
        0xE0E8: 0x7432,
        0xE0E9: 0x743A,
        0xE0EA: 0x7455,
        0xE0EB: 0x743F,
        0xE0EC: 0x745F,
        0xE0ED: 0x7459,
        0xE0EE: 0x7441,
        0xE0EF: 0x745C,
        0xE0F0: 0x7469,
        0xE0F1: 0x7470,
        0xE0F2: 0x7463,
        0xE0F3: 0x746A,
        0xE0F4: 0x7476,
        0xE0F5: 0x747E,
        0xE0F6: 0x748B,
        0xE0F7: 0x749E,
        0xE0F8: 0x74A7,
        0xE0F9: 0x74CA,
        0xE0FA: 0x74CF,
        0xE0FB: 0x74D4,
        0xE0FC: 0x73F1,
        0xE140: 0x74E0,
        0xE141: 0x74E3,
        0xE142: 0x74E7,
        0xE143: 0x74E9,
        0xE144: 0x74EE,
        0xE145: 0x74F2,
        0xE146: 0x74F0,
        0xE147: 0x74F1,
        0xE148: 0x74F8,
        0xE149: 0x74F7,
        0xE14A: 0x7504,
        0xE14B: 0x7503,
        0xE14C: 0x7505,
        0xE14D: 0x750C,
        0xE14E: 0x750E,
        0xE14F: 0x750D,
        0xE150: 0x7515,
        0xE151: 0x7513,
        0xE152: 0x751E,
        0xE153: 0x7526,
        0xE154: 0x752C,
        0xE155: 0x753C,
        0xE156: 0x7544,
        0xE157: 0x754D,
        0xE158: 0x754A,
        0xE159: 0x7549,
        0xE15A: 0x755B,
        0xE15B: 0x7546,
        0xE15C: 0x755A,
        0xE15D: 0x7569,
        0xE15E: 0x7564,
        0xE15F: 0x7567,
        0xE160: 0x756B,
        0xE161: 0x756D,
        0xE162: 0x7578,
        0xE163: 0x7576,
        0xE164: 0x7586,
        0xE165: 0x7587,
        0xE166: 0x7574,
        0xE167: 0x758A,
        0xE168: 0x7589,
        0xE169: 0x7582,
        0xE16A: 0x7594,
        0xE16B: 0x759A,
        0xE16C: 0x759D,
        0xE16D: 0x75A5,
        0xE16E: 0x75A3,
        0xE16F: 0x75C2,
        0xE170: 0x75B3,
        0xE171: 0x75C3,
        0xE172: 0x75B5,
        0xE173: 0x75BD,
        0xE174: 0x75B8,
        0xE175: 0x75BC,
        0xE176: 0x75B1,
        0xE177: 0x75CD,
        0xE178: 0x75CA,
        0xE179: 0x75D2,
        0xE17A: 0x75D9,
        0xE17B: 0x75E3,
        0xE17C: 0x75DE,
        0xE17D: 0x75FE,
        0xE17E: 0x75FF,
        0xE180: 0x75FC,
        0xE181: 0x7601,
        0xE182: 0x75F0,
        0xE183: 0x75FA,
        0xE184: 0x75F2,
        0xE185: 0x75F3,
        0xE186: 0x760B,
        0xE187: 0x760D,
        0xE188: 0x7609,
        0xE189: 0x761F,
        0xE18A: 0x7627,
        0xE18B: 0x7620,
        0xE18C: 0x7621,
        0xE18D: 0x7622,
        0xE18E: 0x7624,
        0xE18F: 0x7634,
        0xE190: 0x7630,
        0xE191: 0x763B,
        0xE192: 0x7647,
        0xE193: 0x7648,
        0xE194: 0x7646,
        0xE195: 0x765C,
        0xE196: 0x7658,
        0xE197: 0x7661,
        0xE198: 0x7662,
        0xE199: 0x7668,
        0xE19A: 0x7669,
        0xE19B: 0x766A,
        0xE19C: 0x7667,
        0xE19D: 0x766C,
        0xE19E: 0x7670,
        0xE19F: 0x7672,
        0xE1A0: 0x7676,
        0xE1A1: 0x7678,
        0xE1A2: 0x767C,
        0xE1A3: 0x7680,
        0xE1A4: 0x7683,
        0xE1A5: 0x7688,
        0xE1A6: 0x768B,
        0xE1A7: 0x768E,
        0xE1A8: 0x7696,
        0xE1A9: 0x7693,
        0xE1AA: 0x7699,
        0xE1AB: 0x769A,
        0xE1AC: 0x76B0,
        0xE1AD: 0x76B4,
        0xE1AE: 0x76B8,
        0xE1AF: 0x76B9,
        0xE1B0: 0x76BA,
        0xE1B1: 0x76C2,
        0xE1B2: 0x76CD,
        0xE1B3: 0x76D6,
        0xE1B4: 0x76D2,
        0xE1B5: 0x76DE,
        0xE1B6: 0x76E1,
        0xE1B7: 0x76E5,
        0xE1B8: 0x76E7,
        0xE1B9: 0x76EA,
        0xE1BA: 0x862F,
        0xE1BB: 0x76FB,
        0xE1BC: 0x7708,
        0xE1BD: 0x7707,
        0xE1BE: 0x7704,
        0xE1BF: 0x7729,
        0xE1C0: 0x7724,
        0xE1C1: 0x771E,
        0xE1C2: 0x7725,
        0xE1C3: 0x7726,
        0xE1C4: 0x771B,
        0xE1C5: 0x7737,
        0xE1C6: 0x7738,
        0xE1C7: 0x7747,
        0xE1C8: 0x775A,
        0xE1C9: 0x7768,
        0xE1CA: 0x776B,
        0xE1CB: 0x775B,
        0xE1CC: 0x7765,
        0xE1CD: 0x777F,
        0xE1CE: 0x777E,
        0xE1CF: 0x7779,
        0xE1D0: 0x778E,
        0xE1D1: 0x778B,
        0xE1D2: 0x7791,
        0xE1D3: 0x77A0,
        0xE1D4: 0x779E,
        0xE1D5: 0x77B0,
        0xE1D6: 0x77B6,
        0xE1D7: 0x77B9,
        0xE1D8: 0x77BF,
        0xE1D9: 0x77BC,
        0xE1DA: 0x77BD,
        0xE1DB: 0x77BB,
        0xE1DC: 0x77C7,
        0xE1DD: 0x77CD,
        0xE1DE: 0x77D7,
        0xE1DF: 0x77DA,
        0xE1E0: 0x77DC,
        0xE1E1: 0x77E3,
        0xE1E2: 0x77EE,
        0xE1E3: 0x77FC,
        0xE1E4: 0x780C,
        0xE1E5: 0x7812,
        0xE1E6: 0x7926,
        0xE1E7: 0x7820,
        0xE1E8: 0x792A,
        0xE1E9: 0x7845,
        0xE1EA: 0x788E,
        0xE1EB: 0x7874,
        0xE1EC: 0x7886,
        0xE1ED: 0x787C,
        0xE1EE: 0x789A,
        0xE1EF: 0x788C,
        0xE1F0: 0x78A3,
        0xE1F1: 0x78B5,
        0xE1F2: 0x78AA,
        0xE1F3: 0x78AF,
        0xE1F4: 0x78D1,
        0xE1F5: 0x78C6,
        0xE1F6: 0x78CB,
        0xE1F7: 0x78D4,
        0xE1F8: 0x78BE,
        0xE1F9: 0x78BC,
        0xE1FA: 0x78C5,
        0xE1FB: 0x78CA,
        0xE1FC: 0x78EC,
        0xE240: 0x78E7,
        0xE241: 0x78DA,
        0xE242: 0x78FD,
        0xE243: 0x78F4,
        0xE244: 0x7907,
        0xE245: 0x7912,
        0xE246: 0x7911,
        0xE247: 0x7919,
        0xE248: 0x792C,
        0xE249: 0x792B,
        0xE24A: 0x7940,
        0xE24B: 0x7960,
        0xE24C: 0x7957,
        0xE24D: 0x795F,
        0xE24E: 0x795A,
        0xE24F: 0x7955,
        0xE250: 0x7953,
        0xE251: 0x797A,
        0xE252: 0x797F,
        0xE253: 0x798A,
        0xE254: 0x799D,
        0xE255: 0x79A7,
        0xE256: 0x9F4B,
        0xE257: 0x79AA,
        0xE258: 0x79AE,
        0xE259: 0x79B3,
        0xE25A: 0x79B9,
        0xE25B: 0x79BA,
        0xE25C: 0x79C9,
        0xE25D: 0x79D5,
        0xE25E: 0x79E7,
        0xE25F: 0x79EC,
        0xE260: 0x79E1,
        0xE261: 0x79E3,
        0xE262: 0x7A08,
        0xE263: 0x7A0D,
        0xE264: 0x7A18,
        0xE265: 0x7A19,
        0xE266: 0x7A20,
        0xE267: 0x7A1F,
        0xE268: 0x7980,
        0xE269: 0x7A31,
        0xE26A: 0x7A3B,
        0xE26B: 0x7A3E,
        0xE26C: 0x7A37,
        0xE26D: 0x7A43,
        0xE26E: 0x7A57,
        0xE26F: 0x7A49,
        0xE270: 0x7A61,
        0xE271: 0x7A62,
        0xE272: 0x7A69,
        0xE273: 0x9F9D,
        0xE274: 0x7A70,
        0xE275: 0x7A79,
        0xE276: 0x7A7D,
        0xE277: 0x7A88,
        0xE278: 0x7A97,
        0xE279: 0x7A95,
        0xE27A: 0x7A98,
        0xE27B: 0x7A96,
        0xE27C: 0x7AA9,
        0xE27D: 0x7AC8,
        0xE27E: 0x7AB0,
        0xE280: 0x7AB6,
        0xE281: 0x7AC5,
        0xE282: 0x7AC4,
        0xE283: 0x7ABF,
        0xE284: 0x9083,
        0xE285: 0x7AC7,
        0xE286: 0x7ACA,
        0xE287: 0x7ACD,
        0xE288: 0x7ACF,
        0xE289: 0x7AD5,
        0xE28A: 0x7AD3,
        0xE28B: 0x7AD9,
        0xE28C: 0x7ADA,
        0xE28D: 0x7ADD,
        0xE28E: 0x7AE1,
        0xE28F: 0x7AE2,
        0xE290: 0x7AE6,
        0xE291: 0x7AED,
        0xE292: 0x7AF0,
        0xE293: 0x7B02,
        0xE294: 0x7B0F,
        0xE295: 0x7B0A,
        0xE296: 0x7B06,
        0xE297: 0x7B33,
        0xE298: 0x7B18,
        0xE299: 0x7B19,
        0xE29A: 0x7B1E,
        0xE29B: 0x7B35,
        0xE29C: 0x7B28,
        0xE29D: 0x7B36,
        0xE29E: 0x7B50,
        0xE29F: 0x7B7A,
        0xE2A0: 0x7B04,
        0xE2A1: 0x7B4D,
        0xE2A2: 0x7B0B,
        0xE2A3: 0x7B4C,
        0xE2A4: 0x7B45,
        0xE2A5: 0x7B75,
        0xE2A6: 0x7B65,
        0xE2A7: 0x7B74,
        0xE2A8: 0x7B67,
        0xE2A9: 0x7B70,
        0xE2AA: 0x7B71,
        0xE2AB: 0x7B6C,
        0xE2AC: 0x7B6E,
        0xE2AD: 0x7B9D,
        0xE2AE: 0x7B98,
        0xE2AF: 0x7B9F,
        0xE2B0: 0x7B8D,
        0xE2B1: 0x7B9C,
        0xE2B2: 0x7B9A,
        0xE2B3: 0x7B8B,
        0xE2B4: 0x7B92,
        0xE2B5: 0x7B8F,
        0xE2B6: 0x7B5D,
        0xE2B7: 0x7B99,
        0xE2B8: 0x7BCB,
        0xE2B9: 0x7BC1,
        0xE2BA: 0x7BCC,
        0xE2BB: 0x7BCF,
        0xE2BC: 0x7BB4,
        0xE2BD: 0x7BC6,
        0xE2BE: 0x7BDD,
        0xE2BF: 0x7BE9,
        0xE2C0: 0x7C11,
        0xE2C1: 0x7C14,
        0xE2C2: 0x7BE6,
        0xE2C3: 0x7BE5,
        0xE2C4: 0x7C60,
        0xE2C5: 0x7C00,
        0xE2C6: 0x7C07,
        0xE2C7: 0x7C13,
        0xE2C8: 0x7BF3,
        0xE2C9: 0x7BF7,
        0xE2CA: 0x7C17,
        0xE2CB: 0x7C0D,
        0xE2CC: 0x7BF6,
        0xE2CD: 0x7C23,
        0xE2CE: 0x7C27,
        0xE2CF: 0x7C2A,
        0xE2D0: 0x7C1F,
        0xE2D1: 0x7C37,
        0xE2D2: 0x7C2B,
        0xE2D3: 0x7C3D,
        0xE2D4: 0x7C4C,
        0xE2D5: 0x7C43,
        0xE2D6: 0x7C54,
        0xE2D7: 0x7C4F,
        0xE2D8: 0x7C40,
        0xE2D9: 0x7C50,
        0xE2DA: 0x7C58,
        0xE2DB: 0x7C5F,
        0xE2DC: 0x7C64,
        0xE2DD: 0x7C56,
        0xE2DE: 0x7C65,
        0xE2DF: 0x7C6C,
        0xE2E0: 0x7C75,
        0xE2E1: 0x7C83,
        0xE2E2: 0x7C90,
        0xE2E3: 0x7CA4,
        0xE2E4: 0x7CAD,
        0xE2E5: 0x7CA2,
        0xE2E6: 0x7CAB,
        0xE2E7: 0x7CA1,
        0xE2E8: 0x7CA8,
        0xE2E9: 0x7CB3,
        0xE2EA: 0x7CB2,
        0xE2EB: 0x7CB1,
        0xE2EC: 0x7CAE,
        0xE2ED: 0x7CB9,
        0xE2EE: 0x7CBD,
        0xE2EF: 0x7CC0,
        0xE2F0: 0x7CC5,
        0xE2F1: 0x7CC2,
        0xE2F2: 0x7CD8,
        0xE2F3: 0x7CD2,
        0xE2F4: 0x7CDC,
        0xE2F5: 0x7CE2,
        0xE2F6: 0x9B3B,
        0xE2F7: 0x7CEF,
        0xE2F8: 0x7CF2,
        0xE2F9: 0x7CF4,
        0xE2FA: 0x7CF6,
        0xE2FB: 0x7CFA,
        0xE2FC: 0x7D06,
        0xE340: 0x7D02,
        0xE341: 0x7D1C,
        0xE342: 0x7D15,
        0xE343: 0x7D0A,
        0xE344: 0x7D45,
        0xE345: 0x7D4B,
        0xE346: 0x7D2E,
        0xE347: 0x7D32,
        0xE348: 0x7D3F,
        0xE349: 0x7D35,
        0xE34A: 0x7D46,
        0xE34B: 0x7D73,
        0xE34C: 0x7D56,
        0xE34D: 0x7D4E,
        0xE34E: 0x7D72,
        0xE34F: 0x7D68,
        0xE350: 0x7D6E,
        0xE351: 0x7D4F,
        0xE352: 0x7D63,
        0xE353: 0x7D93,
        0xE354: 0x7D89,
        0xE355: 0x7D5B,
        0xE356: 0x7D8F,
        0xE357: 0x7D7D,
        0xE358: 0x7D9B,
        0xE359: 0x7DBA,
        0xE35A: 0x7DAE,
        0xE35B: 0x7DA3,
        0xE35C: 0x7DB5,
        0xE35D: 0x7DC7,
        0xE35E: 0x7DBD,
        0xE35F: 0x7DAB,
        0xE360: 0x7E3D,
        0xE361: 0x7DA2,
        0xE362: 0x7DAF,
        0xE363: 0x7DDC,
        0xE364: 0x7DB8,
        0xE365: 0x7D9F,
        0xE366: 0x7DB0,
        0xE367: 0x7DD8,
        0xE368: 0x7DDD,
        0xE369: 0x7DE4,
        0xE36A: 0x7DDE,
        0xE36B: 0x7DFB,
        0xE36C: 0x7DF2,
        0xE36D: 0x7DE1,
        0xE36E: 0x7E05,
        0xE36F: 0x7E0A,
        0xE370: 0x7E23,
        0xE371: 0x7E21,
        0xE372: 0x7E12,
        0xE373: 0x7E31,
        0xE374: 0x7E1F,
        0xE375: 0x7E09,
        0xE376: 0x7E0B,
        0xE377: 0x7E22,
        0xE378: 0x7E46,
        0xE379: 0x7E66,
        0xE37A: 0x7E3B,
        0xE37B: 0x7E35,
        0xE37C: 0x7E39,
        0xE37D: 0x7E43,
        0xE37E: 0x7E37,
        0xE380: 0x7E32,
        0xE381: 0x7E3A,
        0xE382: 0x7E67,
        0xE383: 0x7E5D,
        0xE384: 0x7E56,
        0xE385: 0x7E5E,
        0xE386: 0x7E59,
        0xE387: 0x7E5A,
        0xE388: 0x7E79,
        0xE389: 0x7E6A,
        0xE38A: 0x7E69,
        0xE38B: 0x7E7C,
        0xE38C: 0x7E7B,
        0xE38D: 0x7E83,
        0xE38E: 0x7DD5,
        0xE38F: 0x7E7D,
        0xE390: 0x8FAE,
        0xE391: 0x7E7F,
        0xE392: 0x7E88,
        0xE393: 0x7E89,
        0xE394: 0x7E8C,
        0xE395: 0x7E92,
        0xE396: 0x7E90,
        0xE397: 0x7E93,
        0xE398: 0x7E94,
        0xE399: 0x7E96,
        0xE39A: 0x7E8E,
        0xE39B: 0x7E9B,
        0xE39C: 0x7E9C,
        0xE39D: 0x7F38,
        0xE39E: 0x7F3A,
        0xE39F: 0x7F45,
        0xE3A0: 0x7F4C,
        0xE3A1: 0x7F4D,
        0xE3A2: 0x7F4E,
        0xE3A3: 0x7F50,
        0xE3A4: 0x7F51,
        0xE3A5: 0x7F55,
        0xE3A6: 0x7F54,
        0xE3A7: 0x7F58,
        0xE3A8: 0x7F5F,
        0xE3A9: 0x7F60,
        0xE3AA: 0x7F68,
        0xE3AB: 0x7F69,
        0xE3AC: 0x7F67,
        0xE3AD: 0x7F78,
        0xE3AE: 0x7F82,
        0xE3AF: 0x7F86,
        0xE3B0: 0x7F83,
        0xE3B1: 0x7F88,
        0xE3B2: 0x7F87,
        0xE3B3: 0x7F8C,
        0xE3B4: 0x7F94,
        0xE3B5: 0x7F9E,
        0xE3B6: 0x7F9D,
        0xE3B7: 0x7F9A,
        0xE3B8: 0x7FA3,
        0xE3B9: 0x7FAF,
        0xE3BA: 0x7FB2,
        0xE3BB: 0x7FB9,
        0xE3BC: 0x7FAE,
        0xE3BD: 0x7FB6,
        0xE3BE: 0x7FB8,
        0xE3BF: 0x8B71,
        0xE3C0: 0x7FC5,
        0xE3C1: 0x7FC6,
        0xE3C2: 0x7FCA,
        0xE3C3: 0x7FD5,
        0xE3C4: 0x7FD4,
        0xE3C5: 0x7FE1,
        0xE3C6: 0x7FE6,
        0xE3C7: 0x7FE9,
        0xE3C8: 0x7FF3,
        0xE3C9: 0x7FF9,
        0xE3CA: 0x98DC,
        0xE3CB: 0x8006,
        0xE3CC: 0x8004,
        0xE3CD: 0x800B,
        0xE3CE: 0x8012,
        0xE3CF: 0x8018,
        0xE3D0: 0x8019,
        0xE3D1: 0x801C,
        0xE3D2: 0x8021,
        0xE3D3: 0x8028,
        0xE3D4: 0x803F,
        0xE3D5: 0x803B,
        0xE3D6: 0x804A,
        0xE3D7: 0x8046,
        0xE3D8: 0x8052,
        0xE3D9: 0x8058,
        0xE3DA: 0x805A,
        0xE3DB: 0x805F,
        0xE3DC: 0x8062,
        0xE3DD: 0x8068,
        0xE3DE: 0x8073,
        0xE3DF: 0x8072,
        0xE3E0: 0x8070,
        0xE3E1: 0x8076,
        0xE3E2: 0x8079,
        0xE3E3: 0x807D,
        0xE3E4: 0x807F,
        0xE3E5: 0x8084,
        0xE3E6: 0x8086,
        0xE3E7: 0x8085,
        0xE3E8: 0x809B,
        0xE3E9: 0x8093,
        0xE3EA: 0x809A,
        0xE3EB: 0x80AD,
        0xE3EC: 0x5190,
        0xE3ED: 0x80AC,
        0xE3EE: 0x80DB,
        0xE3EF: 0x80E5,
        0xE3F0: 0x80D9,
        0xE3F1: 0x80DD,
        0xE3F2: 0x80C4,
        0xE3F3: 0x80DA,
        0xE3F4: 0x80D6,
        0xE3F5: 0x8109,
        0xE3F6: 0x80EF,
        0xE3F7: 0x80F1,
        0xE3F8: 0x811B,
        0xE3F9: 0x8129,
        0xE3FA: 0x8123,
        0xE3FB: 0x812F,
        0xE3FC: 0x814B,
        0xE440: 0x968B,
        0xE441: 0x8146,
        0xE442: 0x813E,
        0xE443: 0x8153,
        0xE444: 0x8151,
        0xE445: 0x80FC,
        0xE446: 0x8171,
        0xE447: 0x816E,
        0xE448: 0x8165,
        0xE449: 0x8166,
        0xE44A: 0x8174,
        0xE44B: 0x8183,
        0xE44C: 0x8188,
        0xE44D: 0x818A,
        0xE44E: 0x8180,
        0xE44F: 0x8182,
        0xE450: 0x81A0,
        0xE451: 0x8195,
        0xE452: 0x81A4,
        0xE453: 0x81A3,
        0xE454: 0x815F,
        0xE455: 0x8193,
        0xE456: 0x81A9,
        0xE457: 0x81B0,
        0xE458: 0x81B5,
        0xE459: 0x81BE,
        0xE45A: 0x81B8,
        0xE45B: 0x81BD,
        0xE45C: 0x81C0,
        0xE45D: 0x81C2,
        0xE45E: 0x81BA,
        0xE45F: 0x81C9,
        0xE460: 0x81CD,
        0xE461: 0x81D1,
        0xE462: 0x81D9,
        0xE463: 0x81D8,
        0xE464: 0x81C8,
        0xE465: 0x81DA,
        0xE466: 0x81DF,
        0xE467: 0x81E0,
        0xE468: 0x81E7,
        0xE469: 0x81FA,
        0xE46A: 0x81FB,
        0xE46B: 0x81FE,
        0xE46C: 0x8201,
        0xE46D: 0x8202,
        0xE46E: 0x8205,
        0xE46F: 0x8207,
        0xE470: 0x820A,
        0xE471: 0x820D,
        0xE472: 0x8210,
        0xE473: 0x8216,
        0xE474: 0x8229,
        0xE475: 0x822B,
        0xE476: 0x8238,
        0xE477: 0x8233,
        0xE478: 0x8240,
        0xE479: 0x8259,
        0xE47A: 0x8258,
        0xE47B: 0x825D,
        0xE47C: 0x825A,
        0xE47D: 0x825F,
        0xE47E: 0x8264,
        0xE480: 0x8262,
        0xE481: 0x8268,
        0xE482: 0x826A,
        0xE483: 0x826B,
        0xE484: 0x822E,
        0xE485: 0x8271,
        0xE486: 0x8277,
        0xE487: 0x8278,
        0xE488: 0x827E,
        0xE489: 0x828D,
        0xE48A: 0x8292,
        0xE48B: 0x82AB,
        0xE48C: 0x829F,
        0xE48D: 0x82BB,
        0xE48E: 0x82AC,
        0xE48F: 0x82E1,
        0xE490: 0x82E3,
        0xE491: 0x82DF,
        0xE492: 0x82D2,
        0xE493: 0x82F4,
        0xE494: 0x82F3,
        0xE495: 0x82FA,
        0xE496: 0x8393,
        0xE497: 0x8303,
        0xE498: 0x82FB,
        0xE499: 0x82F9,
        0xE49A: 0x82DE,
        0xE49B: 0x8306,
        0xE49C: 0x82DC,
        0xE49D: 0x8309,
        0xE49E: 0x82D9,
        0xE49F: 0x8335,
        0xE4A0: 0x8334,
        0xE4A1: 0x8316,
        0xE4A2: 0x8332,
        0xE4A3: 0x8331,
        0xE4A4: 0x8340,
        0xE4A5: 0x8339,
        0xE4A6: 0x8350,
        0xE4A7: 0x8345,
        0xE4A8: 0x832F,
        0xE4A9: 0x832B,
        0xE4AA: 0x8317,
        0xE4AB: 0x8318,
        0xE4AC: 0x8385,
        0xE4AD: 0x839A,
        0xE4AE: 0x83AA,
        0xE4AF: 0x839F,
        0xE4B0: 0x83A2,
        0xE4B1: 0x8396,
        0xE4B2: 0x8323,
        0xE4B3: 0x838E,
        0xE4B4: 0x8387,
        0xE4B5: 0x838A,
        0xE4B6: 0x837C,
        0xE4B7: 0x83B5,
        0xE4B8: 0x8373,
        0xE4B9: 0x8375,
        0xE4BA: 0x83A0,
        0xE4BB: 0x8389,
        0xE4BC: 0x83A8,
        0xE4BD: 0x83F4,
        0xE4BE: 0x8413,
        0xE4BF: 0x83EB,
        0xE4C0: 0x83CE,
        0xE4C1: 0x83FD,
        0xE4C2: 0x8403,
        0xE4C3: 0x83D8,
        0xE4C4: 0x840B,
        0xE4C5: 0x83C1,
        0xE4C6: 0x83F7,
        0xE4C7: 0x8407,
        0xE4C8: 0x83E0,
        0xE4C9: 0x83F2,
        0xE4CA: 0x840D,
        0xE4CB: 0x8422,
        0xE4CC: 0x8420,
        0xE4CD: 0x83BD,
        0xE4CE: 0x8438,
        0xE4CF: 0x8506,
        0xE4D0: 0x83FB,
        0xE4D1: 0x846D,
        0xE4D2: 0x842A,
        0xE4D3: 0x843C,
        0xE4D4: 0x855A,
        0xE4D5: 0x8484,
        0xE4D6: 0x8477,
        0xE4D7: 0x846B,
        0xE4D8: 0x84AD,
        0xE4D9: 0x846E,
        0xE4DA: 0x8482,
        0xE4DB: 0x8469,
        0xE4DC: 0x8446,
        0xE4DD: 0x842C,
        0xE4DE: 0x846F,
        0xE4DF: 0x8479,
        0xE4E0: 0x8435,
        0xE4E1: 0x84CA,
        0xE4E2: 0x8462,
        0xE4E3: 0x84B9,
        0xE4E4: 0x84BF,
        0xE4E5: 0x849F,
        0xE4E6: 0x84D9,
        0xE4E7: 0x84CD,
        0xE4E8: 0x84BB,
        0xE4E9: 0x84DA,
        0xE4EA: 0x84D0,
        0xE4EB: 0x84C1,
        0xE4EC: 0x84C6,
        0xE4ED: 0x84D6,
        0xE4EE: 0x84A1,
        0xE4EF: 0x8521,
        0xE4F0: 0x84FF,
        0xE4F1: 0x84F4,
        0xE4F2: 0x8517,
        0xE4F3: 0x8518,
        0xE4F4: 0x852C,
        0xE4F5: 0x851F,
        0xE4F6: 0x8515,
        0xE4F7: 0x8514,
        0xE4F8: 0x84FC,
        0xE4F9: 0x8540,
        0xE4FA: 0x8563,
        0xE4FB: 0x8558,
        0xE4FC: 0x8548,
        0xE540: 0x8541,
        0xE541: 0x8602,
        0xE542: 0x854B,
        0xE543: 0x8555,
        0xE544: 0x8580,
        0xE545: 0x85A4,
        0xE546: 0x8588,
        0xE547: 0x8591,
        0xE548: 0x858A,
        0xE549: 0x85A8,
        0xE54A: 0x856D,
        0xE54B: 0x8594,
        0xE54C: 0x859B,
        0xE54D: 0x85EA,
        0xE54E: 0x8587,
        0xE54F: 0x859C,
        0xE550: 0x8577,
        0xE551: 0x857E,
        0xE552: 0x8590,
        0xE553: 0x85C9,
        0xE554: 0x85BA,
        0xE555: 0x85CF,
        0xE556: 0x85B9,
        0xE557: 0x85D0,
        0xE558: 0x85D5,
        0xE559: 0x85DD,
        0xE55A: 0x85E5,
        0xE55B: 0x85DC,
        0xE55C: 0x85F9,
        0xE55D: 0x860A,
        0xE55E: 0x8613,
        0xE55F: 0x860B,
        0xE560: 0x85FE,
        0xE561: 0x85FA,
        0xE562: 0x8606,
        0xE563: 0x8622,
        0xE564: 0x861A,
        0xE565: 0x8630,
        0xE566: 0x863F,
        0xE567: 0x864D,
        0xE568: 0x4E55,
        0xE569: 0x8654,
        0xE56A: 0x865F,
        0xE56B: 0x8667,
        0xE56C: 0x8671,
        0xE56D: 0x8693,
        0xE56E: 0x86A3,
        0xE56F: 0x86A9,
        0xE570: 0x86AA,
        0xE571: 0x868B,
        0xE572: 0x868C,
        0xE573: 0x86B6,
        0xE574: 0x86AF,
        0xE575: 0x86C4,
        0xE576: 0x86C6,
        0xE577: 0x86B0,
        0xE578: 0x86C9,
        0xE579: 0x8823,
        0xE57A: 0x86AB,
        0xE57B: 0x86D4,
        0xE57C: 0x86DE,
        0xE57D: 0x86E9,
        0xE57E: 0x86EC,
        0xE580: 0x86DF,
        0xE581: 0x86DB,
        0xE582: 0x86EF,
        0xE583: 0x8712,
        0xE584: 0x8706,
        0xE585: 0x8708,
        0xE586: 0x8700,
        0xE587: 0x8703,
        0xE588: 0x86FB,
        0xE589: 0x8711,
        0xE58A: 0x8709,
        0xE58B: 0x870D,
        0xE58C: 0x86F9,
        0xE58D: 0x870A,
        0xE58E: 0x8734,
        0xE58F: 0x873F,
        0xE590: 0x8737,
        0xE591: 0x873B,
        0xE592: 0x8725,
        0xE593: 0x8729,
        0xE594: 0x871A,
        0xE595: 0x8760,
        0xE596: 0x875F,
        0xE597: 0x8778,
        0xE598: 0x874C,
        0xE599: 0x874E,
        0xE59A: 0x8774,
        0xE59B: 0x8757,
        0xE59C: 0x8768,
        0xE59D: 0x876E,
        0xE59E: 0x8759,
        0xE59F: 0x8753,
        0xE5A0: 0x8763,
        0xE5A1: 0x876A,
        0xE5A2: 0x8805,
        0xE5A3: 0x87A2,
        0xE5A4: 0x879F,
        0xE5A5: 0x8782,
        0xE5A6: 0x87AF,
        0xE5A7: 0x87CB,
        0xE5A8: 0x87BD,
        0xE5A9: 0x87C0,
        0xE5AA: 0x87D0,
        0xE5AB: 0x96D6,
        0xE5AC: 0x87AB,
        0xE5AD: 0x87C4,
        0xE5AE: 0x87B3,
        0xE5AF: 0x87C7,
        0xE5B0: 0x87C6,
        0xE5B1: 0x87BB,
        0xE5B2: 0x87EF,
        0xE5B3: 0x87F2,
        0xE5B4: 0x87E0,
        0xE5B5: 0x880F,
        0xE5B6: 0x880D,
        0xE5B7: 0x87FE,
        0xE5B8: 0x87F6,
        0xE5B9: 0x87F7,
        0xE5BA: 0x880E,
        0xE5BB: 0x87D2,
        0xE5BC: 0x8811,
        0xE5BD: 0x8816,
        0xE5BE: 0x8815,
        0xE5BF: 0x8822,
        0xE5C0: 0x8821,
        0xE5C1: 0x8831,
        0xE5C2: 0x8836,
        0xE5C3: 0x8839,
        0xE5C4: 0x8827,
        0xE5C5: 0x883B,
        0xE5C6: 0x8844,
        0xE5C7: 0x8842,
        0xE5C8: 0x8852,
        0xE5C9: 0x8859,
        0xE5CA: 0x885E,
        0xE5CB: 0x8862,
        0xE5CC: 0x886B,
        0xE5CD: 0x8881,
        0xE5CE: 0x887E,
        0xE5CF: 0x889E,
        0xE5D0: 0x8875,
        0xE5D1: 0x887D,
        0xE5D2: 0x88B5,
        0xE5D3: 0x8872,
        0xE5D4: 0x8882,
        0xE5D5: 0x8897,
        0xE5D6: 0x8892,
        0xE5D7: 0x88AE,
        0xE5D8: 0x8899,
        0xE5D9: 0x88A2,
        0xE5DA: 0x888D,
        0xE5DB: 0x88A4,
        0xE5DC: 0x88B0,
        0xE5DD: 0x88BF,
        0xE5DE: 0x88B1,
        0xE5DF: 0x88C3,
        0xE5E0: 0x88C4,
        0xE5E1: 0x88D4,
        0xE5E2: 0x88D8,
        0xE5E3: 0x88D9,
        0xE5E4: 0x88DD,
        0xE5E5: 0x88F9,
        0xE5E6: 0x8902,
        0xE5E7: 0x88FC,
        0xE5E8: 0x88F4,
        0xE5E9: 0x88E8,
        0xE5EA: 0x88F2,
        0xE5EB: 0x8904,
        0xE5EC: 0x890C,
        0xE5ED: 0x890A,
        0xE5EE: 0x8913,
        0xE5EF: 0x8943,
        0xE5F0: 0x891E,
        0xE5F1: 0x8925,
        0xE5F2: 0x892A,
        0xE5F3: 0x892B,
        0xE5F4: 0x8941,
        0xE5F5: 0x8944,
        0xE5F6: 0x893B,
        0xE5F7: 0x8936,
        0xE5F8: 0x8938,
        0xE5F9: 0x894C,
        0xE5FA: 0x891D,
        0xE5FB: 0x8960,
        0xE5FC: 0x895E,
        0xE640: 0x8966,
        0xE641: 0x8964,
        0xE642: 0x896D,
        0xE643: 0x896A,
        0xE644: 0x896F,
        0xE645: 0x8974,
        0xE646: 0x8977,
        0xE647: 0x897E,
        0xE648: 0x8983,
        0xE649: 0x8988,
        0xE64A: 0x898A,
        0xE64B: 0x8993,
        0xE64C: 0x8998,
        0xE64D: 0x89A1,
        0xE64E: 0x89A9,
        0xE64F: 0x89A6,
        0xE650: 0x89AC,
        0xE651: 0x89AF,
        0xE652: 0x89B2,
        0xE653: 0x89BA,
        0xE654: 0x89BD,
        0xE655: 0x89BF,
        0xE656: 0x89C0,
        0xE657: 0x89DA,
        0xE658: 0x89DC,
        0xE659: 0x89DD,
        0xE65A: 0x89E7,
        0xE65B: 0x89F4,
        0xE65C: 0x89F8,
        0xE65D: 0x8A03,
        0xE65E: 0x8A16,
        0xE65F: 0x8A10,
        0xE660: 0x8A0C,
        0xE661: 0x8A1B,
        0xE662: 0x8A1D,
        0xE663: 0x8A25,
        0xE664: 0x8A36,
        0xE665: 0x8A41,
        0xE666: 0x8A5B,
        0xE667: 0x8A52,
        0xE668: 0x8A46,
        0xE669: 0x8A48,
        0xE66A: 0x8A7C,
        0xE66B: 0x8A6D,
        0xE66C: 0x8A6C,
        0xE66D: 0x8A62,
        0xE66E: 0x8A85,
        0xE66F: 0x8A82,
        0xE670: 0x8A84,
        0xE671: 0x8AA8,
        0xE672: 0x8AA1,
        0xE673: 0x8A91,
        0xE674: 0x8AA5,
        0xE675: 0x8AA6,
        0xE676: 0x8A9A,
        0xE677: 0x8AA3,
        0xE678: 0x8AC4,
        0xE679: 0x8ACD,
        0xE67A: 0x8AC2,
        0xE67B: 0x8ADA,
        0xE67C: 0x8AEB,
        0xE67D: 0x8AF3,
        0xE67E: 0x8AE7,
        0xE680: 0x8AE4,
        0xE681: 0x8AF1,
        0xE682: 0x8B14,
        0xE683: 0x8AE0,
        0xE684: 0x8AE2,
        0xE685: 0x8AF7,
        0xE686: 0x8ADE,
        0xE687: 0x8ADB,
        0xE688: 0x8B0C,
        0xE689: 0x8B07,
        0xE68A: 0x8B1A,
        0xE68B: 0x8AE1,
        0xE68C: 0x8B16,
        0xE68D: 0x8B10,
        0xE68E: 0x8B17,
        0xE68F: 0x8B20,
        0xE690: 0x8B33,
        0xE691: 0x97AB,
        0xE692: 0x8B26,
        0xE693: 0x8B2B,
        0xE694: 0x8B3E,
        0xE695: 0x8B28,
        0xE696: 0x8B41,
        0xE697: 0x8B4C,
        0xE698: 0x8B4F,
        0xE699: 0x8B4E,
        0xE69A: 0x8B49,
        0xE69B: 0x8B56,
        0xE69C: 0x8B5B,
        0xE69D: 0x8B5A,
        0xE69E: 0x8B6B,
        0xE69F: 0x8B5F,
        0xE6A0: 0x8B6C,
        0xE6A1: 0x8B6F,
        0xE6A2: 0x8B74,
        0xE6A3: 0x8B7D,
        0xE6A4: 0x8B80,
        0xE6A5: 0x8B8C,
        0xE6A6: 0x8B8E,
        0xE6A7: 0x8B92,
        0xE6A8: 0x8B93,
        0xE6A9: 0x8B96,
        0xE6AA: 0x8B99,
        0xE6AB: 0x8B9A,
        0xE6AC: 0x8C3A,
        0xE6AD: 0x8C41,
        0xE6AE: 0x8C3F,
        0xE6AF: 0x8C48,
        0xE6B0: 0x8C4C,
        0xE6B1: 0x8C4E,
        0xE6B2: 0x8C50,
        0xE6B3: 0x8C55,
        0xE6B4: 0x8C62,
        0xE6B5: 0x8C6C,
        0xE6B6: 0x8C78,
        0xE6B7: 0x8C7A,
        0xE6B8: 0x8C82,
        0xE6B9: 0x8C89,
        0xE6BA: 0x8C85,
        0xE6BB: 0x8C8A,
        0xE6BC: 0x8C8D,
        0xE6BD: 0x8C8E,
        0xE6BE: 0x8C94,
        0xE6BF: 0x8C7C,
        0xE6C0: 0x8C98,
        0xE6C1: 0x621D,
        0xE6C2: 0x8CAD,
        0xE6C3: 0x8CAA,
        0xE6C4: 0x8CBD,
        0xE6C5: 0x8CB2,
        0xE6C6: 0x8CB3,
        0xE6C7: 0x8CAE,
        0xE6C8: 0x8CB6,
        0xE6C9: 0x8CC8,
        0xE6CA: 0x8CC1,
        0xE6CB: 0x8CE4,
        0xE6CC: 0x8CE3,
        0xE6CD: 0x8CDA,
        0xE6CE: 0x8CFD,
        0xE6CF: 0x8CFA,
        0xE6D0: 0x8CFB,
        0xE6D1: 0x8D04,
        0xE6D2: 0x8D05,
        0xE6D3: 0x8D0A,
        0xE6D4: 0x8D07,
        0xE6D5: 0x8D0F,
        0xE6D6: 0x8D0D,
        0xE6D7: 0x8D10,
        0xE6D8: 0x9F4E,
        0xE6D9: 0x8D13,
        0xE6DA: 0x8CCD,
        0xE6DB: 0x8D14,
        0xE6DC: 0x8D16,
        0xE6DD: 0x8D67,
        0xE6DE: 0x8D6D,
        0xE6DF: 0x8D71,
        0xE6E0: 0x8D73,
        0xE6E1: 0x8D81,
        0xE6E2: 0x8D99,
        0xE6E3: 0x8DC2,
        0xE6E4: 0x8DBE,
        0xE6E5: 0x8DBA,
        0xE6E6: 0x8DCF,
        0xE6E7: 0x8DDA,
        0xE6E8: 0x8DD6,
        0xE6E9: 0x8DCC,
        0xE6EA: 0x8DDB,
        0xE6EB: 0x8DCB,
        0xE6EC: 0x8DEA,
        0xE6ED: 0x8DEB,
        0xE6EE: 0x8DDF,
        0xE6EF: 0x8DE3,
        0xE6F0: 0x8DFC,
        0xE6F1: 0x8E08,
        0xE6F2: 0x8E09,
        0xE6F3: 0x8DFF,
        0xE6F4: 0x8E1D,
        0xE6F5: 0x8E1E,
        0xE6F6: 0x8E10,
        0xE6F7: 0x8E1F,
        0xE6F8: 0x8E42,
        0xE6F9: 0x8E35,
        0xE6FA: 0x8E30,
        0xE6FB: 0x8E34,
        0xE6FC: 0x8E4A,
        0xE740: 0x8E47,
        0xE741: 0x8E49,
        0xE742: 0x8E4C,
        0xE743: 0x8E50,
        0xE744: 0x8E48,
        0xE745: 0x8E59,
        0xE746: 0x8E64,
        0xE747: 0x8E60,
        0xE748: 0x8E2A,
        0xE749: 0x8E63,
        0xE74A: 0x8E55,
        0xE74B: 0x8E76,
        0xE74C: 0x8E72,
        0xE74D: 0x8E7C,
        0xE74E: 0x8E81,
        0xE74F: 0x8E87,
        0xE750: 0x8E85,
        0xE751: 0x8E84,
        0xE752: 0x8E8B,
        0xE753: 0x8E8A,
        0xE754: 0x8E93,
        0xE755: 0x8E91,
        0xE756: 0x8E94,
        0xE757: 0x8E99,
        0xE758: 0x8EAA,
        0xE759: 0x8EA1,
        0xE75A: 0x8EAC,
        0xE75B: 0x8EB0,
        0xE75C: 0x8EC6,
        0xE75D: 0x8EB1,
        0xE75E: 0x8EBE,
        0xE75F: 0x8EC5,
        0xE760: 0x8EC8,
        0xE761: 0x8ECB,
        0xE762: 0x8EDB,
        0xE763: 0x8EE3,
        0xE764: 0x8EFC,
        0xE765: 0x8EFB,
        0xE766: 0x8EEB,
        0xE767: 0x8EFE,
        0xE768: 0x8F0A,
        0xE769: 0x8F05,
        0xE76A: 0x8F15,
        0xE76B: 0x8F12,
        0xE76C: 0x8F19,
        0xE76D: 0x8F13,
        0xE76E: 0x8F1C,
        0xE76F: 0x8F1F,
        0xE770: 0x8F1B,
        0xE771: 0x8F0C,
        0xE772: 0x8F26,
        0xE773: 0x8F33,
        0xE774: 0x8F3B,
        0xE775: 0x8F39,
        0xE776: 0x8F45,
        0xE777: 0x8F42,
        0xE778: 0x8F3E,
        0xE779: 0x8F4C,
        0xE77A: 0x8F49,
        0xE77B: 0x8F46,
        0xE77C: 0x8F4E,
        0xE77D: 0x8F57,
        0xE77E: 0x8F5C,
        0xE780: 0x8F62,
        0xE781: 0x8F63,
        0xE782: 0x8F64,
        0xE783: 0x8F9C,
        0xE784: 0x8F9F,
        0xE785: 0x8FA3,
        0xE786: 0x8FAD,
        0xE787: 0x8FAF,
        0xE788: 0x8FB7,
        0xE789: 0x8FDA,
        0xE78A: 0x8FE5,
        0xE78B: 0x8FE2,
        0xE78C: 0x8FEA,
        0xE78D: 0x8FEF,
        0xE78E: 0x9087,
        0xE78F: 0x8FF4,
        0xE790: 0x9005,
        0xE791: 0x8FF9,
        0xE792: 0x8FFA,
        0xE793: 0x9011,
        0xE794: 0x9015,
        0xE795: 0x9021,
        0xE796: 0x900D,
        0xE797: 0x901E,
        0xE798: 0x9016,
        0xE799: 0x900B,
        0xE79A: 0x9027,
        0xE79B: 0x9036,
        0xE79C: 0x9035,
        0xE79D: 0x9039,
        0xE79E: 0x8FF8,
        0xE79F: 0x904F,
        0xE7A0: 0x9050,
        0xE7A1: 0x9051,
        0xE7A2: 0x9052,
        0xE7A3: 0x900E,
        0xE7A4: 0x9049,
        0xE7A5: 0x903E,
        0xE7A6: 0x9056,
        0xE7A7: 0x9058,
        0xE7A8: 0x905E,
        0xE7A9: 0x9068,
        0xE7AA: 0x906F,
        0xE7AB: 0x9076,
        0xE7AC: 0x96A8,
        0xE7AD: 0x9072,
        0xE7AE: 0x9082,
        0xE7AF: 0x907D,
        0xE7B0: 0x9081,
        0xE7B1: 0x9080,
        0xE7B2: 0x908A,
        0xE7B3: 0x9089,
        0xE7B4: 0x908F,
        0xE7B5: 0x90A8,
        0xE7B6: 0x90AF,
        0xE7B7: 0x90B1,
        0xE7B8: 0x90B5,
        0xE7B9: 0x90E2,
        0xE7BA: 0x90E4,
        0xE7BB: 0x6248,
        0xE7BC: 0x90DB,
        0xE7BD: 0x9102,
        0xE7BE: 0x9112,
        0xE7BF: 0x9119,
        0xE7C0: 0x9132,
        0xE7C1: 0x9130,
        0xE7C2: 0x914A,
        0xE7C3: 0x9156,
        0xE7C4: 0x9158,
        0xE7C5: 0x9163,
        0xE7C6: 0x9165,
        0xE7C7: 0x9169,
        0xE7C8: 0x9173,
        0xE7C9: 0x9172,
        0xE7CA: 0x918B,
        0xE7CB: 0x9189,
        0xE7CC: 0x9182,
        0xE7CD: 0x91A2,
        0xE7CE: 0x91AB,
        0xE7CF: 0x91AF,
        0xE7D0: 0x91AA,
        0xE7D1: 0x91B5,
        0xE7D2: 0x91B4,
        0xE7D3: 0x91BA,
        0xE7D4: 0x91C0,
        0xE7D5: 0x91C1,
        0xE7D6: 0x91C9,
        0xE7D7: 0x91CB,
        0xE7D8: 0x91D0,
        0xE7D9: 0x91D6,
        0xE7DA: 0x91DF,
        0xE7DB: 0x91E1,
        0xE7DC: 0x91DB,
        0xE7DD: 0x91FC,
        0xE7DE: 0x91F5,
        0xE7DF: 0x91F6,
        0xE7E0: 0x921E,
        0xE7E1: 0x91FF,
        0xE7E2: 0x9214,
        0xE7E3: 0x922C,
        0xE7E4: 0x9215,
        0xE7E5: 0x9211,
        0xE7E6: 0x925E,
        0xE7E7: 0x9257,
        0xE7E8: 0x9245,
        0xE7E9: 0x9249,
        0xE7EA: 0x9264,
        0xE7EB: 0x9248,
        0xE7EC: 0x9295,
        0xE7ED: 0x923F,
        0xE7EE: 0x924B,
        0xE7EF: 0x9250,
        0xE7F0: 0x929C,
        0xE7F1: 0x9296,
        0xE7F2: 0x9293,
        0xE7F3: 0x929B,
        0xE7F4: 0x925A,
        0xE7F5: 0x92CF,
        0xE7F6: 0x92B9,
        0xE7F7: 0x92B7,
        0xE7F8: 0x92E9,
        0xE7F9: 0x930F,
        0xE7FA: 0x92FA,
        0xE7FB: 0x9344,
        0xE7FC: 0x932E,
        0xE840: 0x9319,
        0xE841: 0x9322,
        0xE842: 0x931A,
        0xE843: 0x9323,
        0xE844: 0x933A,
        0xE845: 0x9335,
        0xE846: 0x933B,
        0xE847: 0x935C,
        0xE848: 0x9360,
        0xE849: 0x937C,
        0xE84A: 0x936E,
        0xE84B: 0x9356,
        0xE84C: 0x93B0,
        0xE84D: 0x93AC,
        0xE84E: 0x93AD,
        0xE84F: 0x9394,
        0xE850: 0x93B9,
        0xE851: 0x93D6,
        0xE852: 0x93D7,
        0xE853: 0x93E8,
        0xE854: 0x93E5,
        0xE855: 0x93D8,
        0xE856: 0x93C3,
        0xE857: 0x93DD,
        0xE858: 0x93D0,
        0xE859: 0x93C8,
        0xE85A: 0x93E4,
        0xE85B: 0x941A,
        0xE85C: 0x9414,
        0xE85D: 0x9413,
        0xE85E: 0x9403,
        0xE85F: 0x9407,
        0xE860: 0x9410,
        0xE861: 0x9436,
        0xE862: 0x942B,
        0xE863: 0x9435,
        0xE864: 0x9421,
        0xE865: 0x943A,
        0xE866: 0x9441,
        0xE867: 0x9452,
        0xE868: 0x9444,
        0xE869: 0x945B,
        0xE86A: 0x9460,
        0xE86B: 0x9462,
        0xE86C: 0x945E,
        0xE86D: 0x946A,
        0xE86E: 0x9229,
        0xE86F: 0x9470,
        0xE870: 0x9475,
        0xE871: 0x9477,
        0xE872: 0x947D,
        0xE873: 0x945A,
        0xE874: 0x947C,
        0xE875: 0x947E,
        0xE876: 0x9481,
        0xE877: 0x947F,
        0xE878: 0x9582,
        0xE879: 0x9587,
        0xE87A: 0x958A,
        0xE87B: 0x9594,
        0xE87C: 0x9596,
        0xE87D: 0x9598,
        0xE87E: 0x9599,
        0xE880: 0x95A0,
        0xE881: 0x95A8,
        0xE882: 0x95A7,
        0xE883: 0x95AD,
        0xE884: 0x95BC,
        0xE885: 0x95BB,
        0xE886: 0x95B9,
        0xE887: 0x95BE,
        0xE888: 0x95CA,
        0xE889: 0x6FF6,
        0xE88A: 0x95C3,
        0xE88B: 0x95CD,
        0xE88C: 0x95CC,
        0xE88D: 0x95D5,
        0xE88E: 0x95D4,
        0xE88F: 0x95D6,
        0xE890: 0x95DC,
        0xE891: 0x95E1,
        0xE892: 0x95E5,
        0xE893: 0x95E2,
        0xE894: 0x9621,
        0xE895: 0x9628,
        0xE896: 0x962E,
        0xE897: 0x962F,
        0xE898: 0x9642,
        0xE899: 0x964C,
        0xE89A: 0x964F,
        0xE89B: 0x964B,
        0xE89C: 0x9677,
        0xE89D: 0x965C,
        0xE89E: 0x965E,
        0xE89F: 0x965D,
        0xE8A0: 0x965F,
        0xE8A1: 0x9666,
        0xE8A2: 0x9672,
        0xE8A3: 0x966C,
        0xE8A4: 0x968D,
        0xE8A5: 0x9698,
        0xE8A6: 0x9695,
        0xE8A7: 0x9697,
        0xE8A8: 0x96AA,
        0xE8A9: 0x96A7,
        0xE8AA: 0x96B1,
        0xE8AB: 0x96B2,
        0xE8AC: 0x96B0,
        0xE8AD: 0x96B4,
        0xE8AE: 0x96B6,
        0xE8AF: 0x96B8,
        0xE8B0: 0x96B9,
        0xE8B1: 0x96CE,
        0xE8B2: 0x96CB,
        0xE8B3: 0x96C9,
        0xE8B4: 0x96CD,
        0xE8B5: 0x894D,
        0xE8B6: 0x96DC,
        0xE8B7: 0x970D,
        0xE8B8: 0x96D5,
        0xE8B9: 0x96F9,
        0xE8BA: 0x9704,
        0xE8BB: 0x9706,
        0xE8BC: 0x9708,
        0xE8BD: 0x9713,
        0xE8BE: 0x970E,
        0xE8BF: 0x9711,
        0xE8C0: 0x970F,
        0xE8C1: 0x9716,
        0xE8C2: 0x9719,
        0xE8C3: 0x9724,
        0xE8C4: 0x972A,
        0xE8C5: 0x9730,
        0xE8C6: 0x9739,
        0xE8C7: 0x973D,
        0xE8C8: 0x973E,
        0xE8C9: 0x9744,
        0xE8CA: 0x9746,
        0xE8CB: 0x9748,
        0xE8CC: 0x9742,
        0xE8CD: 0x9749,
        0xE8CE: 0x975C,
        0xE8CF: 0x9760,
        0xE8D0: 0x9764,
        0xE8D1: 0x9766,
        0xE8D2: 0x9768,
        0xE8D3: 0x52D2,
        0xE8D4: 0x976B,
        0xE8D5: 0x9771,
        0xE8D6: 0x9779,
        0xE8D7: 0x9785,
        0xE8D8: 0x977C,
        0xE8D9: 0x9781,
        0xE8DA: 0x977A,
        0xE8DB: 0x9786,
        0xE8DC: 0x978B,
        0xE8DD: 0x978F,
        0xE8DE: 0x9790,
        0xE8DF: 0x979C,
        0xE8E0: 0x97A8,
        0xE8E1: 0x97A6,
        0xE8E2: 0x97A3,
        0xE8E3: 0x97B3,
        0xE8E4: 0x97B4,
        0xE8E5: 0x97C3,
        0xE8E6: 0x97C6,
        0xE8E7: 0x97C8,
        0xE8E8: 0x97CB,
        0xE8E9: 0x97DC,
        0xE8EA: 0x97ED,
        0xE8EB: 0x9F4F,
        0xE8EC: 0x97F2,
        0xE8ED: 0x7ADF,
        0xE8EE: 0x97F6,
        0xE8EF: 0x97F5,
        0xE8F0: 0x980F,
        0xE8F1: 0x980C,
        0xE8F2: 0x9838,
        0xE8F3: 0x9824,
        0xE8F4: 0x9821,
        0xE8F5: 0x9837,
        0xE8F6: 0x983D,
        0xE8F7: 0x9846,
        0xE8F8: 0x984F,
        0xE8F9: 0x984B,
        0xE8FA: 0x986B,
        0xE8FB: 0x986F,
        0xE8FC: 0x9870,
        0xE940: 0x9871,
        0xE941: 0x9874,
        0xE942: 0x9873,
        0xE943: 0x98AA,
        0xE944: 0x98AF,
        0xE945: 0x98B1,
        0xE946: 0x98B6,
        0xE947: 0x98C4,
        0xE948: 0x98C3,
        0xE949: 0x98C6,
        0xE94A: 0x98E9,
        0xE94B: 0x98EB,
        0xE94C: 0x9903,
        0xE94D: 0x9909,
        0xE94E: 0x9912,
        0xE94F: 0x9914,
        0xE950: 0x9918,
        0xE951: 0x9921,
        0xE952: 0x991D,
        0xE953: 0x991E,
        0xE954: 0x9924,
        0xE955: 0x9920,
        0xE956: 0x992C,
        0xE957: 0x992E,
        0xE958: 0x993D,
        0xE959: 0x993E,
        0xE95A: 0x9942,
        0xE95B: 0x9949,
        0xE95C: 0x9945,
        0xE95D: 0x9950,
        0xE95E: 0x994B,
        0xE95F: 0x9951,
        0xE960: 0x9952,
        0xE961: 0x994C,
        0xE962: 0x9955,
        0xE963: 0x9997,
        0xE964: 0x9998,
        0xE965: 0x99A5,
        0xE966: 0x99AD,
        0xE967: 0x99AE,
        0xE968: 0x99BC,
        0xE969: 0x99DF,
        0xE96A: 0x99DB,
        0xE96B: 0x99DD,
        0xE96C: 0x99D8,
        0xE96D: 0x99D1,
        0xE96E: 0x99ED,
        0xE96F: 0x99EE,
        0xE970: 0x99F1,
        0xE971: 0x99F2,
        0xE972: 0x99FB,
        0xE973: 0x99F8,
        0xE974: 0x9A01,
        0xE975: 0x9A0F,
        0xE976: 0x9A05,
        0xE977: 0x99E2,
        0xE978: 0x9A19,
        0xE979: 0x9A2B,
        0xE97A: 0x9A37,
        0xE97B: 0x9A45,
        0xE97C: 0x9A42,
        0xE97D: 0x9A40,
        0xE97E: 0x9A43,
        0xE980: 0x9A3E,
        0xE981: 0x9A55,
        0xE982: 0x9A4D,
        0xE983: 0x9A5B,
        0xE984: 0x9A57,
        0xE985: 0x9A5F,
        0xE986: 0x9A62,
        0xE987: 0x9A65,
        0xE988: 0x9A64,
        0xE989: 0x9A69,
        0xE98A: 0x9A6B,
        0xE98B: 0x9A6A,
        0xE98C: 0x9AAD,
        0xE98D: 0x9AB0,
        0xE98E: 0x9ABC,
        0xE98F: 0x9AC0,
        0xE990: 0x9ACF,
        0xE991: 0x9AD1,
        0xE992: 0x9AD3,
        0xE993: 0x9AD4,
        0xE994: 0x9ADE,
        0xE995: 0x9ADF,
        0xE996: 0x9AE2,
        0xE997: 0x9AE3,
        0xE998: 0x9AE6,
        0xE999: 0x9AEF,
        0xE99A: 0x9AEB,
        0xE99B: 0x9AEE,
        0xE99C: 0x9AF4,
        0xE99D: 0x9AF1,
        0xE99E: 0x9AF7,
        0xE99F: 0x9AFB,
        0xE9A0: 0x9B06,
        0xE9A1: 0x9B18,
        0xE9A2: 0x9B1A,
        0xE9A3: 0x9B1F,
        0xE9A4: 0x9B22,
        0xE9A5: 0x9B23,
        0xE9A6: 0x9B25,
        0xE9A7: 0x9B27,
        0xE9A8: 0x9B28,
        0xE9A9: 0x9B29,
        0xE9AA: 0x9B2A,
        0xE9AB: 0x9B2E,
        0xE9AC: 0x9B2F,
        0xE9AD: 0x9B32,
        0xE9AE: 0x9B44,
        0xE9AF: 0x9B43,
        0xE9B0: 0x9B4F,
        0xE9B1: 0x9B4D,
        0xE9B2: 0x9B4E,
        0xE9B3: 0x9B51,
        0xE9B4: 0x9B58,
        0xE9B5: 0x9B74,
        0xE9B6: 0x9B93,
        0xE9B7: 0x9B83,
        0xE9B8: 0x9B91,
        0xE9B9: 0x9B96,
        0xE9BA: 0x9B97,
        0xE9BB: 0x9B9F,
        0xE9BC: 0x9BA0,
        0xE9BD: 0x9BA8,
        0xE9BE: 0x9BB4,
        0xE9BF: 0x9BC0,
        0xE9C0: 0x9BCA,
        0xE9C1: 0x9BB9,
        0xE9C2: 0x9BC6,
        0xE9C3: 0x9BCF,
        0xE9C4: 0x9BD1,
        0xE9C5: 0x9BD2,
        0xE9C6: 0x9BE3,
        0xE9C7: 0x9BE2,
        0xE9C8: 0x9BE4,
        0xE9C9: 0x9BD4,
        0xE9CA: 0x9BE1,
        0xE9CB: 0x9C3A,
        0xE9CC: 0x9BF2,
        0xE9CD: 0x9BF1,
        0xE9CE: 0x9BF0,
        0xE9CF: 0x9C15,
        0xE9D0: 0x9C14,
        0xE9D1: 0x9C09,
        0xE9D2: 0x9C13,
        0xE9D3: 0x9C0C,
        0xE9D4: 0x9C06,
        0xE9D5: 0x9C08,
        0xE9D6: 0x9C12,
        0xE9D7: 0x9C0A,
        0xE9D8: 0x9C04,
        0xE9D9: 0x9C2E,
        0xE9DA: 0x9C1B,
        0xE9DB: 0x9C25,
        0xE9DC: 0x9C24,
        0xE9DD: 0x9C21,
        0xE9DE: 0x9C30,
        0xE9DF: 0x9C47,
        0xE9E0: 0x9C32,
        0xE9E1: 0x9C46,
        0xE9E2: 0x9C3E,
        0xE9E3: 0x9C5A,
        0xE9E4: 0x9C60,
        0xE9E5: 0x9C67,
        0xE9E6: 0x9C76,
        0xE9E7: 0x9C78,
        0xE9E8: 0x9CE7,
        0xE9E9: 0x9CEC,
        0xE9EA: 0x9CF0,
        0xE9EB: 0x9D09,
        0xE9EC: 0x9D08,
        0xE9ED: 0x9CEB,
        0xE9EE: 0x9D03,
        0xE9EF: 0x9D06,
        0xE9F0: 0x9D2A,
        0xE9F1: 0x9D26,
        0xE9F2: 0x9DAF,
        0xE9F3: 0x9D23,
        0xE9F4: 0x9D1F,
        0xE9F5: 0x9D44,
        0xE9F6: 0x9D15,
        0xE9F7: 0x9D12,
        0xE9F8: 0x9D41,
        0xE9F9: 0x9D3F,
        0xE9FA: 0x9D3E,
        0xE9FB: 0x9D46,
        0xE9FC: 0x9D48,
        0xEA40: 0x9D5D,
        0xEA41: 0x9D5E,
        0xEA42: 0x9D64,
        0xEA43: 0x9D51,
        0xEA44: 0x9D50,
        0xEA45: 0x9D59,
        0xEA46: 0x9D72,
        0xEA47: 0x9D89,
        0xEA48: 0x9D87,
        0xEA49: 0x9DAB,
        0xEA4A: 0x9D6F,
        0xEA4B: 0x9D7A,
        0xEA4C: 0x9D9A,
        0xEA4D: 0x9DA4,
        0xEA4E: 0x9DA9,
        0xEA4F: 0x9DB2,
        0xEA50: 0x9DC4,
        0xEA51: 0x9DC1,
        0xEA52: 0x9DBB,
        0xEA53: 0x9DB8,
        0xEA54: 0x9DBA,
        0xEA55: 0x9DC6,
        0xEA56: 0x9DCF,
        0xEA57: 0x9DC2,
        0xEA58: 0x9DD9,
        0xEA59: 0x9DD3,
        0xEA5A: 0x9DF8,
        0xEA5B: 0x9DE6,
        0xEA5C: 0x9DED,
        0xEA5D: 0x9DEF,
        0xEA5E: 0x9DFD,
        0xEA5F: 0x9E1A,
        0xEA60: 0x9E1B,
        0xEA61: 0x9E1E,
        0xEA62: 0x9E75,
        0xEA63: 0x9E79,
        0xEA64: 0x9E7D,
        0xEA65: 0x9E81,
        0xEA66: 0x9E88,
        0xEA67: 0x9E8B,
        0xEA68: 0x9E8C,
        0xEA69: 0x9E92,
        0xEA6A: 0x9E95,
        0xEA6B: 0x9E91,
        0xEA6C: 0x9E9D,
        0xEA6D: 0x9EA5,
        0xEA6E: 0x9EA9,
        0xEA6F: 0x9EB8,
        0xEA70: 0x9EAA,
        0xEA71: 0x9EAD,
        0xEA72: 0x9761,
        0xEA73: 0x9ECC,
        0xEA74: 0x9ECE,
        0xEA75: 0x9ECF,
        0xEA76: 0x9ED0,
        0xEA77: 0x9ED4,
        0xEA78: 0x9EDC,
        0xEA79: 0x9EDE,
        0xEA7A: 0x9EDD,
        0xEA7B: 0x9EE0,
        0xEA7C: 0x9EE5,
        0xEA7D: 0x9EE8,
        0xEA7E: 0x9EEF,
        0xEA80: 0x9EF4,
        0xEA81: 0x9EF6,
        0xEA82: 0x9EF7,
        0xEA83: 0x9EF9,
        0xEA84: 0x9EFB,
        0xEA85: 0x9EFC,
        0xEA86: 0x9EFD,
        0xEA87: 0x9F07,
        0xEA88: 0x9F08,
        0xEA89: 0x76B7,
        0xEA8A: 0x9F15,
        0xEA8B: 0x9F21,
        0xEA8C: 0x9F2C,
        0xEA8D: 0x9F3E,
        0xEA8E: 0x9F4A,
        0xEA8F: 0x9F52,
        0xEA90: 0x9F54,
        0xEA91: 0x9F63,
        0xEA92: 0x9F5F,
        0xEA93: 0x9F60,
        0xEA94: 0x9F61,
        0xEA95: 0x9F66,
        0xEA96: 0x9F67,
        0xEA97: 0x9F6C,
        0xEA98: 0x9F6A,
        0xEA99: 0x9F77,
        0xEA9A: 0x9F72,
        0xEA9B: 0x9F76,
        0xEA9C: 0x9F95,
        0xEA9D: 0x9F9C,
        0xEA9E: 0x9FA0,
        0xEA9F: 0x582F,
        0xEAA0: 0x69C7,
        0xEAA1: 0x9059,
        0xEAA2: 0x7464,
        0xEAA3: 0x51DC,
        0xEAA4: 0x7199
      };

      /***/
    }, /* 9 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var GenericGF_1 = __webpack_require__(1);
      var GenericGFPoly_1 = __webpack_require__(2);
      function runEuclideanAlgorithm(field, a, b, R) {
        var _a;
        // Assume a's degree is >= b's
        if (a.degree() < b.degree()) {
          _a = [b, a], a = _a[0], b = _a[1];
        }
        var rLast = a;
        var r = b;
        var tLast = field.zero;
        var t = field.one;
        // Run Euclidean algorithm until r's degree is less than R/2
        while (r.degree() >= R / 2) {
          var rLastLast = rLast;
          var tLastLast = tLast;
          rLast = r;
          tLast = t;
          // Divide rLastLast by rLast, with quotient in q and remainder in r
          if (rLast.isZero()) {
            // Euclidean algorithm already terminated?
            return null;
          }
          r = rLastLast;
          var q = field.zero;
          var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
          var dltInverse = field.inverse(denominatorLeadingTerm);
          while (r.degree() >= rLast.degree() && !r.isZero()) {
            var degreeDiff = r.degree() - rLast.degree();
            var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
            q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
            r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
          }
          t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
          if (r.degree() >= rLast.degree()) {
            return null;
          }
        }
        var sigmaTildeAtZero = t.getCoefficient(0);
        if (sigmaTildeAtZero === 0) {
          return null;
        }
        var inverse = field.inverse(sigmaTildeAtZero);
        return [t.multiply(inverse), r.multiply(inverse)];
      }
      function findErrorLocations(field, errorLocator) {
        // This is a direct application of Chien's search
        var numErrors = errorLocator.degree();
        if (numErrors === 1) {
          return [errorLocator.getCoefficient(1)];
        }
        var result = new Array(numErrors);
        var errorCount = 0;
        for (var i = 1; i < field.size && errorCount < numErrors; i++) {
          if (errorLocator.evaluateAt(i) === 0) {
            result[errorCount] = field.inverse(i);
            errorCount++;
          }
        }
        if (errorCount !== numErrors) {
          return null;
        }
        return result;
      }
      function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
        // This is directly applying Forney's Formula
        var s = errorLocations.length;
        var result = new Array(s);
        for (var i = 0; i < s; i++) {
          var xiInverse = field.inverse(errorLocations[i]);
          var denominator = 1;
          for (var j = 0; j < s; j++) {
            if (i !== j) {
              denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
            }
          }
          result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
          if (field.generatorBase !== 0) {
            result[i] = field.multiply(result[i], xiInverse);
          }
        }
        return result;
      }
      function decode(bytes, twoS) {
        var outputBytes = new Uint8ClampedArray(bytes.length);
        outputBytes.set(bytes);
        var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
        var poly = new GenericGFPoly_1.default(field, outputBytes);
        var syndromeCoefficients = new Uint8ClampedArray(twoS);
        var error = false;
        for (var s = 0; s < twoS; s++) {
          var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
          syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
          if (evaluation !== 0) {
            error = true;
          }
        }
        if (!error) {
          return outputBytes;
        }
        var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
        var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
        if (sigmaOmega === null) {
          return null;
        }
        var errorLocations = findErrorLocations(field, sigmaOmega[0]);
        if (errorLocations == null) {
          return null;
        }
        var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
        for (var i = 0; i < errorLocations.length; i++) {
          var position = outputBytes.length - 1 - field.log(errorLocations[i]);
          if (position < 0) {
            return null;
          }
          outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
        }
        return outputBytes;
      }
      exports.decode = decode;

      /***/
    }, /* 10 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.VERSIONS = [{
        infoBits: null,
        versionNumber: 1,
        alignmentPatternCenters: [],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 7,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 19
          }]
        }, {
          ecCodewordsPerBlock: 10,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 16
          }]
        }, {
          ecCodewordsPerBlock: 13,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 13
          }]
        }, {
          ecCodewordsPerBlock: 17,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 9
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 2,
        alignmentPatternCenters: [6, 18],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 10,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 34
          }]
        }, {
          ecCodewordsPerBlock: 16,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 28
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 22
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 3,
        alignmentPatternCenters: [6, 22],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 15,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 55
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 44
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 17
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 4,
        alignmentPatternCenters: [6, 26],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 80
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 32
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 24
          }]
        }, {
          ecCodewordsPerBlock: 16,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 9
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 5,
        alignmentPatternCenters: [6, 30],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 108
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 43
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 16
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 11
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 12
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 6,
        alignmentPatternCenters: [6, 34],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 68
          }]
        }, {
          ecCodewordsPerBlock: 16,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 27
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 19
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 0x07C94,
        versionNumber: 7,
        alignmentPatternCenters: [6, 22, 38],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 78
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 31
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 15
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 13
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 14
          }]
        }]
      }, {
        infoBits: 0x085BC,
        versionNumber: 8,
        alignmentPatternCenters: [6, 24, 42],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 97
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 38
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 39
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 18
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 19
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 0x09A99,
        versionNumber: 9,
        alignmentPatternCenters: [6, 26, 46],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 36
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 37
          }]
        }, {
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 17
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 0x0A4D3,
        versionNumber: 10,
        alignmentPatternCenters: [6, 28, 50],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 68
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 69
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 43
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 44
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 19
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 20
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x0BBF6,
        versionNumber: 11,
        alignmentPatternCenters: [6, 30, 54],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 81
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 50
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 51
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 8,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 0x0C762,
        versionNumber: 12,
        alignmentPatternCenters: [6, 32, 58],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 92
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 93
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 36
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 37
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 20
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 21
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 0x0D847,
        versionNumber: 13,
        alignmentPatternCenters: [6, 34, 62],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 107
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 37
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 38
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 20
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 21
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 11
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 12
          }]
        }]
      }, {
        infoBits: 0x0E60D,
        versionNumber: 14,
        alignmentPatternCenters: [6, 26, 46, 66],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 40
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 41
          }]
        }, {
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 17
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 0x0F928,
        versionNumber: 15,
        alignmentPatternCenters: [6, 26, 48, 70],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 87
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 88
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 41
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 42
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 0x10B78,
        versionNumber: 16,
        alignmentPatternCenters: [6, 26, 50, 74],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 98
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 99
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 3,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 19
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 20
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x1145D,
        versionNumber: 17,
        alignmentPatternCenters: [6, 30, 54, 78],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 107
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 108
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 15,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 17,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 0x12A17,
        versionNumber: 18,
        alignmentPatternCenters: [6, 30, 56, 82],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 120
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 121
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 9,
            dataCodewordsPerBlock: 43
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 44
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 19,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 0x13532,
        versionNumber: 19,
        alignmentPatternCenters: [6, 30, 58, 86],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 113
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 114
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 44
          }, {
            numBlocks: 11,
            dataCodewordsPerBlock: 45
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 21
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 22
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 9,
            dataCodewordsPerBlock: 13
          }, {
            numBlocks: 16,
            dataCodewordsPerBlock: 14
          }]
        }]
      }, {
        infoBits: 0x149A6,
        versionNumber: 20,
        alignmentPatternCenters: [6, 34, 62, 90],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 107
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 108
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 41
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 42
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x15683,
        versionNumber: 21,
        alignmentPatternCenters: [6, 28, 50, 72, 94],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 116
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 117
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 42
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 0x168C9,
        versionNumber: 22,
        alignmentPatternCenters: [6, 26, 50, 74, 98],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 111
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 112
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 16,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 34,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 0x177EC,
        versionNumber: 23,
        alignmentPatternCenters: [6, 30, 54, 74, 102],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 121
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 122
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 16,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x18EC4,
        versionNumber: 24,
        alignmentPatternCenters: [6, 28, 54, 80, 106],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 117
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 118
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 16,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 30,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 0x191E1,
        versionNumber: 25,
        alignmentPatternCenters: [6, 32, 58, 84, 110],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 106
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 107
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 22,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 22,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x1AFAB,
        versionNumber: 26,
        alignmentPatternCenters: [6, 30, 58, 86, 114],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 114
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 115
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 28,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 33,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 0x1B08E,
        versionNumber: 27,
        alignmentPatternCenters: [6, 34, 62, 90, 118],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 122
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 123
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 22,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 3,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 23
          }, {
            numBlocks: 26,
            dataCodewordsPerBlock: 24
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 28,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x1CC1A,
        versionNumber: 28,
        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 117
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 118
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 23,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 31,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 31,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x1D33F,
        versionNumber: 29,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 116
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 117
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 21,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 23
          }, {
            numBlocks: 37,
            dataCodewordsPerBlock: 24
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 26,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x1ED75,
        versionNumber: 30,
        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 25,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 23,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 25,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x1F250,
        versionNumber: 31,
        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 13,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 3,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 29,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 42,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 23,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 28,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x209D5,
        versionNumber: 32,
        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 115
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 23,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 35,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 35,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x216F0,
        versionNumber: 33,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 14,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 21,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 29,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 19,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 46,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x228BA,
        versionNumber: 34,
        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 13,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 14,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 23,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 44,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 59,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 0x2379F,
        versionNumber: 35,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 121
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 122
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 26,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 39,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 22,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 41,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x24B0B,
        versionNumber: 36,
        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 121
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 122
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 34,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 46,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 64,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x2542E,
        versionNumber: 37,
        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 122
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 123
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 29,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 49,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 24,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 46,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x26A64,
        versionNumber: 38,
        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 122
          }, {
            numBlocks: 18,
            dataCodewordsPerBlock: 123
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 13,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 32,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 48,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 42,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 32,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x27541,
        versionNumber: 39,
        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 20,
            dataCodewordsPerBlock: 117
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 118
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 40,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 43,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 22,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 67,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 0x28C69,
        versionNumber: 40,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 118
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 119
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 18,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 31,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 34,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 34,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 20,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 61,
            dataCodewordsPerBlock: 16
          }]
        }]
      }];

      /***/
    }, /* 11 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var BitMatrix_1 = __webpack_require__(0);
      function squareToQuadrilateral(p1, p2, p3, p4) {
        var dx3 = p1.x - p2.x + p3.x - p4.x;
        var dy3 = p1.y - p2.y + p3.y - p4.y;
        if (dx3 === 0 && dy3 === 0) {
          // Affine
          return {
            a11: p2.x - p1.x,
            a12: p2.y - p1.y,
            a13: 0,
            a21: p3.x - p2.x,
            a22: p3.y - p2.y,
            a23: 0,
            a31: p1.x,
            a32: p1.y,
            a33: 1
          };
        } else {
          var dx1 = p2.x - p3.x;
          var dx2 = p4.x - p3.x;
          var dy1 = p2.y - p3.y;
          var dy2 = p4.y - p3.y;
          var denominator = dx1 * dy2 - dx2 * dy1;
          var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
          var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
          return {
            a11: p2.x - p1.x + a13 * p2.x,
            a12: p2.y - p1.y + a13 * p2.y,
            a13: a13,
            a21: p4.x - p1.x + a23 * p4.x,
            a22: p4.y - p1.y + a23 * p4.y,
            a23: a23,
            a31: p1.x,
            a32: p1.y,
            a33: 1
          };
        }
      }
      function quadrilateralToSquare(p1, p2, p3, p4) {
        // Here, the adjoint serves as the inverse:
        var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
        return {
          a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
          a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
          a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
          a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
          a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
          a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
          a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
          a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
          a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21
        };
      }
      function times(a, b) {
        return {
          a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
          a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
          a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
          a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
          a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
          a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
          a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
          a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
          a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33
        };
      }
      function extract(image, location) {
        var qToS = quadrilateralToSquare({
          x: 3.5,
          y: 3.5
        }, {
          x: location.dimension - 3.5,
          y: 3.5
        }, {
          x: location.dimension - 6.5,
          y: location.dimension - 6.5
        }, {
          x: 3.5,
          y: location.dimension - 3.5
        });
        var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
        var transform = times(sToQ, qToS);
        var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
        var mappingFunction = function mappingFunction(x, y) {
          var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
          return {
            x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
            y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator
          };
        };
        for (var y = 0; y < location.dimension; y++) {
          for (var x = 0; x < location.dimension; x++) {
            var xValue = x + 0.5;
            var yValue = y + 0.5;
            var sourcePixel = mappingFunction(xValue, yValue);
            matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
          }
        }
        return {
          matrix: matrix,
          mappingFunction: mappingFunction
        };
      }
      exports.extract = extract;

      /***/
    }, /* 12 */
    /***/function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var MAX_FINDERPATTERNS_TO_SEARCH = 4;
      var MIN_QUAD_RATIO = 0.5;
      var MAX_QUAD_RATIO = 1.5;
      var distance = function distance(a, b) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
      };
      function sum(values) {
        return values.reduce(function (a, b) {
          return a + b;
        });
      }
      // Takes three finder patterns and organizes them into topLeft, topRight, etc
      function reorderFinderPatterns(pattern1, pattern2, pattern3) {
        var _a, _b, _c, _d;
        // Find distances between pattern centers
        var oneTwoDistance = distance(pattern1, pattern2);
        var twoThreeDistance = distance(pattern2, pattern3);
        var oneThreeDistance = distance(pattern1, pattern3);
        var bottomLeft;
        var topLeft;
        var topRight;
        // Assume one closest to other two is B; A and C will just be guesses at first
        if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) {
          _a = [pattern2, pattern1, pattern3], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
        } else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) {
          _b = [pattern1, pattern2, pattern3], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
        } else {
          _c = [pattern1, pattern3, pattern2], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
        }
        // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
        // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
        // we've got it flipped around and should swap topRight and bottomLeft.
        if ((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y) - (topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x) < 0) {
          _d = [topRight, bottomLeft], bottomLeft = _d[0], topRight = _d[1];
        }
        return {
          bottomLeft: bottomLeft,
          topLeft: topLeft,
          topRight: topRight
        };
      }
      // Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
      function computeDimension(topLeft, topRight, bottomLeft, matrix) {
        var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 +
        // Divide by 7 since the ratio is 1:1:3:1:1
        sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 + sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
        if (moduleSize < 1) {
          throw new Error("Invalid module size");
        }
        var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
        var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
        var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
        switch (dimension % 4) {
          case 0:
            dimension++;
            break;
          case 2:
            dimension--;
            break;
        }
        return {
          dimension: dimension,
          moduleSize: moduleSize
        };
      }
      // Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
      // Returns an array of elements, representing the pixel size of the black white run.
      // Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
      function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
        var switchPoints = [{
          x: Math.floor(origin.x),
          y: Math.floor(origin.y)
        }];
        var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
        var fromX;
        var fromY;
        var toX;
        var toY;
        if (steep) {
          fromX = Math.floor(origin.y);
          fromY = Math.floor(origin.x);
          toX = Math.floor(end.y);
          toY = Math.floor(end.x);
        } else {
          fromX = Math.floor(origin.x);
          fromY = Math.floor(origin.y);
          toX = Math.floor(end.x);
          toY = Math.floor(end.y);
        }
        var dx = Math.abs(toX - fromX);
        var dy = Math.abs(toY - fromY);
        var error = Math.floor(-dx / 2);
        var xStep = fromX < toX ? 1 : -1;
        var yStep = fromY < toY ? 1 : -1;
        var currentPixel = true;
        // Loop up until x == toX, but not beyond
        for (var x = fromX, y = fromY; x !== toX + xStep; x += xStep) {
          // Does current pixel mean we have moved white to black or vice versa?
          // Scanning black in state 0,2 and white in state 1, so if we find the wrong
          // color, advance to next state or end if we are in state 2 already
          var realX = steep ? y : x;
          var realY = steep ? x : y;
          if (matrix.get(realX, realY) !== currentPixel) {
            currentPixel = !currentPixel;
            switchPoints.push({
              x: realX,
              y: realY
            });
            if (switchPoints.length === length + 1) {
              break;
            }
          }
          error += dy;
          if (error > 0) {
            if (y === toY) {
              break;
            }
            y += yStep;
            error -= dx;
          }
        }
        var distances = [];
        for (var i = 0; i < length; i++) {
          if (switchPoints[i] && switchPoints[i + 1]) {
            distances.push(distance(switchPoints[i], switchPoints[i + 1]));
          } else {
            distances.push(0);
          }
        }
        return distances;
      }
      // Takes an origin point and an end point and counts the sizes of the black white run in the origin point
      // along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
      // of the black white run. Takes a length which represents the number of switches from black to white to look for.
      function countBlackWhiteRun(origin, end, matrix, length) {
        var _a;
        var rise = end.y - origin.y;
        var run = end.x - origin.x;
        var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
        var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, {
          x: origin.x - run,
          y: origin.y - rise
        }, matrix, Math.ceil(length / 2));
        var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
        return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
      }
      // Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
      // that is the amount the run diverges from the expected ratio
      function scoreBlackWhiteRun(sequence, ratios) {
        var averageSize = sum(sequence) / sum(ratios);
        var error = 0;
        ratios.forEach(function (ratio, i) {
          error += Math.pow(sequence[i] - ratio * averageSize, 2);
        });
        return {
          averageSize: averageSize,
          error: error
        };
      }
      // Takes an X,Y point and an array of sizes and scores the point against those ratios.
      // For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
      // against that.
      function scorePattern(point, ratios, matrix) {
        try {
          var horizontalRun = countBlackWhiteRun(point, {
            x: -1,
            y: point.y
          }, matrix, ratios.length);
          var verticalRun = countBlackWhiteRun(point, {
            x: point.x,
            y: -1
          }, matrix, ratios.length);
          var topLeftPoint = {
            x: Math.max(0, point.x - point.y) - 1,
            y: Math.max(0, point.y - point.x) - 1
          };
          var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
          var bottomLeftPoint = {
            x: Math.min(matrix.width, point.x + point.y) + 1,
            y: Math.min(matrix.height, point.y + point.x) + 1
          };
          var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
          var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
          var vertError = scoreBlackWhiteRun(verticalRun, ratios);
          var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
          var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
          var ratioError = Math.sqrt(horzError.error * horzError.error + vertError.error * vertError.error + diagDownError.error * diagDownError.error + diagUpError.error * diagUpError.error);
          var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
          var sizeError = (Math.pow(horzError.averageSize - avgSize, 2) + Math.pow(vertError.averageSize - avgSize, 2) + Math.pow(diagDownError.averageSize - avgSize, 2) + Math.pow(diagUpError.averageSize - avgSize, 2)) / avgSize;
          return ratioError + sizeError;
        } catch (_a) {
          return Infinity;
        }
      }
      function recenterLocation(matrix, p) {
        var leftX = Math.round(p.x);
        while (matrix.get(leftX, Math.round(p.y))) {
          leftX--;
        }
        var rightX = Math.round(p.x);
        while (matrix.get(rightX, Math.round(p.y))) {
          rightX++;
        }
        var x = (leftX + rightX) / 2;
        var topY = Math.round(p.y);
        while (matrix.get(Math.round(x), topY)) {
          topY--;
        }
        var bottomY = Math.round(p.y);
        while (matrix.get(Math.round(x), bottomY)) {
          bottomY++;
        }
        var y = (topY + bottomY) / 2;
        return {
          x: x,
          y: y
        };
      }
      function locate(matrix) {
        var finderPatternQuads = [];
        var activeFinderPatternQuads = [];
        var alignmentPatternQuads = [];
        var activeAlignmentPatternQuads = [];
        var _loop_1 = function _loop_1(y) {
          var length_1 = 0;
          var lastBit = false;
          var scans = [0, 0, 0, 0, 0];
          var _loop_2 = function _loop_2(x) {
            var v = matrix.get(x, y);
            if (v === lastBit) {
              length_1++;
            } else {
              scans = [scans[1], scans[2], scans[3], scans[4], length_1];
              length_1 = 1;
              lastBit = v;
              // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
              var averageFinderPatternBlocksize = sum(scans) / 7;
              var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize && Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && !v; // And make sure the current pixel is white since finder patterns are bordered in white
              // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
              var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
              var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && v; // Is the current pixel black since alignment patterns are bordered in black
              if (validFinderPattern) {
                // Compute the start and end x values of the large center black square
                var endX_1 = x - scans[3] - scans[4];
                var startX_1 = endX_1 - scans[2];
                var line = {
                  startX: startX_1,
                  endX: endX_1,
                  y: y
                };
                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                // that line as the starting point.
                var matchingQuads = activeFinderPatternQuads.filter(function (q) {
                  return startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                });
                if (matchingQuads.length > 0) {
                  matchingQuads[0].bottom = line;
                } else {
                  activeFinderPatternQuads.push({
                    top: line,
                    bottom: line
                  });
                }
              }
              if (validAlignmentPattern) {
                // Compute the start and end x values of the center black square
                var endX_2 = x - scans[4];
                var startX_2 = endX_2 - scans[3];
                var line = {
                  startX: startX_2,
                  y: y,
                  endX: endX_2
                };
                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                // that line as the starting point.
                var matchingQuads = activeAlignmentPatternQuads.filter(function (q) {
                  return startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                });
                if (matchingQuads.length > 0) {
                  matchingQuads[0].bottom = line;
                } else {
                  activeAlignmentPatternQuads.push({
                    top: line,
                    bottom: line
                  });
                }
              }
            }
          };
          for (var x = -1; x <= matrix.width; x++) {
            _loop_2(x);
          }
          finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) {
            return q.bottom.y !== y && q.bottom.y - q.top.y >= 2;
          }));
          activeFinderPatternQuads = activeFinderPatternQuads.filter(function (q) {
            return q.bottom.y === y;
          });
          alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function (q) {
            return q.bottom.y !== y;
          }));
          activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function (q) {
            return q.bottom.y === y;
          });
        };
        for (var y = 0; y <= matrix.height; y++) {
          _loop_1(y);
        }
        finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) {
          return q.bottom.y - q.top.y >= 2;
        }));
        alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
        var finderPatternGroups = finderPatternQuads.filter(function (q) {
          return q.bottom.y - q.top.y >= 2;
        }) // All quads must be at least 2px tall since the center square is larger than a block
        .map(function (q) {
          var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
          var y = (q.top.y + q.bottom.y + 1) / 2;
          if (!matrix.get(Math.round(x), Math.round(y))) {
            return;
          }
          var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, q.bottom.y - q.top.y + 1];
          var size = sum(lengths) / lengths.length;
          var score = scorePattern({
            x: Math.round(x),
            y: Math.round(y)
          }, [1, 1, 3, 1, 1], matrix);
          return {
            score: score,
            x: x,
            y: y,
            size: size
          };
        }).filter(function (q) {
          return !!q;
        }) // Filter out any rejected quads from above
        .sort(function (a, b) {
          return a.score - b.score;
        })
        // Now take the top finder pattern options and try to find 2 other options with a similar size.
        .map(function (point, i, finderPatterns) {
          if (i > MAX_FINDERPATTERNS_TO_SEARCH) {
            return null;
          }
          var otherPoints = finderPatterns.filter(function (p, ii) {
            return i !== ii;
          }).map(function (p) {
            return {
              x: p.x,
              y: p.y,
              score: p.score + Math.pow(p.size - point.size, 2) / point.size,
              size: p.size
            };
          }).sort(function (a, b) {
            return a.score - b.score;
          });
          if (otherPoints.length < 2) {
            return null;
          }
          var score = point.score + otherPoints[0].score + otherPoints[1].score;
          return {
            points: [point].concat(otherPoints.slice(0, 2)),
            score: score
          };
        }).filter(function (q) {
          return !!q;
        }) // Filter out any rejected finder patterns from above
        .sort(function (a, b) {
          return a.score - b.score;
        });
        if (finderPatternGroups.length === 0) {
          return null;
        }
        var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]),
          topRight = _a.topRight,
          topLeft = _a.topLeft,
          bottomLeft = _a.bottomLeft;
        var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
        var result = [];
        if (alignment) {
          result.push({
            alignmentPattern: {
              x: alignment.alignmentPattern.x,
              y: alignment.alignmentPattern.y
            },
            bottomLeft: {
              x: bottomLeft.x,
              y: bottomLeft.y
            },
            dimension: alignment.dimension,
            topLeft: {
              x: topLeft.x,
              y: topLeft.y
            },
            topRight: {
              x: topRight.x,
              y: topRight.y
            }
          });
        }
        // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
        // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
        // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
        // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
        // attempts at decoding harder images.
        var midTopRight = recenterLocation(matrix, topRight);
        var midTopLeft = recenterLocation(matrix, topLeft);
        var midBottomLeft = recenterLocation(matrix, bottomLeft);
        var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
        if (centeredAlignment) {
          result.push({
            alignmentPattern: {
              x: centeredAlignment.alignmentPattern.x,
              y: centeredAlignment.alignmentPattern.y
            },
            bottomLeft: {
              x: midBottomLeft.x,
              y: midBottomLeft.y
            },
            topLeft: {
              x: midTopLeft.x,
              y: midTopLeft.y
            },
            topRight: {
              x: midTopRight.x,
              y: midTopRight.y
            },
            dimension: centeredAlignment.dimension
          });
        }
        if (result.length === 0) {
          return null;
        }
        return result;
      }
      exports.locate = locate;
      function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
        var _a;
        // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
        // We'll use these to help find the alignment pattern but also later when we do the extraction.
        var dimension;
        var moduleSize;
        try {
          _a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize;
        } catch (e) {
          return null;
        }
        // Now find the alignment pattern
        var bottomRightFinderPattern = {
          x: topRight.x - topLeft.x + bottomLeft.x,
          y: topRight.y - topLeft.y + bottomLeft.y
        };
        var modulesBetweenFinderPatterns = (distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize;
        var correctionToTopLeft = 1 - 3 / modulesBetweenFinderPatterns;
        var expectedAlignmentPattern = {
          x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
          y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y)
        };
        var alignmentPatterns = alignmentPatternQuads.map(function (q) {
          var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
          var y = (q.top.y + q.bottom.y + 1) / 2;
          if (!matrix.get(Math.floor(x), Math.floor(y))) {
            return;
          }
          var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, q.bottom.y - q.top.y + 1];
          var size = sum(lengths) / lengths.length;
          var sizeScore = scorePattern({
            x: Math.floor(x),
            y: Math.floor(y)
          }, [1, 1, 1], matrix);
          var score = sizeScore + distance({
            x: x,
            y: y
          }, expectedAlignmentPattern);
          return {
            x: x,
            y: y,
            score: score
          };
        }).filter(function (v) {
          return !!v;
        }).sort(function (a, b) {
          return a.score - b.score;
        });
        // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
        // so we can only use our best guess.
        var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
        return {
          alignmentPattern: alignmentPattern,
          dimension: dimension
        };
      }

      /***/
    }
    /******/])["default"]
  );
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/module.js */ 62)(module)))

/***/ }),
/* 62 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 63 */
/*!****************************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/node_modules/blueimp-md5/js/md5.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

/* eslint-disable strict */

;
(function ($) {
  'use strict';

  /**
   * Add integers, wrapping at 2^32.
   * This uses 16-bit operations internally to work around bugs in interpreters.
   *
   * @param {number} x First integer
   * @param {number} y Second integer
   * @returns {number} Sum
   */
  function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  }

  /**
   * Bitwise rotate a 32-bit number to the left.
   *
   * @param {number} num 32-bit number
   * @param {number} cnt Rotation count
   * @returns {number} Rotated number
   */
  function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }

  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} q q
   * @param {number} a a
   * @param {number} b b
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  /**
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   *
   * @param {Array} x Array of little-endian words
   * @param {number} len Bit length
   * @returns {Array<number>} MD5 Array
   */
  function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;
    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }

  /**
   * Convert an array of little-endian words to a string
   *
   * @param {Array<number>} input MD5 Array
   * @returns {string} MD5 string
   */
  function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  }

  /**
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   *
   * @param {string} input Raw input string
   * @returns {Array<number>} Array of little-endian words
   */
  function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  }

  /**
   * Calculate the MD5 of a raw string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
  }

  /**
   * Calculates the HMAC-MD5 of a key and some data (raw strings)
   *
   * @param {string} key HMAC key
   * @param {string} data Raw input string
   * @returns {string} Raw MD5 string
   */
  function rstrHMACMD5(key, data) {
    var i;
    var bkey = rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
  }

  /**
   * Convert a raw string to a hex string
   *
   * @param {string} input Raw input string
   * @returns {string} Hex encoded string
   */
  function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  }

  /**
   * Encode a string as UTF-8
   *
   * @param {string} input Input string
   * @returns {string} UTF8 string
   */
  function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  }

  /**
   * Encodes input string as raw MD5 string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s));
  }
  /**
   * Encodes input string as Hex encoded string
   *
   * @param {string} s Input string
   * @returns {string} Hex encoded string
   */
  function hexMD5(s) {
    return rstr2hex(rawMD5(s));
  }
  /**
   * Calculates the raw HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
  }
  /**
   * Calculates the Hex encoded HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d));
  }

  /**
   * Calculates MD5 value for a given string.
   * If a key is provided, calculates the HMAC-MD5 value.
   * Returns a Hex encoded string unless the raw argument is given.
   *
   * @param {string} string Input string
   * @param {string} [key] HMAC key
   * @param {boolean} [raw] Raw output switch
   * @returns {string} MD5 output
   */
  function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string);
      }
      return rawMD5(string);
    }
    if (!raw) {
      return hexHMACMD5(key, string);
    }
    return rawHMACMD5(key, string);
  }
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return md5;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this);

/***/ }),
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/*!***********************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/apis/api/modules/write-off.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetScanCouponGetDetailAjax = exports.GetApprovalRecordsAjax = void 0;
var _ = __webpack_require__(/*! .. */ 50);
/**
 * 核销列表
 */
var GetApprovalRecordsAjax = function GetApprovalRecordsAjax(data, config) {
  return _.api.post('/api/Shop/GetApprovalRecords', data, config);
};
/**
 * 核销详情
 */
exports.GetApprovalRecordsAjax = GetApprovalRecordsAjax;
var GetScanCouponGetDetailAjax = function GetScanCouponGetDetailAjax(data, config) {
  return _.api.get('/api/Shop/ScanCouponGetDetail', data, config);
};
exports.GetScanCouponGetDetailAjax = GetScanCouponGetDetailAjax;

/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */
/*!**************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/uni.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"imageBg":"#fafafa","themeColor":"#1747b2"};
    if(false) { var cssReload; }
  

/***/ }),
/* 81 */
/*!*******************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/utils/enum.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntruckOrderStatusEnum = void 0;
/**
 * 状态枚举
 */
var EntruckOrderStatusEnum;
exports.EntruckOrderStatusEnum = EntruckOrderStatusEnum;
(function (EntruckOrderStatusEnum) {
  EntruckOrderStatusEnum[EntruckOrderStatusEnum["\u5168\u90E8"] = -1] = "\u5168\u90E8";
  EntruckOrderStatusEnum[EntruckOrderStatusEnum["\u62B5\u6263\u5238"] = 0] = "\u62B5\u6263\u5238";
  EntruckOrderStatusEnum[EntruckOrderStatusEnum["\u6298\u6263\u5238"] = 1] = "\u6298\u6263\u5238";
  EntruckOrderStatusEnum[EntruckOrderStatusEnum["\u6EE1\u51CF\u5238"] = 2] = "\u6EE1\u51CF\u5238";
})(EntruckOrderStatusEnum || (exports.EntruckOrderStatusEnum = EntruckOrderStatusEnum = {}));

/***/ }),
/* 82 */
/*!********************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/frame/utils/create-list.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _api = __webpack_require__(/*! @/apis/api */ 50);
var _config2 = __webpack_require__(/*! @/config */ 44);
var _ = __webpack_require__(/*! . */ 42);
var defaultFiledMaps = {
  list: 'data',
  total: 'total'
};
var ListPage = /*#__PURE__*/(0, _createClass2.default)(function ListPage(config) {
  (0, _classCallCheck2.default)(this, ListPage);
  var _promiseApi = config.api;
  var requestData = config.data || {};
  var callback = config.callback;
  var configData = config.config || {};
  var filedMaps = config.filedMaps || defaultFiledMaps;
  var _default = {
    pageIndex: 1,
    pageSize: 8,
    takeCount: 0,
    queryAll: 0
  };
  requestData = Object.assign({}, _default, requestData);
  var _config = {
    isLoading: false
  };
  configData = Object.assign({}, _config, configData);
  var _originConfig = (0, _.jsonClone)(configData);
  configData.noError = true;
  this.data = function () {
    return {
      table: {
        requestData: (0, _.jsonClone)(requestData),
        configData: configData,
        _originConfig: _originConfig,
        _originParams: (0, _.jsonClone)(requestData),
        _gid: 0,
        list: null,
        total: 0,
        status: {
          isAll: false,
          isNone: false,
          isLoading: false,
          isError: false,
          isTimeout: false
        }
      }
    };
  };
  this.onLoad = function () {
    this.$watch('table.list', {
      handler: function handler() {
        this.checkTableIsNone();
      },
      deep: true
    });
  };
  this.methods = {
    getPageList: function getPageList(isRemoveList) {
      var _this = this;
      this.table.status.isLoading = true;
      var table = this.table;
      var requestData = table.requestData;
      var configData = table.configData;
      this.isLoading && this.showPageLoading && this.showPageLoading();
      return _promiseApi(requestData, configData).then(function (res) {
        if (res.statusCode === 200) {
          console.log('table', res);
          var list = isRemoveList ? [] : table.list || [];
          // let resData = this._processFn(res.data.data || []).map((item: any) => {
          // let resData = this._processFn(res.data[filedMaps.list] || []).map((item: any) => {
          var resData = _this._processFn(res.data.Result[filedMaps.list] || []).map(function (item) {
            item._gid = _this.table._gid;
            return item;
          });
          _this.table._gid += 1;
          list = list.concat(resData);
          var isAll = false;
          var pageIndex = requestData.pageIndex;
          if (resData.length === 0 && list.length || requestData.queryAll) {
            isAll = true;
          } else {
            if (resData.length > 0) {
              pageIndex++;
            }
          }
          _this.table.list = list;
          _this.table.status.isAll = isAll;
          _this.table.requestData.pageIndex = pageIndex;
          _this.table.status.isNone = list.length === 0;
          _this.table.status.isError = false;
          // this.table.total = res.data.total || 0
          // this.table.total = res.data[filedMaps.total] || 0
          _this.table.total = res.data.Result[filedMaps.total] || 0;
        } else if (res.statusCode === 401) {
          // 授权失败
          uni.showModal({
            title: '您未授权或授权已过期，请重新登录',
            success: function success(res) {
              if (res.confirm) {
                _api.token.remove();
                uni.navigateTo({
                  url: _config2.authFailRedirectUrl
                });
              }
            },
            showCancel: false
          });
          _this.table.status.isError = true;
        } else if (res.statusCode === 403) {
          uni.showToast({
            title: '您暂无访问权限',
            icon: 'none'
          });
          _this.table.status.isError = true;
        } else {
          if (!_originConfig.noError) {
            uni.showToast({
              title: res.data.ret_msg,
              icon: 'none'
            });
          }
          _this.table.status.isError = true;
        }
        _this.table.status.isLoading = false;
        _this.table.status.isTimeout = false;
        uni.stopPullDownRefresh();
        if (configData.isLoading) {
          _this.hidePageLoading && _this.hidePageLoading();
        }
        return _this.table.list;
      }).catch(function (e) {
        _this.table.status.isLoading = false;
        if (e.isTimeout) {
          uni.showToast({
            title: '连接超时！',
            icon: 'none'
          });
          _this.table.status.isTimeout = true;
        }
      });
    },
    _processFn: function _processFn(data) {
      return typeof callback === 'function' ? callback.call(this, data) : data;
    },
    resetList: function resetList() {
      this.resetParams();
      return this.getPageList(true);
    },
    checkTableIsNone: function checkTableIsNone() {
      this.table.status.isNone = this.table.list.length === 0;
    },
    resetParams: function resetParams() {
      this.table.requestData.pageIndex = 1;
      this.table.status = {
        isAll: false,
        isLoading: false,
        isNone: false,
        isError: false,
        isTimeout: false
      };
    },
    setDeafaultParams: function setDeafaultParams() {
      var _originParams = this.table._originParams;
      var requestData = this.table.requestData;
      // 删除多余参数
      for (var k in requestData) {
        if (!_originParams.hasOwnProperty(k)) {
          delete requestData[k];
        }
      }
      // 重置参数
      for (var _k in _originParams) {
        requestData[_k] = _originParams[_k];
      }
      this.resetParams();
    },
    addParams: function addParams(obj) {
      for (var k in obj) {
        this.table.requestData[k] = obj[k];
      }
    },
    changeUrl: function changeUrl(api) {
      _promiseApi = api;
    },
    updateList: function updateList(filterKeyParams, valueParams) {
      var index = this.table.list.findIndex(function (item) {
        return item[filterKeyParams.key] === filterKeyParams.value;
      });
      if (~index) {
        // 存在
        for (var k in valueParams) {
          this.table.list[index][k] = valueParams[k];
        }
      }
    },
    scrollToBottom: function scrollToBottom() {
      if (this.table.status.isAll || this.table.status.isNone) {
        return false;
      }
      this.getPageList();
    }
  };
  // 下拉
  this.onPullDownRefresh = function () {
    this.resetList();
  };
  // 触底
  this.onReachBottom = function () {
    this.scrollToBottom();
  };
  this.onUnload = function () {
    this.setDeafaultParams();
  };
});
exports.default = ListPage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/*!*****************************************************************************************************************!*\
  !*** D:/git仓库/EveryHeXiao/write-off-h5/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimation = createAnimation;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {
    (0, _classCallCheck2.default)(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;
  }
  (0, _createClass2.default)(MPAnimation, [{
    key: "_nvuePushAnimates",
    value: function _nvuePushAnimates(type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    }
  }, {
    key: "_animateRun",
    value: function _animateRun() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles
        }, config), function (res) {
          resolve();
        });
      });
    }
  }, {
    key: "_nvueNextAnimate",
    value: function _nvueNextAnimate(animates) {
      var _this2 = this;
      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {
        var styles = obj.styles,
          config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    }
  }, {
    key: "step",
    value: function step() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.animation.step(config);
      return this;
    }
  }, {
    key: "run",
    value: function run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);
    }
  }]);
  return MPAnimation;
}();
var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ'];
var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {
    var _this$animation;
    (_this$animation = this.animation)[type].apply(_this$animation, arguments);
    return this;
  };
});
function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map