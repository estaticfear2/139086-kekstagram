'use strict';

(function () {
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

  window.generateDataArray = function (num) {
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
})();
