'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var pictures = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

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

  var PHOTOS = null;

  var renderPictures = function (data) {
    pictures.appendChild(window.picture.collectPhotos(data, window.picture.renderPhoto));

    if (!PHOTOS) {
      PHOTOS = data;
      PHOTOS.forEach(function (item, i) {
        item.commentsLength = item.comments.length;
        item.recommend = -i;
      });
      filters.classList.remove('filters-inactive');
    }
  };

  var filter = 'recommend';

  var onFilterChange = function (evt) {
    var FILTER = {
      'filter-recommend': 'recommend',
      'filter-popular': 'likes',
      'filter-discussed': 'commentsLength',
      'filter-random': 'filter-random'
    };

    if (evt.target.tagName === 'INPUT') {
      if (filter !== FILTER[evt.target.id]) {
        filter = FILTER[evt.target.id];
      } else {
        return;
      }

      window.globals.clearElem(pictures);

      var byField = function (field) {
        if (arguments[0] === 'filter-random') {
          return function () {
            return Math.random() - 0.5;
          };
        } else {
          return function (a, b) {
            return a[field] > b[field] ? -1 : 1;
          };
        }
      };

      renderPictures(PHOTOS.sort(byField(filter)));
    }
  };

  window.backend.load(renderPictures, window.showOnLoadError);

  filters.addEventListener('click', function (evt) {
    window.globals.debounce(onFilterChange, evt);
  });

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
