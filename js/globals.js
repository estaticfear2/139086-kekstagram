'use strict';

(function () {
  var lastTimeout;

  window.globals = {
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
      node.style.backgroundColor = 'rgba(255, 255, 255, .5)';
      node.style.zIndex = 100;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
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
      lastTimeout = setTimeout(action, 500, context);
    }
  };
})();
