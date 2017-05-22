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
  var bindAll = function() {
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
    clear();
    e.target.classList.add('active');
    var dataTab = e.currentTarget.getAttribute('data-tab');
    //add active class to target
    document.querySelectorAll('[data-tab=' + dataTab +']')[0].classList.add('active');
    document.querySelectorAll('[data-tab=' + dataTab +']')[1].classList.add('active');
  }

  bindAll();
}