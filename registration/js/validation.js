var users = JSON.parse(localStorage.getItem("users")) || [];


function getUsers() {
    fetch("./registration/data/users.json")
        .then(response => response.json())
        .then((jsonData) => { return (users = jsonData.users) })
}

if (users.length == 0) {
    getUsers();
}

console.log(users)

document.querySelectorAll('input').forEach(el => {
    el.addEventListener('blur', () => {
        if (el.value.length === 0 && el.id != "middle_name") {
            showError(el, "Обязательное поле")
        }
        else if (el.id == "phone") {
            if (mask.masked.isComplete) {
                if (phoneInput.nextElementSibling && phoneInput.nextElementSibling.textContent === "Обязательное поле") {
                    phoneInput.classList.remove("field_error");
                    phoneInput.nextElementSibling.parentNode.removeChild(phoneInput.nextElementSibling)
                }
            }
            else {
                showError(phoneInput, "Неправильно указан номер телефона")
            }
        }
        else if (el.value.length === 1 && (el.id == "name" || el.id == "middle_name" || el.id == "last_name")) {
            showError(el, "Длина поля должна быть больше 1")
        }
        else if (el.id == 'nick' && el.value.length <= 5) {
            showError(el, "Длина никнейма должна быть больше 5 символов");
        }
        else if (el.type == "email" && !(el.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))) {
            showError(el, "Некорректно указан адрес электронной почты")
        }
        else if (el.classList.contains("date")) {
            var currentYear = new Date().getFullYear();
            var selectedYear = new Date(el.value).getFullYear();

            if (currentYear - selectedYear < 16) {
                showError(el, "Вам должно быть больше 16 лет")
            }
        }
        else if (el.id === "first_password") {
            if (checkValidPassword(el.value) === 0) {
                showError(el, "8 <= Длина пароля <= 20");
            }
            else if (checkValidPassword(el.value) === 1) {
                showError(el, "Пароль должен содержать хотя бы 1 заглавную букву");
            }
            else if (checkValidPassword(el.value) === 2) {
                showError(el, "Пароль должен содержать хотя бы 1 цифру");
            }
            else if (checkValidPassword(el.value) === 3) {
                showError(el, "Пароль должен содержать хотя бы 1 специальный символ");
            }
            else if (checkValidPassword(el.value) === 4) {
                showError(el, "Пароль должен содержать хотя бы 1 строчную букву");
            }
        }
        else if (el.id === "second_password") {
            first_password_value = document.getElementById("first_password").value
            if (first_password_value != el.value) {
                showError(el, "Пароли не совпадают");
            }
        }
    })
});


document.getElementById('registration_form').addEventListener('submit', function (event) {
    event.preventDefault()
    console.log(users)
    if (checkValidation(this) == true) {
        console.log("yes");
        if (checkRepeatData(this, users) == false) {
            temp = localStorage.getItem("currentUser")
            let currentUser;
            let currentRole;
            if (temp == "unauthorized") {
                currentUser = "unauthorized";
            }
            else {
                currentUser = JSON.parse(temp);
            }

            if (currentUser == "unauthorized") {
                currentRole = "user"
            }
            else {
                currentRole = "admin"
            }

            let user = {
                nick: document.getElementById("nick").value,
                password: document.getElementById("second_password").value,
                email: document.getElementById("email").value,
                telephone: document.getElementById("phone").value,
                birth_date: document.querySelector(".date").value,
                first_name: document.getElementById("name").value,
                last_name: document.getElementById("last_name").value,
                middle_name: document.getElementById("middle_name").value,
                role: currentRole
            }
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));

        }
    }
})

function checkValidation(form) {

    let checkResult = true;

    form.querySelectorAll("input").forEach(input_element => {
        if (input_element.id == "phone") {
            if (!(mask.masked.isComplete)) {
                checkResult = false;
                if (!(phoneInput.nextElementSibling)) {
                    showError(input_element, "Обязательное поле");
                }
            }
        }
        if (input_element.value.length == 0 && input_element.id != "middle_name") {
            checkResult = false
            if (!(input_element.nextElementSibling && input_element.nextElementSibling.textContent === "Обязательное поле")) {
                showError(input_element, "Обязательное поле")
                checkResult = false;
            }
        }
        if (input_element.nextElementSibling && (input_element.nextElementSibling.tagName.toLowerCase() != 'button' && input_element.nextElementSibling.tagName.toLowerCase() != 'input')) {
            checkResult = false;
        }
    })

    return checkResult;
}

function checkRepeatData(form, usersData) {
    let result = false;

    //console.log(usersData);

    phoneItem = form.querySelector("#phone");
    emailItem = form.querySelector("#email");
    nickItem = form.querySelector("#nick");

    for (let i = 0; i < usersData.length; i++) {
        if (phoneItem.value == usersData[i].telephone) {
            showError(phoneItem, "Номер телефона занят");
            result = true
        }
        if (emailItem.value == usersData[i].email) {
            showError(emailItem, "Адрес электронной почты занят");
            result = true;
        }
        if (nickItem.value == usersData[i].nick) {
            showError(nickItem, "Никнейм занят");
            result = true;
        }
    }

    return result;
}

function checkValidPassword(password) {
    if (password.length < 8 || password.length > 20) {
        return 0; //Limit length
    }
    else if (!(/[A-Z]/.test(password))) {
        return 1; //One uppercase letter
    }
    else if (!(/[0-9]/.test(password))) {
        return 2; //One digit
    }
    else if (!(/[!._,<>#?]/.test(password))) {
        return 3; //One special symbol
    }
    else if (!(/[a-z]/.test(password))) {
        return 4; //One lowercase letter
    }
    else {
        return 5;
    }
}

function showError(field, errorText) {
    if (field.nextElementSibling && field.nextElementSibling.textContent === errorText) {
        return
    }

    field.classList.add("field_error");

    const err = document.createElement('span');
    field.after(err);
    err.classList.add("error_message");
    err.textContent = errorText;

    hideError(field, err);
}

function hideError(field, err) {
    field.addEventListener('input', () => {
        field.classList.remove("field_error");
        err.remove();
    })
}

function goBack() {
    window.history.back();
}

function switchPageOnAuthorization() {
    window.location.href = "./authorization.html";
}

const checkbox = document.getElementById("agree_user_agreement");
const btnConfirm = document.querySelector(".btn_agreement");
const btnReg = document.querySelector(".registration");
checkbox.addEventListener("change", function () {
    if (this.checked) {
        btnConfirm.disabled = false;
    } else {
        btnConfirm.disabled = true;
        btnReg.disabled = true;
    }
});

function activeBtnReg(){
    btnReg.disabled = false;
    modalOverlay.classList.remove('modal_overlay--visible');
}