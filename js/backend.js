'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';

  var load = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = load(null, onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onUpload, onError) {
      var xhr = load(data, onUpload, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
