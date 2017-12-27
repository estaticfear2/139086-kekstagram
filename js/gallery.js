'use strict';

(function () {
  var FILTER = {
    'filter-recommend': 'recommend',
    'filter-popular': 'likes',
    'filter-discussed': 'commentsLength',
    'filter-random': 'filter-random'
  };

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var pictures = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  var photos = null;

  var renderPictures = function (data) {
    pictures.appendChild(window.picture.collect(data, window.picture.render));

    if (!photos) {
      photos = data;
      photos.forEach(function (item, i) {
        item.commentsLength = item.comments.length;
        item.recommend = -i;
      });
      filters.classList.remove('filters-inactive');
    }
  };

  var onOverlayPreviewEscPress = function (evt) {
    window.globals.isEscEvent(evt, onOverlayPreviewClose);
  };

  var onOverlayPreviewOpen = function () {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onOverlayPreviewEscPress);
  };

  var onOverlayPreviewClose = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayPreviewEscPress);
  };

  var onFilterChange = function (evt) {
    var filter;

    if (evt.target.tagName === 'INPUT') {
      if (filter !== FILTER[evt.target.id]) {
        filter = FILTER[evt.target.id];
      } else {
        return;
      }

      window.globals.clear(pictures);

      photos.sort(function (a, b) {
        if (filter !== 'filter-random') {
          return a[filter] > b[filter] ? -1 : 1;
        }
        return Math.random() - 0.5;
      });
      renderPictures(photos);
    }
  };

  window.backend.load(renderPictures, window.globals.showOnLoadError);

  filters.addEventListener('click', function (evt) {
    window.globals.debounce(onFilterChange, evt);
  });

  pictures.addEventListener('click', function (evt) {
    evt.preventDefault();

    var clickedElement = evt.target.closest('.picture');

    if (!clickedElement) {
      return;
    }

    window.showOverlayPreview(clickedElement);
    onOverlayPreviewOpen();
  });

  galleryClose.addEventListener('click', function () {
    onOverlayPreviewClose();
  });

  galleryClose.addEventListener('keydown', function (evt) {
    window.globals.isEnterEvent(evt, onOverlayPreviewClose);
  });
})();
