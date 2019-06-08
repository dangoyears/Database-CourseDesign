exports.install = function(Vue) {
  // 节流
  Vue.prototype.throttle = function(fn, wait) {
    let last = 0;
    let context = this;
    return function(...arg) {
      let cur = new Date();
      if(cur - last > wait) {
        fn.apply(context, arg);
        last = cur;
      }
    }
  }
  // 校验输入字符串的长度
  Vue.prototype.testLength = function(str, limit) {
    if(str.length > limit)  return false;
    return true;
  }
  // 检验输入字符串的类型
  Vue.prototype.testChar = function(str, type) {
    let regObj = {
      "number": /^[0-9]*$/,
      "english": /^[A-Za-z]*$/,
      "chinese": /^[一-龥]{0,}$/
    }
    if(!regObj[type].test(str))  return false;
    return true;
  }
}