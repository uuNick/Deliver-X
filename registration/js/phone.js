const phoneInput = document.getElementById('phone');
phoneInput.value = ' ';
const registrationButton = document.querySelector(".registration");

const maskOptions = {
  mask: '+{375} (00) 000-00-00',
  lazy: false
};
const mask = IMask(phoneInput, maskOptions);