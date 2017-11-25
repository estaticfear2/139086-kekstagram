'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var imageSrc = galleryOverlay.querySelector('.gallery-overlay-image');
var likes = galleryOverlay.querySelector('.likes-count');
var comments = galleryOverlay.querySelector('.comments-count');

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

var generateDataArray = function (num) {
  var arr = [];
  var indexComment;
  var currentIndexComment;

  for (var i = 0; i < num; i++) {
    arr[i] = {};
    arr[i]['url'] = 'photos/' + (i + 1) + '.jpg';
    arr[i]['likes'] = randomInteger(15, 250);
    arr[i]['comments'] = [];

    var commentsCount = randomInteger(1, 2);

    for (var j = 0; j < commentsCount; j++) {
      do {
        currentIndexComment = randomInteger(0, 5);
      } while (currentIndexComment === indexComment);

      arr[i]['comments'][j] = USERS_COMMENTS[currentIndexComment];
      indexComment = currentIndexComment;
    }
    indexComment = null;

  }

  return arr;
};

var renderPhoto = function (photo) {
  var element = pictureTemplate.cloneNode(true);

  element.querySelector('img').src = photo['url'];
  element.querySelector('.picture-likes').textContent = photo['likes'];
  element.querySelector('.picture-comments').textContent = photo['comments'];

  return element;
};

var collectPhotos = function (arr, elem) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(elem(arr[i]));
  }

  return fragment;
};

var showOverlayPreview = function (arr, elem) {
  galleryOverlay.classList.remove('hidden');
  imageSrc.src = arr[elem]['url'];
  likes.textContent = arr[elem]['likes'];
  comments.textContent = arr[elem].comments.length;
};

var usersPhotos = generateDataArray(25);

pictures.appendChild(collectPhotos(usersPhotos, renderPhoto));
showOverlayPreview(usersPhotos, 0);
