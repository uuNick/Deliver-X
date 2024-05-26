// Получаем ссылку на элемент, где будет отображаться текст
const userAgreementElement = document.getElementById('user-agreement');

// Загружаем текст из файла
fetch('./registration/data/user_agreement.txt')
  .then(response => response.text())
  .then(data => {
    // Помещаем текст в элемент
    userAgreementElement.innerHTML = data;
  })
  .catch(error => {
    console.error('Ошибка при загрузке пользовательского соглашения:', error);
  });