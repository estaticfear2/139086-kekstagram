'use strict';

(function () {
  var PERCENT = 0.01;

  window.initializeFilters = function (applyFilter, setUploadEffectDefault, showSlider, settings) {
    var filterName;

    var renderSlider = function (value) {
      settings.pin.style.left = value + '%';
      settings.pinLine.style.width = value + '%';
    };

    var onUploadEffectChange = function (evt) {
      var startPinCoords = settings.startValue.value;

      filterName = evt.target.closest('input').id;
      if (filterName === 'upload-effect-none') {
        setUploadEffectDefault();
        settings.pin.removeEventListener('mousedown', onSliderClick);
        return;
      }

      showSlider(filterName);
      applyFilter(startPinCoords * PERCENT, filterName);
      renderSlider(startPinCoords);

      settings.pin.addEventListener('mousedown', onSliderClick);
    };

    var onSliderClick = function (clickEvt) {
      clickEvt.preventDefault();

      var pinCoords = settings.pin.getBoundingClientRect().left + window.pageXOffset;
      var shiftX = clickEvt.pageX - pinCoords;
      var lineCoords = settings.filterLine.getBoundingClientRect().left + window.pageXOffset;
      var sliderWidth = settings.filterLine.offsetWidth;

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
        renderSlider(val / PERCENT);
        applyFilter(val, filterName);
      };

      var onSliderUp = function () {
        document.removeEventListener('mousemove', onSliderMove);
        document.removeEventListener('mouseup', onSliderUp);
      };

      document.addEventListener('mousemove', onSliderMove);
      document.addEventListener('mouseup', onSliderUp);

    };

    setUploadEffectDefault();
    settings.filterElem.addEventListener('change', onUploadEffectChange);

    var removeHandler = function () {
      settings.pin.removeEventListener('mousedown', onSliderClick);
      settings.filterElem.removeEventListener('change', onUploadEffectChange);
    };

    return removeHandler;
  };

})();
