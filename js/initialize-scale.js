'use strict';

(function () {
  window.initializeScale = function (scaleElement, adjustScale, scaleSettings) {
    var resizeValue = scaleSettings.init;

    var onUploadResize = function (evt) {
      if (evt.target.type === 'button') {
        var shift;

        if (evt.target.classList.contains(scaleSettings.decElem)) {
          if (resizeValue === scaleSettings.min) {
            return;
          }
          shift = resizeValue - scaleSettings.step;
          resizeValue = (shift < scaleSettings.min) ? scaleSettings.min : shift;
        } else {
          if (resizeValue === scaleSettings.max) {
            return;
          }
          shift = resizeValue + scaleSettings.step;
          resizeValue = (shift > scaleSettings.max) ? scaleSettings.max : shift;
        }
      }

      adjustScale(resizeValue);
    };

    scaleElement.addEventListener('click', onUploadResize);


    var removeHandler = function () {
      scaleElement.removeEventListener('click', onUploadResize);
      adjustScale(scaleSettings.init);
    };

    return removeHandler;
  };

})();
