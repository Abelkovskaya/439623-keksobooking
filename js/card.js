'use strict';
(function () {
  // работа с карточкой объявления
  var ESC_KEY = 27;
  var HOUSE_TYPES = {
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    flat: 'Квартира'
  };

  var template = document.querySelector('template');
  // находит элементы для карточки
  var templateCard = template.content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var closeEscCardHandler = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      closeClickHandler();
    }
  };
  var closeClickHandler = function () {
    var adCard = map.querySelector('article');
    var activePin = map.querySelector('.map__pin--active');
    adCard.classList.add('hidden'); // делаем карточку невидимой
    if (activePin) {
      activePin.classList.remove('map__pin--active'); // убираем активный пин
    }
    document.removeEventListener('keydown', closeEscCardHandler);
  };


  // создаёт список фич
  var renderFeatures = function (arrFeatures) {
    var fragmentFeatures = document.createDocumentFragment();
    var newFeatureElement;
    for (var i = 0; i < arrFeatures.length; i++) {
      newFeatureElement = document.createElement('li');
      newFeatureElement.className = 'popup__feature popup__feature--' + arrFeatures[i];
      fragmentFeatures.appendChild(newFeatureElement);
    }
    return fragmentFeatures;
  };
  // список фото
  var renderPhotos = function (arrPhotos) {
    var photosContainer = document.createDocumentFragment();
    var templatePhoto = template.content.querySelector('.popup__photo');
    for (var i = 0; i < arrPhotos.length; i++) {
      var photoElement = templatePhoto.cloneNode(true);
      photoElement.src = arrPhotos[i];
      photosContainer.appendChild(photoElement);
    }
    return photosContainer;
  };
  // создаёт карточку с данными
  window.card = {
    renderCard: function (ad) {
      var card = templateCard.cloneNode(true);
      card.querySelector('.popup__title').textContent = ad.offer.title;
      card.querySelector('.popup__text--address').textContent = ad.offer.address;
      card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = HOUSE_TYPES[ad.offer.type];
      card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      card.querySelector('.popup__features').textContent = '';
      card.querySelector('.popup__features').appendChild(renderFeatures(ad.offer.features));
      card.querySelector('.popup__description').textContent = ad.offer.description;
      card.querySelector('.popup__photos').textContent = '';
      card.querySelector('.popup__photos').appendChild(renderPhotos(ad.offer.photos));
      card.querySelector('.popup__avatar').src = ad.author.avatar;
      return card;
    },
    fillCard: function (ad) {
      var adCard = map.querySelector('article');
      adCard.querySelector('.popup__title').textContent = ad.offer.title;
      adCard.querySelector('.popup__text--address').textContent = ad.offer.address;
      adCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
      adCard.querySelector('.popup__type').textContent = HOUSE_TYPES[ad.offer.type];
      adCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      adCard.querySelector('.popup__features').textContent = '';
      adCard.querySelector('.popup__features').appendChild(renderFeatures(ad.offer.features));
      adCard.querySelector('.popup__description').textContent = ad.offer.description;
      adCard.querySelector('.popup__photos').textContent = '';
      adCard.querySelector('.popup__photos').appendChild(renderPhotos(ad.offer.photos));
      adCard.querySelector('.popup__avatar').src = ad.author.avatar;
      adCard.classList.remove('hidden');
      return adCard;
    },
    closeClickHandler: closeClickHandler,
    closeEscCardHandler: closeEscCardHandler
  };
})();
