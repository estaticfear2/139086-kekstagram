'use strict';

(function () {
  window.onPickFile = function (file, uploadImage, previewImages) {
    var reader = new FileReader();
    var pickedFile = file.files[0];
    var fileName = pickedFile.name;
    var matches = fileName.match(/\.(gif|jpg|jpeg|png)$/gi);
    var isImage = Boolean(matches);

    var onLoadPickedFile = function () {
      uploadImage.src = reader.result;

      for (var i = 0; i < previewImages.length; i++) {
        previewImages[i].style.backgroundImage = 'url(' + uploadImage.src + ')';
      }
      reader.removeEventListener('load', onLoadPickedFile);
    };

    if (matches) {
      reader.addEventListener('load', onLoadPickedFile);
      reader.readAsDataURL(pickedFile);
    }

    return isImage;
  };
})();
