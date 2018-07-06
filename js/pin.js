'use strict';
(function () {
  // находит шаблон
  var template = document.querySelector('template');

  var templatePin = template.content.querySelector('.map__pin');
  var activePin = null;
  // создаёт pin
  window.pin = {
    renderPin: function (point) {
      var pin = templatePin.cloneNode(true);
      var pinWidth = templatePin.offsetWidth;
      var pinHeight = templatePin.offsetHeight;
      pin.style.left = point.location.x - pinWidth / 2 + 'px';
      pin.style.top = point.location.y - pinHeight + 'px';
      pin.querySelector('img').src = point.author.avatar;
      pin.querySelector('img').alt = point.offer.title;
      pin.addEventListener('click', function () {
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
        pin.classList.add('map__pin--active');
        activePin = pin;
        window.card.fillCard(point);
        document.addEventListener('keydown', window.card.closeEscCardHandler);
      });
      return pin;
    }
  };

})();
