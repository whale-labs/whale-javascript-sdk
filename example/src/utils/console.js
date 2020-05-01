/*
 * @Author: lichao
 * @Description:
 * @Date: 2020-05-01 17:53:39
 */
console.oldLog = console.log;
console.log = function () {
  if (console.constructor === Object && console.log) {
    try {
      console.oldLog.apply(console, arguments);
    } catch (e) {
      console.oldLog(arguments[0]);
    }
  }
  // console.log(arguments)
  if (
    arguments[0] &&
    arguments[0].constructor === String &&
    arguments[0].indexOf("[WhaleSDK]") > -1
  ) {
    try {
      document.getElementById("log").innerText = arguments[0];
    } catch (e) {}
  }
};
