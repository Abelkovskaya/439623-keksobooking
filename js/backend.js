'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_TIME = 10000;
  var SUCCESS_STATUS = 200;
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ошибки: ' + xhr.status + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;

    return xhr;
  };
  var deleteErrorMessage = function () { // удаление сообщения об ошибке
    var body = document.querySelector('body');
    var errorDiv = document.querySelector('.error__message');
    body.removeChild(errorDiv);
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    download: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    onErrorMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.classList.add('error__message');
      node.style.zIndex = 100;
      node.style.width = '50%';
      node.style.transform = 'translateX(-50%) translateY(-50%)';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.backgroundColor = '#DC143C';
      node.style.fontWeight = 'bold';
      node.style.position = 'fixed';
      node.style.top = '50%';
      node.style.left = '50%';
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      setTimeout(deleteErrorMessage, 3000);
    }
  };

})();
