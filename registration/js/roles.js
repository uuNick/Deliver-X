const h1 = document.querySelector("h1");
const userAgreement = document.querySelector(".license");
const logInBtn = document.querySelector('.log_in_button');

let temp = localStorage.getItem("currentUser")
let currentUser;

if(temp == "unauthorized"){
    currentUser = "unauthorized";
}
else{
    currentUser = JSON.parse(temp);
}

if(currentUser != "unauthorized")
    if(currentUser.role == "admin"){
        h1.textContent = "Add new admin";
        userAgreement.style.display = "none";
        logInBtn.style.display = "none";
}
