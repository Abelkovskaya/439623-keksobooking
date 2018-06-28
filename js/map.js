'use strict';

// типы вариантов размещения
var HOUSE_TYPES = {
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  flat: 'Квартира'
};

// массивы данных
var TITLE_NAMES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OBJECT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_SERVICES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARR = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var NOT_FOR_GUESTS = '100';

// нахожу указанные в задании элементы
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = map.querySelector('.map__pin--main');
var inputAdress = document.querySelector('#address');

// делаю поля формы неактивными
var disableForm = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }
};
disableForm();

// получаю координаты и вывожу в неактивную страницу
var getMainPinCoords = function () {
  var mapPinMainLeft = mapPinMain.style.left;
  var mapPinMainTop = mapPinMain.style.top;
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var inputAdressLeft = +mapPinMainLeft.substr(0, mapPinMainLeft.length - 2) + mapPinMainWidth / 2;
  var inputAdressTop = +mapPinMainTop.substr(0, mapPinMainTop.length - 2) + mapPinMainHeight;
  inputAdress.value = Math.floor(inputAdressLeft) + ', ' + Math.floor(inputAdressTop);
};
getMainPinCoords();

// показываю пины
var showPins = function () {
  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].classList.remove('hidden');
  }
};

// активирую поля формы
var acivateForm = function () {
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].removeAttribute('disabled', '');
  }
};

// функция перевода страницы в активный режим
var onMapPinMainMouseUp = function () {
  // удаляет плашку
  map.classList.remove('map--faded');

  // вызов функции показа пинов
  showPins();

  // удаляю плашку с формы
  adForm.classList.remove('ad-form--disabled');

  // вызываю функции активации формы
  acivateForm();

  // получает новые координаты и выводит в активную страницу
  getMainPinCoords();
};
// обработчик события на главном пине - активация страницы
mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);

// генерация случайного числа
var generateRandIndex = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// перемешивание массива
var arrayShuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

// создаю объекты
var createObjects = function (quantity) {
  var objects = [];
  var obj = {};

  // создаю пустой массив для цифр аватара
  var numbersAvatar = [];

  // заполняю пустой массив для цифр аватара данными
  for (var j = 0; j < quantity; j++) {
    numbersAvatar[j] = j + 1;
  }
  // перемешиваю массив цифр
  arrayShuffle(numbersAvatar);
  // перемешиваю массив title
  arrayShuffle(TITLE_NAMES);

  for (var i = 0; i < quantity; i++) {
    // создаю пустой объект
    obj = {};
    obj.author = {};
    obj.offer = {};
    obj.location = {};

    /*if (numbersAvatar[i] <= 9) {
      obj.author.avatar = 'img/avatars/user0' + numbersAvatar[i] + '.png';
    } else {
      obj.author.avatar = 'img/avatars/user' + numbersAvatar[i] + '.png';
    }*/
    var avatarnumber = numbersAvatar[i] <= 9 ? '0' + numbersAvatar[i] : numbersAvatar[i];
    obj.author.avatar = 'img/avatars/user' + avatarnumber + '.png';

    obj.offer.title = TITLE_NAMES[i];
    obj.location.x = generateRandIndex(300, 900);
    obj.location.y = generateRandIndex(130, 630);
    obj.offer.address = obj.location.x + ', ' + obj.location.y;
    obj.offer.price = generateRandIndex(1000, 1000000);
    obj.offer.type = OBJECT_TYPE[generateRandIndex(0, OBJECT_TYPE.length - 1)];
    obj.offer.rooms = generateRandIndex(1, 5);
    obj.offer.guests = generateRandIndex(1, 8);
    obj.offer.checkin = CHECKIN_TIMES[generateRandIndex(0, CHECKIN_TIMES.length - 1)];
    obj.offer.checkout = obj.offer.checkin;

    var NEW_FEATURES_SERVICES = FEATURES_SERVICES.slice();
    arrayShuffle(NEW_FEATURES_SERVICES);
    NEW_FEATURES_SERVICES.length = generateRandIndex(0, NEW_FEATURES_SERVICES.length);
    obj.offer.features = NEW_FEATURES_SERVICES;

    obj.offer.description = '';
    var NEW_PHOHTOS_ARR = PHOTOS_ARR.slice();
    obj.offer.photos = arrayShuffle(NEW_PHOHTOS_ARR);
    objects.push(obj);
  }
  return objects;
};

// вызываю создателя объектов
var points = createObjects(8);

// создаю пин
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

// находит шаблон
var template = document.querySelector('template');

// находит элементы для пинов
var pins = document.querySelector('.map__pins');
var templatePin = template.content.querySelector('.map__pin');

// рисует пины
var paintPins = function () {
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < points.length; i++) {
    fragmentPin.appendChild(renderPin(points[i]));
  }
  pins.appendChild(fragmentPin);
};
paintPins();

// создаю список удобств
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

// создаёт список фоток
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
var renderCard = function (renderObj) {
  var card = templateCard.cloneNode(true);

  card.querySelector('.popup__title').textContent = renderObj.offer.title;
  card.querySelector('.popup__text--address').textContent = renderObj.offer.address;
  card.querySelector('.popup__text--price').textContent = renderObj.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = HOUSE_TYPES[renderObj.offer.type];
  card.querySelector('.popup__text--capacity').textContent = renderObj.offer.rooms + ' комнаты для ' + renderObj.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + renderObj.offer.checkin + ', выезд до ' + renderObj.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(renderFeatures(renderObj.offer.features));
  card.querySelector('.popup__description').textContent = renderObj.offer.description;
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(renderPhotos(renderObj.offer.photos));
  card.querySelector('.popup__avatar').src = renderObj.author.avatar;

  return card;
};

// находит элементы для карточки
var templateCard = template.content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

// создаёт карточку при клике на пин
var renderFinalCard = function (evt) {
  var currentImg = evt.currentTarget.querySelector('img');
  var srcFrom = currentImg.src.search('img/avatars/user');
  var srcTo = currentImg.src.length;
  var currentSrc = currentImg.src.substr(srcFrom, srcTo);
  var articleCard = map.querySelector('article');

  for (var i = 0; i < points.length; i++) {
    if (currentSrc === points[i].author.avatar) {
      if (!articleCard) {
        map.insertBefore(renderCard(points[i]), mapFiltersContainer);
      } else {
        articleCard.remove();
        map.insertBefore(renderCard(points[i]), mapFiltersContainer);
      }
    }
  }
};

// вешает обработчик на все пины и скрывает их
var mapPin = map.querySelectorAll('button[type=button]');
for (var i = 0; i < mapPin.length; i++) {
  mapPin[i].classList.add('hidden');
  mapPin[i].addEventListener('click', renderFinalCard);
}

// вешает обработчик на карту и отлавливает клик по крестику
var onMapClick = function (evt) {
  var cardClose = map.querySelector('.popup__close');
  var articleCard = map.querySelector('article');
  if (evt.target === cardClose) {
    articleCard.remove();
  }
};
map.addEventListener('click', onMapClick);


// ВАЛИДАЦИЯ ФОРМ
var inputRooms = adForm.querySelector('select#room_number');
var inputGuests = adForm.querySelector('select#capacity');
var inputType = adForm.querySelector('select#type');
var inputTimeIn = adForm.querySelector('select#timein');
var inputTimeOut = adForm.querySelector('select#timeout');

// проверка полей комнат и гостей при изменении поля с гостями
var onInputGuestsChange = function () {
  if (inputRooms.value === NOT_FOR_GUESTS && inputGuests.value !== '0') {
    displayError();
  } else if (inputRooms.value !== NOT_FOR_GUESTS && (inputRooms.value < inputGuests.value || inputGuests.value < 1)) {
    displayError();
  } else {
    inputGuests.setCustomValidity('');
  }
};
inputGuests.addEventListener('change', onInputGuestsChange);

// проверка полей комнат и гостей при изменении поля с комнатами
var onInputRoomsChange = function () {
  if (inputRooms.value === NOT_FOR_GUESTS && inputGuests.value !== '0') {
    displayError();
  } else if (inputRooms.value !== NOT_FOR_GUESTS && (inputRooms.value < inputGuests.value || inputGuests.value < 1)) {
    displayError();
  } else {
    inputGuests.setCustomValidity('');
  }
};
inputRooms.addEventListener('change', onInputRoomsChange);

var displayError = function () {
  inputGuests.setCustomValidity('Кол-во гостей не может быть больше кол-ва комнат. Только "100 комнат" для "не для гостей"');
};

// установка минимальных цен в зависимости от типа дома
var onInputTypeChange = function () {
  var inpputPrice = adForm.querySelector('input#price');

  if (inputType.value === 'flat') {
    inpputPrice.min = 1000;
    inpputPrice.placeholder = 1000;
  } else if (inputType.value === 'house') {
    inpputPrice.min = 5000;
    inpputPrice.placeholder = 5000;
  } else if (inputType.value === 'palace') {
    inpputPrice.min = 10000;
    inpputPrice.placeholder = 10000;
  }
};
inputType.addEventListener('change', onInputTypeChange);

// синхронизация времени заезда и выезда
var onInputTimeInChange = function () {
  inputTimeOut.value = inputTimeIn.value;
};
inputTimeIn.addEventListener('change', onInputTimeInChange);

var onInputTimeOutChange = function () {
  inputTimeIn.value = inputTimeOut.value;
};
inputTimeOut.addEventListener('change', onInputTimeOutChange);
