const JsonpErr = function (forms) {
  this.forms = forms;
};
JsonpErr.prototype.probe = function () {
  const { createElement } = window.document;
  window.document.createElement = (...args) => {
    const dom = createElement.apply(this, args);
    if (args[0] === 'script') {
      this.addListener(dom);
    }
    return dom;
  };
};

// jsonp错误或者seajs/requirejs错误
JsonpErr.prototype.addListener = function (dom) {
  dom.onerror = (e) => {
    this.forms.add({
      msg: `script tag error${e}`,
      url: dom.getAttribute('src'),
    });
  };
};

export default JsonpErr;
