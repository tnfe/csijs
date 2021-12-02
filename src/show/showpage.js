import { readLines } from '../util/store';
import { arrIsNull, formatTime } from '../util/util';
import ExcellentExport from 'excellentexport';

function createBtn(text) {
  const btn = document.createElement('a');
  btn.className = 'screenshots';
  btn.innerText = text;
  btn.style.width = '120px';
  btn.style.height = '40px';
  btn.style.backgroundColor = '#0064CD';
  btn.style.color = '#fff';
  btn.style.lineHeight = '40px';
  btn.style.cursor = 'pointer';
  btn.style.textAlign = 'center';
  btn.style.borderRadius = '20px';
  return btn;
}

// 添加td
function addTD(html) {
  const td = document.createElement('td');
  td.style.border = '1px solid #0064CD';
  td.style.padding = '5px 5px 5px 10px';
  td.innerHTML = html;
  return td;
}

function addElement(tag, style) {
  const ele = document.createElement(tag);
  for (const key in style) {
    ele.style[key] = style[key];
  }
  return ele;
}

function ShowPage(report) {
  this.page = null;
  this.blackBg = null;
  this.table = null;
  this.appended = false;
  this.canReport = true;
  this.csiReport = report;
}

// 创建页面
ShowPage.prototype.createPage = function () {
  this.page = this.page || addElement('div', {
    zIndex: 9999,
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  });

  this.blackBg = this.blackBg || addElement('div', {
    zIndex: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  });

  this.title = this.title || addElement('div', {
    zIndex: 2,
    position: 'absolute',
    width: '400px',
    left: '50%',
    top: '30px',
    fontSize: '26px',
    color: '#000',
    textAlign: 'center',
    marginLeft: '-200px',
  });

  this.container = this.container || addElement('div', {
    zIndex: 1,
    position: 'absolute',
    width: '1000px',
    height: '60vh',
    left: '50%',
    top: '30px',
    marginLeft: '-500px',
  });

  this.tableCon = this.tableCon || addElement('div', {
    // width: "100%",
    height: '100%',
    border: '12px solid #0064CD',
    backgroundColor: '#fff',
    overflow: 'scroll',
    // overflowX: "hidden"
  });

  this.table = this.table || addElement('table', {
    color: '#333333',
    width: '100%',
    borderCollapse: 'collapse',
  });

  this.btnCon = this.btnCon || addElement('div', {
    margin: '20px auto',
    width: '400px',
    display: 'block',
    overflow: 'hidden',
  });

  if (!this.btn1) {
    this.btn1 = createBtn('下载');
    this.btn1.style.float = 'left';
  }
  if (!this.btn2) {
    this.btn2 = createBtn('上报');
    this.btn2.style.float = 'right';
  }

  this.page.append(this.blackBg);
  this.page.append(this.container);
  this.page.append(this.title);

  this.container.append(this.tableCon);
  this.tableCon.append(this.table);

  this.container.append(this.btnCon);
  this.btnCon.append(this.btn1);
  this.btnCon.append(this.btn2);

  setTimeout(() => {
    this.addEventListener();
  }, 300);
};

// 添加事件侦听
ShowPage.prototype.addEventListener = function () {
  if (this.addEvented) return;
  const self = this;
  console.log(self);
  this.blackBg.addEventListener('click', () => {
    this.remove();
  });

  this.btn1.addEventListener('click', () => {
    ExcellentExport.excel(this.btn1, this.table);
  });

  this.btn2.addEventListener('click', () => {
    if (this.canReport) {
      const lines = readLines();
      if (!arrIsNull(lines) && this.csiReport) {
        this.csiReport();
      }
    } else {
      alert('对不起该功能现在没有支持！');
    }
  });

  this.addEvented = true;
};

// 填充内容
ShowPage.prototype.fillContent = function () {
  const lines = readLines();

  if (arrIsNull(lines)) {
    const info = addElement('div', {
      width: '100%',
      position: 'absolute',
      top: '100px',
      textAlign: 'center',
      fontSize: '24px',
    });
    info.innerText = '暂时没有错误信息';
    this.table.append(info);
  } else {
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];

      if (!line) continue;

      // 添加内容
      const tr = addElement('tr', {
        border: '1px solid #0064CD',
      });
      const td1 = addTD(formatTime(line.time));
      const td2 = addTD(line.etype);
      const td3 = addTD(line.js);
      const td4 = addTD(line.msg);
      td4.style.color = '#ff0000';
      const td5 = addTD(line.ua);

      tr.append(td1);
      tr.append(td2);
      tr.append(td3);
      tr.append(td4);
      tr.append(td5);

      this.table.append(tr);
    }
  }
};

// 添加标题
ShowPage.prototype.addTitle = function () {
  const tr = addElement('tr', {
    height: '35px',
    textAlign: 'center',
    backgroundColor: '#ccc',
  });

  const td1 = document.createElement('td');
  td1.append(document.createTextNode('time'));
  const td2 = document.createElement('td');
  td2.append(document.createTextNode('type'));
  const td3 = document.createElement('td');
  td3.append(document.createTextNode('js'));
  const td4 = document.createElement('td');
  td4.append(document.createTextNode('msg'));
  const td5 = document.createElement('td');
  td5.append(document.createTextNode('UA'));
  tr.append(td1);
  tr.append(td2);
  tr.append(td3);
  tr.append(td4);
  tr.append(td5);
  this.table.append(tr);
};

// ------------------------------------------------------------------------------
//  切换
// ------------------------------------------------------------------------------
ShowPage.prototype.appendTo = function () {
  this.createPage();
  this.table.innerHTML = '';
  this.addTitle();

  this.fillContent();

  this.appended = true;
  document.body.append(this.page);
};

ShowPage.prototype.remove = function () {
  this.appended = false;
  this.page.remove();
};

ShowPage.prototype.toggleShow = function () {
  if (this.appended) this.remove();
  else this.appendTo();
};

export default ShowPage;
