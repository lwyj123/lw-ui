;(function() {
    'use strict';
    
    var Popup = function() {
        // this.el = typeof el === 'object' ? el : document.getElementById(el);
        var self = this;
        // For check current popup type
        this.type = 'alert';
        
        // Set default params
        this.params = {};
        this.setParams();
        
        this.wrap = document.createElement('div');
        this.wrap.id = 'lwPopupWrap';
        document.body.appendChild(this.wrap);
        this.wrap.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (e.target == self.wrap) self.close('noActionCancel');

            // TODO: settings: close on click
            if (e.target.className.indexOf('lwPopupButton') != -1) {
                self.close(e.target.className.match(/_(.*)_/)[1]);
            }
        });
    }
    
    Popup.prototype.setParams = function (params, callback) {
        this.params.title = document.title;
        this.params.callback = null;
        this.params.buttons = (this.type == 'alert') ? {ok: 'Ok'} : {ok: 'Ok', cancel: 'Cancel'};
        this.params.inputs = {name: 'Please, enter your name'};

        //TODO: a better way to combine
        if (params) {
            if (typeof params == 'object') {
                params = params;
                if (callback && typeof callback == 'function') params.callback = callback;
            } else if (typeof params == 'function') {
                params = {callback: params};
            }
        } else params = {};

        for (var p in params) if (this.params.hasOwnProperty(p)) this.params[p] = params[p];
    }

    Popup.prototype.show = function () {
        var self = this;
        this.wrap.className = 'open';
        //20毫秒后放大
        setTimeout(function(){
            self.wrap.className = 'open pop';
        }, 20);
    }

    Popup.prototype.close = function (confirm) {
        var self = this;
        this.wrap.className = 'open';
        setTimeout(function() {
            self.wrap.className = '';
            var result = {confirm: confirm};
            
            var inputs = self.wrap.getElementsByTagName('input'); 
            for (var i = inputs.length; --i >= 0;) result[inputs[i].name] = inputs[i].value; 
            
            if (self.params.callback) self.params.callback.call(self, result);
        }, 300);
    }

    Popup.prototype.alert = function (p, c) {
        this.type = 'alert';
        this.setParams(p, c);
        
        var buttonsHtml = '';

        for (var i in this.params.buttons) {
            buttonsHtml += `<span class="lwPopupButton _${i}_">${this.params.buttons[i]}</span>`;
        }

        this.wrap.innerHTML = `<div>
                                <div>
                                    <div class="lwPopupTitle">${this.params.title}</div>
                                    ${buttonsHtml}
                                </div>
                               </div>`;
        this.show();
    }
    
    Popup.prototype.confirm = function (p, c) {
        this.type = 'confirm';
        this.setParams(p, c);
        
        var buttonsHtml = '';
        for (var i in this.params.buttons) buttonsHtml += '<span class="lwPopupButton _'+i+'_">'+this.params.buttons[i]+'</span>';

        this.wrap.innerHTML =   `<div>
                                  <div>
                                    <div class="lwPopupTitle">${this.params.title}</div>
                                    ${buttonsHtml}
                                  </div>
                                </div>`;
        this.show();
    }
    
    Popup.prototype.prompt = function (p, c) {
        this.type = 'prompt';
        this.setParams(p, c);
        
        var inputsHtml = '', tabIndex = 0;
        for (var i in this.params.inputs) inputsHtml += `<label for="lwPopupInputs_${i}">${this.params.inputs[i]}</label><input id="purePopupInputs_${i}" name="${i}" type="text" tabindex="${(tabIndex++)}">`;
        
        var buttonsHtml = '';
        for (var i in this.params.buttons) buttonsHtml += `<span class="lwPopupButton _${i}_">${this.params.buttons[i]}</span>`;

        this.wrap.innerHTML =  `<div>
                                  <div>
                                    <div class="lwPopupTitle">${this.params.title}</div>
                                    ${inputsHtml}
                                    ${buttonsHtml}
                                  </div>
                                </div>`;
        this.show();
    }
    
    window.PurePopup = new Popup();
}());