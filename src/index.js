import { getUserAgent, Device } from './util/device';
import Panel from './show/panel';
import WinErr from './probe/winerr';
import AjaxErr from './probe/ajaxerr';
import FetchErr from './probe/fetcherr';
import Forms from './form/forms';
import { readLines } from './util/store';
import { arrIsNull } from './util/util';

const letIE9 = () => {
  getUserAgent();
  const { browser } = Device;
  const { name } = browser;
  const version = parseFloat(browser.version);
  return name === 'ie' && version < 9;
};

/**
 * @param opts.feID: 项目Id， 必传
 * @param opts.report: 函数，自定义上报函数
 */
class CSI {
  constructor(opts = {}) {
    this.inited = false;
    this.checkParams(opts);
    this.init(opts);
  }

  checkParams(opts) {
    console.log(opts);
    if (!opts.feID) {
      throw Error('feID必传');
    }
    if (!opts.report || typeof opts.report !== 'function') {
      throw Error('请填写自定义上报函数');
    }
  }

  // 初始化
  init(opts) {
    if (this.inited || letIE9()) return;
    try {
      this.opts = opts;
      const formObj = new Forms(opts.feID);
      (new Panel(this)).init();
      (new WinErr(formObj)).probe();
      (new AjaxErr(formObj)).probe();
      (new FetchErr(formObj)).probe();
      this.inited = true;
    } catch (e) {
      console.log(e);
    }
  }

  // 自定义错误
  probe(msg) {
    if (letIE9()) return;
    this.forms.addLine('ERROR', {
      etype: 'custom error',
      msg,
    });
  }

  // 数据上报
  report() {
    if (letIE9()) return;
    const lines = readLines();
    if (arrIsNull(lines)) return;
    this.opts.report(lines);
  }
}

export default CSI;
