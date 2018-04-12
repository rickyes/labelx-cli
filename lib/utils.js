const moment = require('moment');


/**
 * 转换日期
 * "2018-03-16T10:20:30.000Z" => 2018-03-10 09:30:26
 * @param {日期字符} dateStr
 */
exports.formatTime = function(dateStr,format){
  return moment(Date.parse(dateStr)).format(format || 'YYYY-MM-DD HH:mm:ss');
};

/**
 * 生成判断对象类型的高阶函数
 * eg:
 * let isPass = isType('String','hello'); // true
 * isPass = isType('Number',1); // true
 * 结合TYPE枚举
 * let isPass = isType(TYPE.String,'hello'); // true
 * isPass = isType(TYPE.Number,1); // true
 * @param {类型字符串} type
 */
exports.isType = function (type, obj) {
  return Object.prototype.toString.call(obj) == `[object ${type}]`
};

/**
 * 生成defineProperties参数
 * @param args 属性数组
 * @param conf 数据属性配置
 */
exports.buildProperties = function(args,conf){
  let obj = {};
  if(!exports.isType('Array',args)){
    throw new TypeError(`'${args}' is not Array`);
  }
  args.map(item => {
    conf = JSON.parse(JSON.stringify(conf));
    conf.value = item;
    obj[item] = conf;
  });
  return obj;
};


/**
 * toString类型
*/
exports.TYPE = Object.defineProperties({},exports.buildProperties(
  ['Array','Object','String','Function','Number','Boolean','Symbol','Undefined'],
  {
    enumerable: true,
    configurable: false,
    writable: false
  }
));
