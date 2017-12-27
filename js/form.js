'use strict';

(function () {
  var RESIZE_STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;
  var RESIZE_INIT = 100;

  var PERCENT = 0.01;
  var SATURATION = 3;

  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFile = uploadSelectImage.querySelector('#upload-file');
  var uploadCancel = uploadSelectImage.querySelector('#upload-cancel');
  var uploadEffect = document.querySelector('.upload-effect-controls');
  var effectImage = document.querySelector('.effect-image-preview');
  var uploadResize = document.querySelector('.upload-resize-controls');
  var resizeControls = uploadResize.querySelector('.upload-resize-controls-value');
  var uploadFormSubmit = uploadSelectImage.querySelector('.upload-form-submit');
  var hashTags = uploadSelectImage.querySelector('.upload-form-hashtags');
  var uploadEffectLevel = uploadEffect.querySelector('.upload-effect-level');
  var uploadEffectLevelValue = uploadEffectLevel.querySelector('.upload-effect-level-value');
  var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
  var uploadEffectLine = uploadEffectLevel.querySelector('.upload-effect-level-line');
  var uploadEffectLevelVal = uploadEffectLine.querySelector('.upload-effect-level-val');
  var previewImages = uploadEffect.querySelectorAll('.upload-effect-preview');

  var checkHashTags = function (str) {
    if (!str) {
      return true;
    }

    str = str.toLowerCase();
    var tags = str.match(/(#[\wа-яё]{1,19} {1}){0,4}(#[\wа-яё]{1,19}){1}/g);

    if (!tags || str !== tags[0]) {
      return false;
    }

    var arr = tags[0].split(' ');
    return !arr.some(function (elem, index, array) {
      return array.indexOf(elem) !== index;
    });
  };

  var adjustScale = function (scale) {
    resizeControls.value = scale + '%';
    effectImage.style.transform = 'scale(' + scale * PERCENT + ')';
  };

  var scaleSettings = {
    step: RESIZE_STEP,
    min: RESIZE_MIN,
    max: RESIZE_MAX,
    init: RESIZE_INIT,
    decElem: 'upload-resize-controls-button-dec'
  };

  var setUploadEffectDefault = function () {
    uploadEffectLevel.style.display = 'none';
    uploadEffectLevelValue.style.display = 'none';
    effectImage.className = 'effect-image-preview';
    effectImage.style.filter = 'none';
  };

  var setUploadEffectLevel = function (val, filter) {

    var EFFECTS = {
      'upload-effect-chrome': 'grayscale(' + val + ')',
      'upload-effect-sepia': 'sepia(' + val + ')',
      'upload-effect-marvin': 'invert(' + val / PERCENT + '%)',
      'upload-effect-phobos': 'blur(' + val * SATURATION + 'px)',
      'upload-effect-heat': 'brightness(' + val * SATURATION + ')',
      'upload-effect-none': ''
    };

    effectImage.style.filter = EFFECTS[filter];
  };

  var showSlider = function (filter) {
    uploadEffectLevel.style.display = '';
    effectImage.className = 'effect-image-preview' + ' ' + filter;
  };

  var sliderSettings = {
    'filterElem': uploadEffect,
    'pin': uploadEffectLevelPin,
    'pinLine': uploadEffectLevelVal,
    'filterLine': uploadEffectLine,
    'startValue': uploadEffectLevelValue
  };

  var applyFilter = function (val, filter) {
    setUploadEffectLevel(val, filter);
  };

  var removeResizeHandler = null;
  var removeEffectHandler = null;

  var onUploadOverlayEscPress = function (evt) {
    if (evt.target.className !== 'upload-form-description') {
      window.globals.isEscEvent(evt, onUploadOverlayClose);
    }
  };

  var onUploadOverlayOpen = function () {
    uploadSelectImage.querySelector('.upload-overlay').classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
    removeEffectHandler = window.initializeFilters(applyFilter, setUploadEffectDefault, showSlider, sliderSettings);
    removeResizeHandler = window.initializeScale(uploadResize, adjustScale, scaleSettings);
    uploadFormSubmit.addEventListener('click', onUploadFormSubmit);
    hashTags.addEventListener('change', onChangeHashTags);
  };

  var onUploadOverlayClose = function () {
    uploadSelectImage.querySelector('.upload-overlay').classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
    effectImage.className = 'effect-image-preview';
    removeResizeHandler();
    removeEffectHandler();
    uploadFormSubmit.removeEventListener('click', onUploadFormSubmit);
    hashTags.removeEventListener('change', onChangeHashTags);
    uploadSelectImage.reset();
  };

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();

    if (!checkHashTags(hashTags.value)) {
      hashTags.classList.add('upload-message-error');
      return false;
    }

    window.backend.save(new FormData(uploadSelectImage), onUploadOverlayClose, window.globals.showOnLoadError);
    return true;
  };

  var onChangeHashTags = function () {
    hashTags.classList.toggle('upload-message-error', !checkHashTags(hashTags.value));
  };

  uploadFile.addEventListener('change', function () {
    if (window.onPickFile(uploadFile, effectImage, previewImages)) {
      onUploadOverlayOpen();
    } else {
      window.globals.showOnLoadError('Выберите файл с разрешением: *.jpg, *.jpeg, *.gif, *.png,');
    }
  });

  uploadCancel.addEventListener('click', function () {
    onUploadOverlayClose();
  });

})();
