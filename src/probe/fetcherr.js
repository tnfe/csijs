const FetchErr = function (forms) {
  this.forms = forms;
};
FetchErr.prototype.probe = function () {
  if (!window.fetch) return;
  const originFetch = window.fetch;
  window.fetch = (input, initObject) => {
    let method = 'GET';
    let url = input || '';
    if (typeof input === 'string') {
      method = initObject && initObject.method ? initObject.method : method;
    } else if (Object.prototype.toString.call(input) === '[object Request]') {
      method = input.method || method;
      url = input.url || '';
    }

    return originFetch(input, initObject)
      .then((resp) => {
        const status = `${resp.status}`;
        if (!/^2[0-9]{1,3}/gi.test(status) && +status !== 0) {
          this.forms.addLine('ERROR', {
            etype: 'fetch error',
            msg: `status:${resp.status}`,
            js: `${method} :${url}`,
          });
        }
        return resp;
      })
      .catch((err) => {
        let msg;
        try {
          msg = err && err.message ? err.message : JSON.stringify(err);
        } catch (e) {
          msg = err && err.message ? err.message : err;
        }
        this.forms.addLine('ERROR', {
          etype: 'fetch error',
          msg,
          js: `${method} :${url}`,
        });
        throw err;
      });
  };
};

export default FetchErr;
