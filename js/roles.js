const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const gallarySection = document.getElementById('gallary');
const featuresSection = document.getElementById('features');
const trackingSection = document.getElementById('tracking');
const commentsSection = document.getElementById('comments');
const gallary2Section = document.querySelector('.gallary_2');
const btnAuthorization = document.getElementById('authorization_button');
const btnRegistration = document.getElementById('register_button');
const btnLogOut = document.getElementById('log_out_button');
const btnAdminPanel = document.querySelector(".button_admin_panel");
const btnDowloadForIos = document.querySelector(".button_dowload_for_ios");
const btnDowloadForAndroid = document.querySelector(".button_dowload_app_for_android");
const btnAddNewAdmin = document.querySelector(".button_add_admin");
const divAboutDeliver = document.querySelector('.main_div_about_delivery');

btnLogOut.addEventListener('click', logOutFunction)

function getCurrentUser() {
    let returnValue = localStorage.getItem('currentUser');
    if(returnValue != null){
        if (returnValue == 'unauthorized') {
            return returnValue;
        }
    }
    else{
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
        gallarySection.style.display = 'none';
        featuresSection.style.display = 'none';
        trackingSection.style.display = 'none';
        commentsSection.style.display = 'none';
        gallary2Section.style.display = 'none';
        btnAuthorization.style.display = 'none';
        btnRegistration.style.display = 'none';
        btnLogOut.style.display = 'block';
        btnAdminPanel.style.display = 'block';
        btnAddNewAdmin.style.display = 'block';
        btnDowloadForIos.style.display = 'none';
        btnDowloadForAndroid.style.display = 'none';
    } 
    else if(currentUser.role === "user"){
        btnAuthorization.style.display = 'none';
        btnRegistration.style.display = 'none';
        btnLogOut.style.display = 'block';
    }
    else {
        homeSection.style.display = 'block';
        aboutSection.style.display = 'block';
        gallarySection.style.display = 'block';
        featuresSection.style.display = 'block';
        trackingSection.style.display = 'block';
        commentsSection.style.display = 'block';
        gallary2Section.style.display = 'none';
        btnAuthorization.style.display = 'block';
        btnRegistration.style.display = 'block';
        btnLogOut.style.display = 'none';
        divAboutDeliver.style.display = "none";
    }
}

updatePageElements(currentUser);

function logOutFunction(event){
    currentUser = "unauthorized";
    localStorage.setItem("currentUser", currentUser);
    updatePageElements(currentUser)
}