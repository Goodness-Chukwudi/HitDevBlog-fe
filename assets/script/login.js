const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

const eyeIcon = document.getElementById('eyeIcon');
const passwordLogin = document.getElementById('password-login');
const passwordSignUp = document.getElementById('password-signUp');
const signUpEyeIcon = document.getElementById('signUp-eyeIcon')

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
})

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
})


eyeIcon.addEventListener('click', () => {
    if(passwordLogin.type == "password"){
        passwordLogin.type = "text";
        eyeIcon.src = "../assets/images/eye-open.png";
    }else{
        passwordLogin.type = "password";
        eyeIcon.src = "../assets/images/eye-close.png";
    }
})

signUpEyeIcon.addEventListener('click', () => {
    if(passwordSignUp.type == "password"){
        passwordSignUp.type = "text";
        signUpEyeIcon.src = "../assets/images/eye-open.png";
    }else{
        passwordSignUp.type = "password";
        signUpEyeIcon.src = "../assets/images/eye-close.png";

    }
})