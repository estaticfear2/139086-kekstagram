'use strict';

(function () {
  var uploadEffect = document.querySelector('.upload-effect-controls');
  var effectImage = document.querySelector('.effect-image-preview');
  var uploadEffectLevel = uploadEffect.querySelector('.upload-effect-level');
  var uploadEffectLevelValue = uploadEffectLevel.querySelector('.upload-effect-level-value');
  var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
  var uploadEffectLine = uploadEffectLevel.querySelector('.upload-effect-level-line');
  var uploadEffectLevelVal = uploadEffectLine.querySelector('.upload-effect-level-val');

  var renderSlider = function (value) {
    uploadEffectLevelPin.style.left = value + '%';
    uploadEffectLevelVal.style.width = value + '%';
  };

  window.initializeFilters = function (applyFilter, setUploadEffectDefault) {
    var filterName;

    setUploadEffectDefault();

    var onUploadEffectChange = function (evt) {
      var startPinCoords = uploadEffectLevelValue.value;

      filterName = evt.target.closest('input').id.slice(7);
      if (filterName === 'effect-none') {
        setUploadEffectDefault();
        uploadEffectLevelPin.removeEventListener('mousedown', onSliderClick);
        return;
      }

      uploadEffectLevel.style.display = '';
      uploadEffectLevelValue.style.display = 'none';
      effectImage.className = 'effect-image-preview' + ' ' + filterName;
      applyFilter(startPinCoords / 100, filterName);
      renderSlider(startPinCoords);

      uploadEffectLevelPin.addEventListener('mousedown', onSliderClick);
    };

    var onSliderClick = function (clickEvt) {
      clickEvt.preventDefault();

      var pinCoords = uploadEffectLevelPin.getBoundingClientRect().left + window.pageXOffset;
      var shiftX = clickEvt.pageX - pinCoords;
      var lineCoords = uploadEffectLine.getBoundingClientRect().left + window.pageXOffset;
      var sliderWidth = uploadEffectLine.offsetWidth;

      var onSliderMove = function (moveEvt) {
        moveEvt.preventDefault();
        var newPinCoords = moveEvt.pageX - shiftX - lineCoords;
        if (newPinCoords < 0) {
          newPinCoords = 0;
        }

        if (newPinCoords > sliderWidth) {
          newPinCoords = sliderWidth;
        }

        var val = newPinCoords / sliderWidth;
        renderSlider(val * 100);
        applyFilter(val, filterName);
      };

      var onSliderUp = function () {
        document.removeEventListener('mousemove', onSliderMove);
        document.removeEventListener('mouseup', onSliderUp);
      };

      document.addEventListener('mousemove', onSliderMove);
      document.addEventListener('mouseup', onSliderUp);

    };

    uploadEffect.addEventListener('change', onUploadEffectChange);

    window.initializeFilters.removeEffectHandler = function () {
      uploadEffectLevelPin.removeEventListener('mousedown', onSliderClick);
      uploadEffect.removeEventListener('change', onUploadEffectChange);
    };
  };

})();
