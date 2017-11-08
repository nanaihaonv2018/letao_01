/*
* @Author: zhou
* @Date:   2017-11-08 10:05:34
* @Last Modified by:   zhou
* @Last Modified time: 2017-11-08 23:33:28
*/

// ----------- 一。 加载进度条
NProgress.configure({ showSpinner: true });  // falst   是否显示加载环
// 加载前
$(document).ajaxStart(function () {
  NProgress.start();
});

// 加载后
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);
});




















