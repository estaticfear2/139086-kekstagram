'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var RESIZE_STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;

  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFile = uploadSelectImage.querySelector('#upload-file');
  var uploadCancel = uploadSelectImage.querySelector('#upload-cancel');
  var uploadEffect = document.querySelector('.upload-effect-controls');
  var effectImage = document.querySelector('.effect-image-preview');
  var uploadResize = document.querySelector('.upload-resize-controls');
  var resizeControls = uploadResize.querySelector('.upload-resize-controls-value');
  var resizeValue = parseInt(resizeControls.getAttribute('value'), 10);
  var uploadFormSubmit = uploadSelectImage.querySelector('.upload-form-submit');
  var hashTags = uploadSelectImage.querySelector('.upload-form-hashtags');

  var checkHashTags = function (str) {
    if (!str) {
      return true;
    }

    var tags = str.match(/(#[\wа-яё]{1,19} {1}){0,4}(#[\wа-яё]{1,19}){1}/gi);
    if (!tags || str !== tags[0]) {
      return false;
    }

    var arr = tags[0].split(' ');
    return !arr.some(function (elem, index, array) {
      return array.indexOf(elem) !== index;
    });
  };

  var onUploadOverlayEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target.className !== 'upload-form-description') {
      onUploadOverlayClose();
    }
  };

  var onUploadOverlayOpen = function () {
    uploadSelectImage.querySelector('.upload-overlay').classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
    uploadEffect.addEventListener('change', onUploadEffect);
    uploadResize.addEventListener('click', onUploadResize);
    effectImage.style.transform = 'scale(' + resizeValue / 100 + ')';
    uploadFormSubmit.addEventListener('click', onUploadFormSubmit);
    hashTags.addEventListener('change', onChangeHashTags);
  };

  var onUploadOverlayClose = function () {
    uploadSelectImage.querySelector('.upload-overlay').classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
    uploadEffect.removeEventListener('change', onUploadEffect);
    effectImage.className = 'effect-image-preview';
    uploadResize.removeEventListener('click', onUploadResize);
    resizeValue = parseInt(resizeControls.getAttribute('value'), 10);
    effectImage.style.transform = 'scale(' + resizeValue / 100 + ')';
    uploadFormSubmit.removeEventListener('click', onUploadFormSubmit);
    hashTags.removeEventListener('change', onChangeHashTags);
    uploadSelectImage.reset();
  };

  var onUploadEffect = function (evt) {
    var filterName = evt.target.closest('input').id.slice(7);
    effectImage.className = 'effect-image-preview' + ' ' + filterName;
  };

  var onUploadResize = function (evt) {
    if (evt.target.type === 'button') {
      var shift;

      if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
        if (resizeValue === RESIZE_MIN) {
          return;
        }
        shift = resizeValue - RESIZE_STEP;
        resizeValue = (shift < RESIZE_MIN) ? RESIZE_MIN : shift;
      } else {
        if (resizeValue === RESIZE_MAX) {
          return;
        }
        shift = resizeValue + RESIZE_STEP;
        resizeValue = (shift > RESIZE_MAX) ? RESIZE_MAX : shift;
      }
    }

    resizeControls.value = resizeValue + '%';
    effectImage.style.transform = 'scale(' + resizeValue / 100 + ')';
  };

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();

    if (!checkHashTags(hashTags.value)) {
      hashTags.classList.add('upload-message-error');
      return false;
    }

    uploadSelectImage.submit();
    uploadSelectImage.reset();
    return true;
  };

  var onChangeHashTags = function () {
    hashTags.classList.toggle('upload-message-error', !checkHashTags(hashTags.value));
  };

  uploadFile.addEventListener('change', function () {
    onUploadOverlayOpen();
  });

  uploadCancel.addEventListener('click', function () {
    onUploadOverlayClose();
  });


})();
