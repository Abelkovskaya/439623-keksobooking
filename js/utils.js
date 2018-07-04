'use strict';

(function () {
  window.utils = {
    map: document.querySelector('.map'),
    generateRandIndex: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    arrayShuffle: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      return array;
    },
    getMainPinCoords: function () {
      var mapPinMain = window.utils.map.querySelector('.map__pin--main');
      var inputAdress = document.querySelector('#address');
      var mapPinMainLeft = mapPinMain.style.left;
      var mapPinMainTop = mapPinMain.style.top;
      var mapPinMainWidth = mapPinMain.offsetWidth;
      var mapPinMainHeight = mapPinMain.offsetHeight;
      var inputAdressLeft = +mapPinMainLeft.substr(0, mapPinMainLeft.length - 2) + mapPinMainWidth / 2;
      var inputAdressTop = +mapPinMainTop.substr(0, mapPinMainTop.length - 2) + mapPinMainHeight;
      inputAdress.value = Math.floor(inputAdressLeft) + ', ' + Math.floor(inputAdressTop);
    }
  };
})();
