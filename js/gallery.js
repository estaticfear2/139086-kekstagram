'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var pictures = document.querySelector('.pictures');

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var onOverlayPreviewEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onOverlayPreviewClose();
    }
  };

  var onOverlayPreviewOpen = function () {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onOverlayPreviewEscPress);
  };

  var onOverlayPreviewClose = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayPreviewEscPress);
  };

  var usersPhotos = window.generateDataArray(25);

  pictures.appendChild(window.picture.collectPhotos(usersPhotos, window.picture.renderPhoto));

  pictures.addEventListener('click', function (evt) {
    evt.preventDefault();
    var clickedElement = evt.target.closest('.picture');
    window.showOverlayPreview(clickedElement);
    onOverlayPreviewOpen();
  });

  galleryClose.addEventListener('click', function () {
    onOverlayPreviewClose();
  });

  galleryClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onOverlayPreviewClose();
    }
  });
})();
