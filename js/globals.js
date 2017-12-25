'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var SHOW_ERROR_TIME = 5000;
  var DEBOUNCE_TIMEOUT = 500;

  var lastTimeout;

  window.globals = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    showOnLoadError: function (errorMessage) {
      var node = document.createElement('div');
      node.style.marginTop = 0;
      node.style.marginLeft = 'auto';
      node.style.marginRight = 'auto';
      node.style.padding = '10px';
      node.style.position = 'absolute';
      node.style.width = '70%';
      node.style.textAlign = 'center';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '20px';
      node.style.color = 'black';
      node.style.backgroundColor = 'rgba(255, 255, 255, .8)';
      node.style.zIndex = 100;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);

      var timer = setTimeout(function () {
        node.parentNode.removeChild(node);
        clearTimeout(timer);
      }, SHOW_ERROR_TIME);
    },
    clearElem: function (elem) {
      for (var i = elem.children.length - 1; i >= 0; i--) {
        elem.removeChild(elem.children[i]);
      }
    },
    debounce: function (action, context) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(action, DEBOUNCE_TIMEOUT, context);
    }
  };
})();
