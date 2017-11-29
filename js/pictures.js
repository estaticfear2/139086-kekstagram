'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var imageSrc = galleryOverlay.querySelector('.gallery-overlay-image');
var likes = galleryOverlay.querySelector('.likes-count');
var comments = galleryOverlay.querySelector('.comments-count');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var USERS_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max - min + 1);
  rand = Math.floor(rand);
  return rand;
};

var generateRandArrayFromSubArray = function (subArray, a, b) {
  var arr = [];
  var copySubArray = subArray.slice();
  var commentsCount = randomInteger(a, Math.min(b, subArray.length));
  var indexComment;

  for (var j = 0; j < commentsCount; j++) {
    indexComment = randomInteger(0, copySubArray.length - 1);
    arr[j] = copySubArray.splice(indexComment - 1, 1)[0];
  }

  return arr;
};

var generateDataArray = function (num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: generateRandArrayFromSubArray(USERS_COMMENTS, 1, 2)
    };
  }

  return arr;
};

var renderPhoto = function (photo) {
  var element = pictureTemplate.cloneNode(true);

  element.querySelector('img').src = photo['url'];
  element.querySelector('.picture-likes').textContent = photo['likes'];
  element.querySelector('.picture-comments').textContent = photo['comments'].length;

  return element;
};

var collectPhotos = function (arr, elem) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(elem(arr[i]));
  }

  return fragment;
};

var showOverlayPreview = function (evt) {
  var currentImage = evt;

  imageSrc.src = currentImage.children[0].src;
  likes.textContent = currentImage.querySelector('.picture-likes').textContent;
  comments.textContent = currentImage.querySelectorAll('.picture-comments').length;
};

var usersPhotos = generateDataArray(25);

pictures.appendChild(collectPhotos(usersPhotos, renderPhoto));

pictures.addEventListener('click', function (evt) {
  evt.preventDefault();

  var clickedElement = evt.target.closest('.picture');

  showOverlayPreview(clickedElement);
  onOverlayPreviewOpen();
});

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

galleryClose.addEventListener('click', function () {
  onOverlayPreviewClose();
});

galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onOverlayPreviewClose();
  }
});
