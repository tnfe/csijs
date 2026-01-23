const JsonpErr = function (forms) {
  this.forms = forms;
};
JsonpErr.prototype.probe = function () {
  const that = this;
  const { createElement } = window.document;
  window.document.createElement = function (...args) {
    const dom = createElement.apply(window.document, args);
    if (args[0] === 'script') {
      that.addListener(dom);
    }
    return dom;
  };
};

// jsonp错误或者seajs/requirejs错误
JsonpErr.prototype.addListener = function (dom) {
  const that = this;
  dom.onerror = (e) => {
    that.forms.addLine('ERROR', {
      etype: 'script error',
      msg: `script tag error${e}`,
      js: dom.getAttribute('src'),
    });
  };
};

export default JsonpErr;
