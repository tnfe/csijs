/**
 *
 *   ［表格格式］
 *
 *   1.基础信息 --- 键名: felog_info
 *   -------------------------------------------------------------------------------
 *     fid (上报id)  | uid (用户id) | length (条数) | min (最小索引) | max (最大索引)
 *   -------------------------------------------------------------------------------
 *
 *   补充数据
 *   ----------------------------------------
 *     name (用户名字)  | describe (详细描述)
 *   ----------------------------------------
 *
 *   2.单条信息 --- 键名: felog_[type]_[index]  (felog_err_5)
 *   --------------------------------------------------------------------------------------------------
 *     pid (单条记录id) | index (该条索引) | time (操作时间) | ua (用户信息) | type[nor/err] (类型)
 *   --------------------------------------------------------------------------------------------------
 *
 *   --------------------------------------------------------------------------------------------------
 *     etype (错误类型) | msg (详细描述) | url (js文件地址或ajax地址) | other (其他信息，如cookie/head等)
 *   --------------------------------------------------------------------------------------------------
 *
 */

import { extend, getID, reset } from '../util/util';
import { read, write, remove } from '../util/store';
import { getUserAgent } from '../util/device';

const MAX_LENGTH = 45;

const Info = function () {
  this.fid = '';
  this.uid = '';
  this.min = 0;
  this.max = 0;
  this.type = '';
  this.length = '';
};

const Line = function () {
  this.pid = '';
  this.index = '';
  this.time = '';
  this.ua = '';

  this.etype = '';
  this.msg = '';
  this.url = '';
  this.other = '';
};


const Table = function (feID, type) {
  const initInfo = {
    feid: feID,
    uid: getID(),
    min: 0,
    max: 0,
    type,
    length: 0,
  };

  this.info = extend(new Info(), initInfo, read('info'));
  this.line = new Line();
};

Table.prototype = {

  // 添加一行信息
  addLine(data) {
    const initLine = {
      pid: getID(6),
      index: parseInt(this.info.max, 10) + 1,
      time: Date.now(),
      ua: getUserAgent(),
    };
    reset(this.line);
    extend(this.line, initLine, data);

    const keyName = `${this.info.type}_${this.line.index}`;
    write(keyName, this.line);

    this.updateInfo(this.line);
  },

  // 更新表格信息
  updateInfo(line) {
    const max = parseInt(line.index, 10);
    let min = parseInt(this.info.min, 10);
    min = !min ? max : min;

    let length = max - min + 1;
    if (length > MAX_LENGTH) {
      const n = length - MAX_LENGTH;
      for (let i = 0; i < n; i++) {
        const keyName = `${this.info.type}_${min + i}`;
        remove(keyName);
      }

      length = MAX_LENGTH;
    }

    this.info.length = length;
    this.info.min = max - length + 1;
    this.info.max = max;

    write('info', this.info);
  },
};


export default Table;
