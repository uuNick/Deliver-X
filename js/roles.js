const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const gallerySection = document.getElementById('gallery');
const featuresSection = document.getElementById('features');
const trackingSection = document.getElementById('tracking');
const commentsSection = document.getElementById('comments');
const gallery2Section = document.querySelector('.gallery_2');
const btnAuthorization = document.querySelector('.authorization_button');
const btnRegistration = document.querySelector('.register_button');
const btnRegistration_2 = document.querySelector('.register_button_2');
const btnLogOut_1 = document.querySelector('.log_out_button_1');
const btnLogOut_2 = document.querySelector('.log_out_button_2');
const btnAdminPanel = document.querySelector(".button_admin_panel");
const btnDowloadForIos = document.querySelector(".button_dowload_for_ios");
const btnDowloadForAndroid = document.querySelector(".button_dowload_app_for_android");
const btnAddNewAdmin = document.querySelector(".button_add_admin");
const divAboutDeliver = document.querySelector('.main_div_about_delivery');
const divTracking2 = document.querySelector('.div_tracking_2');
const divTracking1 = document.querySelector('.div_tracking_1');
const textInModel_1 = document.querySelector('.p_text_in_modal');
const inputFieldsInModal = document.querySelector('.input_fields_in_modal');
const btnAddRestaurant = document.querySelector(".button_add_restaurant");
const btnClearlocalStorage = document.querySelector(".button_clear_local_storage");

function getCurrentUser() {
    let returnValue = localStorage.getItem('currentUser');
    if (returnValue != null) {
        if (returnValue == 'unauthorized') {
            return returnValue;
        }
    }
    else {
        returnValue = "unauthorized";
        localStorage.setItem('currentUser', returnValue);
        return returnValue;
    }
    return JSON.parse(returnValue);
}

let currentUser = getCurrentUser()

function updatePageElements(currentUser) {
    if (currentUser.role === "admin") {
        homeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        gallerySection.style.display = 'none';
        featuresSection.style.display = 'none';
        trackingSection.style.display = 'none';
        commentsSection.style.display = 'none';
        gallery2Section.style.display = 'none';
        btnAuthorization.style.display = 'none';
        btnRegistration.style.display = 'none';
        btnLogOut_1.style.display = 'block';
        btnAdminPanel.style.display = 'block';
        btnAddNewAdmin.style.display = 'block';
        btnDowloadForIos.style.display = 'none';
        btnDowloadForAndroid.style.display = 'none';
        btnRegistration_2.style.display = "none";
        btnAddRestaurant.style.display = "block"
        btnClearlocalStorage.style.display = "block"
    }
    else if (currentUser.role === "user") {
        btnAuthorization.style.display = 'none';
        btnRegistration.style.display = 'none';
        btnLogOut_1.style.display = 'block';
        btnRegistration_2.style.display = "none";
        textInModel_1.style.display = "none";
        btnAddRestaurant.style.display = "none"
        btnClearlocalStorage.style.display = "none"
    }
    else {
        homeSection.style.display = 'block';
        aboutSection.style.display = 'block';
        gallerySection.style.display = 'block';
        featuresSection.style.display = 'block';
        trackingSection.style.display = 'block';
        commentsSection.style.display = 'block';
        gallery2Section.style.display = 'none';
        btnAuthorization.style.display = 'block';
        btnRegistration.style.display = 'block';
        btnRegistration_2.style.display = "none";
        btnLogOut_1.style.display = 'none';
        btnLogOut_2.style.display = 'none';
        divAboutDeliver.style.display = "none";
        divTracking2.style.display = "none";
        divTracking1.style.marginBottom = "150px";
        inputFieldsInModal.style.display = 'none'
        textInModel_1.style.display = "block";
        btnAddRestaurant.style.display = "none"
        btnClearlocalStorage.style.display = "none"
    }
}

updatePageElements(currentUser);

btnLogOut_1.addEventListener('click', logOutFunction);
btnLogOut_2.addEventListener('click', closeBurger);

function logOutFunction(event) {
    currentUser = "unauthorized";
    localStorage.setItem("currentUser", currentUser);
    updatePageElements(currentUser);
    editWindowsRegAndAuthItems();
}

function closeBurger() {
    const menu = document.querySelector('.body_menu');
    const menuButton = document.querySelector('.menu_icon');
    const menuGround = document.querySelector('.menu_overflow');
    menu.classList.remove('active_burger_menu');
    menuButton.classList.remove('active_burger_menu');
    menuGround.classList.remove('show');
    document.body.classList.remove('lock');
    logOutFunction();
}

function editWindowsLogOutItems() {
    if (window.innerWidth < 768 && (btnLogOut_1.style.display == 'block')) {
        btnLogOut_1.style.display = 'none';
        btnLogOut_2.style.display = 'block';
    }
    if (window.innerWidth >= 768 && (btnLogOut_1.style.display == 'none')) {
        btnLogOut_2.style.display = 'none';
        btnLogOut_1.style.display = 'block';
    }
}

function editWindowsRegAndAuthItems() {
    if (window.innerWidth < 768 && (btnRegistration.style.display == 'block')) {
        btnRegistration.style.display = 'none';
        btnAuthorization.style.display = 'none';
        btnRegistration_2.style.display = 'block';
    }
    if (window.innerWidth >= 768 && (btnRegistration.style.display == 'none')) {
        btnRegistration_2.style.display = 'none';
        btnRegistration.style.display = 'block';
        btnAuthorization.style.display = 'block';
    }
}

if (currentUser != "unauthorized") {
    editWindowsLogOutItems();
}
else {
    editWindowsRegAndAuthItems();
}

window.addEventListener('resize', () => {
    if (currentUser != "unauthorized") {
        editWindowsLogOutItems();
    }
    else {
        editWindowsRegAndAuthItems();
    }
})