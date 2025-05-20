$("#icon2").click(function() {
    $(".sidebar").toggleClass("left-0");
    if ($(this).hasClass('fa-bars')) {
        $(this).removeClass("fa-bars");
        $(this).addClass("fa-xmark");
    } else {
        $(this).removeClass("fa-xmark");
        $(this).addClass("fa-bars");
    }
});


$(".dark-mode").click(function() {
    $("body").toggleClass("bg-black");
    $(".sidebar-data").toggleClass("bg-black");
    if ($(this).hasClass('fa-moon')) {
        $(this).removeClass("fa-moon");
        $(this).addClass("fa-sun");
    } else {
        $(this).removeClass("fa-sun");
        $(this).addClass("fa-moon");
    }
});
//!----------------BOM----------------
let nameee = document.querySelector("#inputName");
let number = document.querySelector("#number");
let email = document.querySelector("#email");
let password = document.querySelector("#Password");
let age = document.querySelector("#age");
let RePassword = document.querySelector("#RePassword");
let submit = document.querySelector("#send");
//!----------------Regex----------------

let nameRegex = /^[A-Z][a-z]{2,20}$/;
let numberRegex = /^(01[0-9])[0-9]{8}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
let ageRegex = /^(1[9-9]|[2-9][0-9])$/;



function testRegex(regex, element) {
    var newTestRegex = regex.test(element.value);

    if (newTestRegex == false) {
        element.nextElementSibling.classList.remove('d-none');
        element.nextElementSibling.classList.add('d-block');
        return false;
    } else {
        element.nextElementSibling.classList.remove('d-block');
        element.nextElementSibling.classList.add('d-none');
        return true;
    }
}
const passwordd = password.value;
const rePassword = RePassword.value;

function validatePasswords() {


    if (passwordd === rePassword) {
        element.nextElementSibling.classList.remove('d-block');
        element.nextElementSibling.classList.add('d-none');
        return true;
    } else {
        element.nextElementSibling.classList.remove('d-none');
        element.nextElementSibling.classList.add('d-block');
        return false;
    }
}

submit.addEventListener('click', (event) => {
    event.preventDefault();
    const isFirstNameValid = testRegex(nameRegex, nameee);
    const isNumberValid = testRegex(numberRegex, number);
    const isEmailValid = testRegex(emailRegex, email);
    const isPasswordValid = testRegex(passwordRegex, password);
    const isAgeValid = testRegex(ageRegex, age);

    if (isFirstNameValid == false || isNumberValid == false || isEmailValid == false || isPasswordValid == false || isAgeValid == false && passwordd != rePassword) {
        Swal.fire({
            title: 'ERROR !',
            text: 'Please correct the required data.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        deletVlio();
    } else {
        Swal.fire({
            title: 'Done',
            text: 'All data is correct.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        deletVlio();
    }
});

function deletVlio() {
    nameee.value = "";
    number.value = "";
    email.value = "";
    password.value = "";
    age.value = "";
    RePassword.value = "";
}
// //!_______________________(END Ingredients)_________________________________
// //!_______________________(END Ingredients)_________________________________