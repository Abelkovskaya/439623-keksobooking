'use strict';
(function () {
  // форма отправки объявления
  var adForm = document.querySelector('.ad-form');
  var inputRooms = adForm.querySelector('.select_room_number');
  var inputGuests = adForm.querySelector('.select_capacity');
  var inputType = adForm.querySelector('.select_type');
  var inputTimeIn = adForm.querySelector('.select_timein');
  var inputTimeOut = adForm.querySelector('.select_timeout');
  var inpputPrice = adForm.querySelector('.input_price');
  var address = adForm.querySelector('#address');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var removeFormDisabled = function () { // отменяет неактивное состояние формы
    for (var i = 0; i < formFieldset.length; i++) {
      adForm.querySelector('#title').minLength = '30';
      adForm.querySelector('#title').maxLength = '100';
      formFieldset[i].disabled = '';
    }
    adForm.querySelector('.ad-form__submit').disabled = '';
    // разблокировали кнопку
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelector('#title').minLength = '30';
    adForm.querySelector('#title').maxLength = '100';
  };
  // пишем функцию
  var setAddress = function (xCoord, yCoord) {
    var addresString = 'x: ' + xCoord + ', ' + 'y: ' + yCoord;
    address.value = addresString;
  };
  // проверка полей комнат и гостей при изменении поля с гостями
  var onInputGuestsChange = function () {
    if (inputRooms.value === '100' && inputGuests.value !== '0') {
      inputGuests.setCustomValidity('Количество гостей не бывает больше чем комнат. 100 комнат для не для гостей');
    } else if (inputRooms.value !== '100' && (inputRooms.value < inputGuests.value || inputGuests.value < 1)) {
      inputGuests.setCustomValidity('Количествово гостей не бывает больше чем комнат.100 комнат для не для гостей');
    } else {
      inputGuests.setCustomValidity('');
    }
  };
  // проверка полей комнат и гостей при изменении поля с комнатами
  var onInputRoomsChange = function () {
    if (inputRooms.value === '3') {
      inputGuests.options[0].disabled = ''; // 3 гостя
      inputGuests.options[1].disabled = ''; // 2 гостя
      inputGuests.options[2].disabled = ''; // 1 гость
      inputGuests.options[0].selected = true;
      inputGuests.options[3].disabled = 'true'; // не для гостей
    }
    if (inputRooms.value === '1') {
      inputGuests.options[0].disabled = 'true'; // 3 гостя
      inputGuests.options[1].disabled = 'true'; // 2 гостя
      inputGuests.options[2].disabled = ''; // 1 гость
      inputGuests.options[2].selected = true;
      inputGuests.options[3].disabled = 'true'; // не для гостей
    }
    if (inputRooms.value === '2') {
      inputGuests.options[0].disabled = 'true'; // 3 гостя
      inputGuests.options[1].disabled = ''; // 2 гостя
      inputGuests.options[2].disabled = ''; // 1 гость
      inputGuests.options[1].selected = true;
      inputGuests.options[3].disabled = 'true'; // не для гостей
    }
    if (inputRooms.value === '100') {
      inputGuests.options[0].disabled = 'true'; // 3 гостя
      inputGuests.options[1].disabled = 'true'; // 2 гостя
      inputGuests.options[2].disabled = 'true'; // 1 гость
      inputGuests.options[3].selected = true;
      inputGuests.options[3].disabled = ''; // не для гостей
    }
  };
  // установка минимальных цен в зависимости от типа домов
  var onInputTypeChange = function () {
    if (inputType.value === 'flat') {
      inpputPrice.min = 1000;
      inpputPrice.placeholder = 1000;
    } else if (inputType.value === 'house') {
      inpputPrice.min = 5000;
      inpputPrice.placeholder = 5000;
    } else if (inputType.value === 'palace') {
      inpputPrice.min = 10000;
      inpputPrice.placeholder = 10000;
    } else if (inputType.value === 'bungalo') {
      inpputPrice.min = 0;
      inpputPrice.placeholder = 0;
    }
  };
  // синхронизация времени заезда и выезда
  var onInputTimeInChange = function () {
    inputTimeOut.value = inputTimeIn.value;
  };

  var onInputTimeOutChange = function () {
    inputTimeIn.value = inputTimeOut.value;
  };

  inputTimeOut.addEventListener('change', onInputTimeOutChange);
  inputGuests.addEventListener('change', onInputGuestsChange);
  inputRooms.addEventListener('change', onInputRoomsChange);
  inputType.addEventListener('change', onInputTypeChange);
  inputTimeIn.addEventListener('change', onInputTimeInChange);

  window.form = {
    setAddressValue: setAddress,
    initForm: removeFormDisabled
  };

})();
