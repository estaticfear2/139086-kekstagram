'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.picture = {
    renderElement: function (photo) {
      var element = pictureTemplate.cloneNode(true);

      element.querySelector('img').src = photo['url'];
      element.querySelector('.picture-likes').textContent = photo['likes'];
      element.querySelector('.picture-comments').textContent = photo['comments'].length;

      return element;
    },
    collectElements: function (arr, elem) {
      var fragment = document.createDocumentFragment();

      arr.forEach(function (item) {
        return fragment.appendChild(elem(item));
      });

      return fragment;
    }
  };
})();
