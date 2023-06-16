let loggedInUser = null;

document.addEventListener("DOMContentLoaded", () => {
    authGuard()
    addEventListeners();
    checkLoggedInUser();
});

function addEventListeners () {
    document.getElementById("log-out").addEventListener("click", logOutUser)
}

function checkLoggedInUser () {
    //Do logic to get logged in user
    const user = localStorage.getItem("logged-in-user");
    loggedInUser = JSON.parse(user);

    if (loggedInUser) {
        document.getElementById("log-in").setAttribute("style", "display: none;");
        document.getElementById("log-out").setAttribute("style", "display: inline;");
        document.getElementById("logged-in-user").innerHTML = `Hi ${loggedInUser.name}`;
    } else {
        document.getElementById("log-in").setAttribute("style", "display: inline;");
        document.getElementById("log-out").setAttribute("style", "display: none;");
        document.getElementById("logged-in-user").innerHTML = "";
    }
}

function logOutUser () {
    localStorage.removeItem("logged-in-user");
    window.location.replace("http://127.0.0.1:5501/pages/login.html");
}

function authGuard() {
    //Auth guard for protected pages
    const loggedInUser = localStorage.getItem("logged-in-user");
    if (!loggedInUser)   window.location.replace("http://127.0.0.1:5501/pages/login.html");
}
