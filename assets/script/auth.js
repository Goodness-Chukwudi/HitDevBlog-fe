
document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
});

function addEventListeners () {
    document.getElementById("sign-up-form").addEventListener("submit", createUser);
    document.getElementById("sign-in-form").addEventListener("submit", signIn);
}

function createUser (e) {
    e.preventDefault();
    
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    
    const user = {
        name: name,
        email: email,
        password: password,
        loggedIn: true
    }
    let hasDuplicateEmail = false;

    const existUsers = JSON.parse(localStorage.getItem("blog-users")) || [];
    for (let i = 0; i < existUsers.length; i++) {
        const existUser = existUsers[i];
        if (existUser.email == user.email) {
            hasDuplicateEmail = true;
            break;
        }
    }

    if (hasDuplicateEmail) {
        const showAlert = new ShowAlert();
        showAlert.error(user.email +" already exist")

    } else {
        existUsers.push(user)
        //set state for logged in user
        const loggedInUser = JSON.stringify(user);
        localStorage.setItem("logged-in-user", loggedInUser);
        //update list of users in local storage
        const usersString = JSON.stringify(existUsers);
        localStorage.setItem("blog-users", usersString);
    
        window.location.replace("http://127.0.0.1:5501/pages/landing_page/index.html");
    }
}

function signIn(e) {
    e.preventDefault();
    const username = document.getElementById("username-login").value;
    const password = document.getElementById("password-login").value;

    let user = null;
    const existUsers = JSON.parse(localStorage.getItem("blog-users")) || [];
    for (let i = 0; i < existUsers.length; i++) {
        const existUser = existUsers[i];
        if (existUser.email == username) {
            user = existUser;
            break;
        }
    }

    if (!user || (user.password != password)) {
        const showAlert = new ShowAlert();
        showAlert.error("Invalid login details");
    } else {
        const loggedInUser = JSON.stringify(user);
        localStorage.setItem("logged-in-user", loggedInUser);
        window.location.replace("http://127.0.0.1:5501/pages/index.html");
    }

}