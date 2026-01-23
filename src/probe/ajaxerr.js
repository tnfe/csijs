const xhrs = [];
const AjaxErr = function (forms) {
  this.forms = forms;
};

// overwrite XMLHttpRequest
AjaxErr.prototype.probe = function () {
  const that = this;
  const { open } = XMLHttpRequest.prototype;
  XMLHttpRequest.prototype.open = function() {
    that.addListener(this, arguments);
    open.apply(this, arguments);
  };
};

AjaxErr.prototype.addListener = function (xhr, args) {
  if (xhrs.indexOf(xhr) >= 0) return;
  xhrs.push(xhr);

  const that = this;
  const { onloadend } = xhr;
  const { ontimeout } = xhr;

  xhr.onloadend = function (...params) {
    const status = `${xhr.status}`;
    if (!/^2[0-9]{1,3}/ig.test(status) && status !== '0') {
      that.forms.addLine('ERROR', {
        etype: 'ajax error',
        msg: `status:${xhr.status}`,
        js: args.join(' :'),
      });

      onloadend && onloadend.apply(xhr, params);
    }
  };

  xhr.ontimeout = function (...params) {
    that.forms.addLine('ERROR', {
      etype: 'ajax error',
      msg: `timeout ${xhr.status}`,
      js: args.join(' :'),
    });

    ontimeout && ontimeout.apply(xhr, params);
  };
};

export default AjaxErr;
