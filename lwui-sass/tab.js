/*
useage
tab:
add lw-tab-tab
content:
add lw-tab-content
Tabs();
*/

'use strict';

function Tabs() {
  var self = this;
  function bindAll() {
    var menuElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].addEventListener('click', change, false);
    }
  }

  var clear = function() {
    var menuElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].classList.remove('active');
      var dataTab = menuElements[i].getAttribute('data-tab');
      //clear active class of all tab
      document.querySelectorAll('[data-tab=' + dataTab +']')[0].classList.remove('active');
      document.querySelectorAll('[data-tab=' + dataTab +']')[1].classList.remove('active');
    }
  }

  var change = function(e) {
    var fromTab = document.querySelector('.active[data-tab]').getAttribute("data-tab");
    clear();
    e.target.classList.add('active');
    var dataTab = e.currentTarget.getAttribute('data-tab');
    //add active class to target
    document.querySelectorAll('[data-tab=' + dataTab +']')[0].classList.add('active');
    document.querySelectorAll('[data-tab=' + dataTab +']')[1].classList.add('active');
    emit('change', fromTab, dataTab);
  }
  function emit(event) {
    //if eventCollection not exist
    if(!self.eventCollection) {
      return self;
    }
    for(var cb of self.eventCollection[event]) {
      cb.call(self, ...Array.prototype.slice.call(arguments, 1));
    }
  }
  bindAll();
  return this;
}
Tabs.prototype.on = function(event, callback) {
  // 使用现有的collection，如果不存在，则创建
  this.eventCollection = this.eventCollection || {};
  this.eventCollection[event] = this.eventCollection[event] || [];

  // 讲给定的监听函数push进入指定事件的collection
  this.eventCollection[event].push(callback);
}