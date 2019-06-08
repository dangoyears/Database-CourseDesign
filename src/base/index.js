exports.install = function(Vue, options) {
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
  // Vue.prototype.testChar = function(str, arr) {

  // }
}