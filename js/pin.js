'use strict';

// указатель
var MIN_Y = 130;
var MAX_Y = 630;

(function () {
  var mapPinMain = window.utils.map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  // находит элементы для пинов
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('template');
  var templatePin = template.content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = templatePin.cloneNode(true);
    var mapPinWidth = 50;
    var mapPinHeight = 70;

    pinElement.style.left = pin.location.x - mapPinWidth / 2 + 'px';
    pinElement.style.top = pin.location.y - mapPinHeight + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };

  // рисует пины
  var paintPins = function () {
    var fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < window.points.length; i++) {
      fragmentPin.appendChild(renderPin(window.points[i]));
    }
    pins.appendChild(fragmentPin);
  };
  paintPins();

  var mapPin = window.utils.map.querySelectorAll('button[type=button]');
  var hidePins = function () {
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].classList.add('hidden');
    }
  };
  hidePins();

  var showPins = function () {
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].classList.remove('hidden');
    }
  };

  // ПЕРЕТАСКИВАНИЕ МАРКЕРА
  var onMapPinMainMouseDown = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMapPinMainMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.x,
        y: moveEvt.y
      };

      var mapWidth = window.utils.map.offsetWidth;
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      var borderX = mapPinMain.offsetLeft - shift.x;
      var borderY = mapPinMain.offsetTop - shift.y;

      if (borderX > (mapWidth - mapPinMain.offsetWidth)) {
        mapPinMain.style.left = mapWidth - mapPinMain.offsetWidth + 'px';
      }
      if (borderX < (mapWidth - mapWidth)) {
        mapPinMain.style.left = (mapWidth - mapWidth) + 'px';
      }
      if (borderY < (MIN_Y - mapPinMain.offsetHeight)) {
        mapPinMain.style.top = (MIN_Y - mapPinMain.offsetHeight) + 'px';
      }
      if (borderY > MAX_Y) {
        mapPinMain.style.top = MAX_Y + 'px';
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMapPinMainMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.utils.getMainPinCoords();

      // удаляет плашку если она есть
      if (window.utils.map.classList.contains('map--faded')) {
        window.utils.map.classList.remove('map--faded');
      }
      // удаляет плашку с формы
      if (adForm.classList.contains('ad-form--disabled')) {
        adForm.classList.remove('ad-form--disabled');
      }
      // вызов функции показа пинов
      showPins();

      // вызов функции активации формы
      window.acivateForm();
    };

    document.addEventListener('mousemove', onMapPinMainMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
})();
