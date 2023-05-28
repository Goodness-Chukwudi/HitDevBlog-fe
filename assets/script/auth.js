
document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
});


function addEventListeners () {
    document.getElementById("sign-up-form").addEventListener("submit", createUser);
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

    const existUser = JSON.parse(localStorage.getItem("blog-user"));
    if (existUser.email == user.email) {
        return alert("A user with this email already exist!")
    }

    const userString = JSON.stringify(user);
    localStorage.setItem("blog-user", userString);
    window.location.replace("http://127.0.0.1:5501/pages/index.html");
}