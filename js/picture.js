'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.picture = {
    renderPhoto: function (photo) {
      var element = pictureTemplate.cloneNode(true);

      element.querySelector('img').src = photo['url'];
      element.querySelector('.picture-likes').textContent = photo['likes'];
      element.querySelector('.picture-comments').textContent = photo['comments'].length;

      return element;
    },
    collectPhotos: function (arr, elem) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(elem(arr[i]));
      }

      return fragment;
    },
  };
})();
