import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedMessage) {
    // console.log(savedMessage);
    const { email, message } = JSON.parse(savedMessage);
    refs.email.value = email;
    refs.textarea.value = message;
  }
}
