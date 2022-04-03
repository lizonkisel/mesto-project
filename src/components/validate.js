// export const validationConfig = {
//   formSelector: '.form',
//   inputSelector: '.form__item',
//   submitButtonSelector: '.form__button-submit',
//   inactiveButtonClass: 'form__button-submit_disabled',
//   errorClass: 'form__item_invalid'
// }

  /* Запустить процесс выбора форм и добавления слушателей полям  */

// function enableValidation(config) {
//   const forms = Array.from(document.querySelectorAll(config.formSelector));
//   forms.forEach(function(form) {
//     setInputListeners(config, form);
//     form.addEventListener('submit', function(evt) {
//       evt.preventDefault();
//     })
//   })
// }

  /* Добавить слушатели полям ввода формы */

// function setInputListeners(config, form) {
//   const inputs = Array.from(form.querySelectorAll(config.inputSelector));
//   toggleButtonState(config, form, inputs);
//   inputs.forEach(function(input) {
//     input.addEventListener('input', function(evt) {
//       checkValidation(config, form, input);
//       toggleButtonState(config, form, inputs);
//     })
//   })
// }

  /* Переключить состояние кнопки "Submit" */

// function toggleButtonState(config, form, inputs) {
//   const submitButton = form.querySelector(config.submitButtonSelector);
//   if (hasInvalidInput(inputs)) {
//     submitButton.classList.add(config.inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(config.inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

  /* Проверить, есть ли среди полей невалидные */

// function hasInvalidInput(inputs) {
//   return inputs.some(function(input) {
//     return !input.validity.valid;
//   })
// }

  /* Проверить валидность поля */

// function checkValidation(config, form, input) {
//   const inputError = form.querySelector(`.${input.name}-error`);
//   const inputErrorText = input.validationMessage;
//   if(!input.validity.valid) {
//     input.classList.add(config.errorClass);
//     inputError.textContent = inputErrorText;

//   } else {
//     input.classList.remove(config.errorClass);
//     inputError.textContent = '';
//   }
// }

// export {validationConfig, enableValidation, toggleButtonState, checkValidation};
