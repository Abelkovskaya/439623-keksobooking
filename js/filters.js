'use strict';

(function () {
  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var MAX_PINS_COUNT = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));
  var priceParams = {
    LOW: 10000,
    HIGH: 50000
  };
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var onLoadData = function (data) {

    var filterDataObject = getFilteredData(data);
    var fragmentPin = document.createDocumentFragment();
    var pinsCount = MAX_PINS_COUNT;
    if (filterDataObject.length < pinsCount) {
      pinsCount = filterDataObject.length;
    }
    for (var i = 0; i < pinsCount; i++) {
      fragmentPin.appendChild(window.pin.renderPin(filterDataObject[i]));
    }

    mapPins.appendChild(fragmentPin);
  };
  // фильтр цены
  var filteredByPrice = function (data) {
    switch (housingPrice.value) {
      case 'low':
        return data.offer.price < priceParams.LOW;
      case 'middle':
        return data.offer.price >= priceParams.LOW && data.offer.price <= priceParams.HIGH;
      case 'high':
        return data.offer.price > priceParams.HIGH;
    }
    return false;
  };

  // фильтр удобств
  var filteredByFeatures = function (data) {
    for (var i = 0; i < filters.features.length; i++) {
      if (data.offer.features.indexOf(filters.features[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterData = function (data) {
    return ((housingType.value === 'any') ? true : (data.offer.type === housingType.value)) &&
      ((housingPrice.value === 'any') ? true : filteredByPrice(data)) &&
      ((housingRooms.value === 'any') ? true : (data.offer.rooms === parseInt(housingRooms.value, 10))) &&
      ((housingGuests.value === 'any') ? true : (data.offer.guests === parseInt(housingGuests.value, 10))) &&
      filteredByFeatures(data);
  };

  // массив длинною pinLimits
  var getFilteredData = function (ads) {

    var newData = ads.filter(filterData);

    return newData.slice(0, 5);
  };

  var filtersChangeHandlers = function () {
    var card = document.querySelector('.map__card');
    var mapPin = document.querySelectorAll('.map__pin'); // нашли все пины
    if (card !== null) {
      card.classList.add('hidden');
    }

    for (var j = 0; j < mapPin.length; j++) {
      if (!mapPin[j].classList.contains('map__pin--main')) {
        mapPins.removeChild(mapPin[j]);
      }
    }
    window.backend.download(onLoadData, window.backend.onErrorMessage);
    //        var filterDataObject = getFilteredData(points);
    //  window.debounce(window.pin.getPinsFragment(filterDataObject));
  };

  var housingTypeChangeHandler = function (evt) {
    filters.type = evt.target.value;

    window.debounce(filtersChangeHandlers);
  };

  var housingPriceChangeHandler = function (evt) {
    filters.price = evt.target.value;

    window.debounce(filtersChangeHandlers);
  };

  var housingRoomsChangeHandler = function (evt) {
    filters.rooms = evt.target.value;

    window.debounce(filtersChangeHandlers);
  };

  var housingGuestsChangeHandler = function (evt) {
    filters.rooms = evt.target.value;

    window.debounce(filtersChangeHandlers);
  };

  // какой элемент из списка выбран(checked) записываем его в массив filters.features]
  var selectFeatures = function () {
    var accum = [];
    housingFeatures.map(function (item) {
      if (item.checked === true) {
        accum.push(item.value);
      }
    });
    return accum;
  };

  housingFeatures.forEach(function (item) {
    item.addEventListener('change', function () {
      filters.features = selectFeatures();
      window.debounce(filtersChangeHandlers);
    });
  });

  housingType.addEventListener('change', housingTypeChangeHandler);
  housingPrice.addEventListener('change', housingPriceChangeHandler);
  housingRooms.addEventListener('change', housingRoomsChangeHandler);
  housingGuests.addEventListener('change', housingGuestsChangeHandler);
})();
