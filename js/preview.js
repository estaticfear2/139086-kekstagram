'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var imageSrc = galleryOverlay.querySelector('.gallery-overlay-image');
  var likes = galleryOverlay.querySelector('.likes-count');
  var comments = galleryOverlay.querySelector('.comments-count');

  window.showOverlayPreview = function (evt) {
    var currentImage = evt;

    imageSrc.src = currentImage.children[0].src;
    likes.textContent = currentImage.querySelector('.picture-likes').textContent;
    comments.textContent = currentImage.querySelectorAll('.picture-comments').length;
  };
})();
