function switchPageOnRegistration() {
    window.location.href = "./registration.html";
}

function switchPageOnAuthorization(){
  window.location.href = "./authorization.html";
}

function switchPageOnOrder(){
  window.location.href = "./orders.html";
}

function switchPageOnAdminPanel(){
  window.location.href = "./admin.html";
}

window.addEventListener('load', function() {
  const splashScreen = document.getElementById('splash-screen');
  splashScreen.classList.add('hide');
});