'use strict';

(function () {
  window.onPickFile = function (file, uploadImage, previewImages) {
    var pickedFile = file.files[0];
    var fileName = pickedFile.name;
    var matches = fileName.match(/\.(gif|jpg|jpeg|png)$/gi);
    var isImage = false;

    var onLoadPickedFile = function () {
      uploadImage.src = reader.result;

      for (var i = 0; i < previewImages.length; i++) {
        previewImages[i].style.backgroundImage = 'url(' + reader.result + ')';
      }
      reader.removeEventListener('load', onLoadPickedFile);
    };

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', onLoadPickedFile);
      reader.readAsDataURL(pickedFile);
      isImage = true;
    }

    return isImage;
  };
})();
