'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var imageSrc = galleryOverlay.querySelector('.gallery-overlay-image');
var likes = galleryOverlay.querySelector('.likes-count');
var comments = galleryOverlay.querySelector('.comments-count');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadCancel = uploadSelectImage.querySelector('#upload-cancel');
var uploadEffect = document.querySelector('.upload-effect-controls');
var effectImage = document.querySelector('.effect-image-preview');
var uploadResize = document.querySelector('.upload-resize-controls');
var resizeControls = uploadResize.querySelector('.upload-resize-controls-value');
var resizeValue = parseInt(resizeControls.getAttribute('value'), 10);
var uploadFormSubmit = uploadSelectImage.querySelector('.upload-form-submit');
var hashTags = uploadSelectImage.querySelector('.upload-form-hashtags');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var RESIZE_STEP = 25;
var RESIZE_MIN = 25;
var RESIZE_MAX = 100;

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

var checkHashTags = function (str) { 
  var regexp = /#[\d\w_!]{1,19}/gi;
  var arr = str.match(regexp);
  var obj = {};

  if (!arr || arr.length > 5 || str !== arr.join(' ')) {
    return false;
  }
  
  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    obj[value] = true;
  }

  if (arr.length !== Object.keys(obj).length) {
    return false;
  } 
  
  return true;
};

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

var onUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target.className !== 'upload-form-description') {
    onUploadOverlayClose();
  }
};

var onUploadOverlayOpen = function () {
  uploadSelectImage.querySelector('.upload-overlay').classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
  uploadEffect.addEventListener('change', onUploadEffect);
  uploadResize.addEventListener('click', onUploadResize);
  effectImage.style.transform = 'scale(' + resizeValue / 100 + ')';
  uploadFormSubmit.addEventListener('click', onUploadFormSubmit);
  hashTags.addEventListener('change', onChangeHashTags);
};

var onUploadOverlayClose = function () {
  uploadSelectImage.querySelector('.upload-overlay').classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
  uploadEffect.removeEventListener('change', onUploadEffect);
  effectImage.className = 'effect-image-preview';
  uploadResize.removeEventListener('click', onUploadResize);
  resizeValue = parseInt(resizeControls.getAttribute('value'), 10);
  effectImage.style.transform = 'scale(' + resizeValue / 100 + ')';
  uploadFormSubmit.removeEventListener('click', onUploadFormSubmit);
  hashTags.removeEventListener('change', onChangeHashTags);
  uploadSelectImage.reset();
};

var onUploadEffect = function (evt) {
  var filterName = evt.target.closest('input').id.slice(7);
  effectImage.className = 'effect-image-preview' + ' ' + filterName;
};

var onUploadResize = function (evt) {
  if (evt.target.type === 'button') {
    
    if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
      if (resizeValue === RESIZE_MIN) {
        return;
      }
      var shift = resizeValue - RESIZE_STEP;
      resizeValue = (shift < RESIZE_MIN) ? RESIZE_MIN : shift; 
    } else {
      if (resizeValue === RESIZE_MAX) {
        return;
      }
      var shift = resizeValue + RESIZE_STEP;
      resizeValue = (shift > RESIZE_MAX) ? RESIZE_MAX : shift;
    }
  }
  
  resizeControls.value = resizeValue + '%';
  effectImage.style.transform = 'scale(' + resizeValue / 100 + ')';   
};

var onUploadFormSubmit = function (evt) {
  evt.preventDefault();

  if (!checkHashTags(hashTags.value)) {
    hashTags.classList.add('upload-message-error');
    return false;
  }

  uploadSelectImage.submit();
  uploadSelectImage.reset();
  return true;
};

var onChangeHashTags = function () {
  if (!checkHashTags(hashTags.value)) {
    hashTags.classList.add('upload-message-error');
    return false;
  } else {
    hashTags.classList.remove('upload-message-error');
  }
  return true;
};

var usersPhotos = generateDataArray(25);

pictures.appendChild(collectPhotos(usersPhotos, renderPhoto));

pictures.addEventListener('click', function (evt) {
  evt.preventDefault();
  var clickedElement = evt.target.closest('.picture');
  showOverlayPreview(clickedElement);
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

uploadFile.addEventListener('change', function () {
  onUploadOverlayOpen();
});

uploadCancel.addEventListener('click', function () {
  onUploadOverlayClose();
});
