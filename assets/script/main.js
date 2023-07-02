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
    const {origin} = window.location;
    localStorage.removeItem("logged-in-user");
    window.location.replace(`${origin}/pages/login.html`);
}

function authGuard() {
    //Auth guard for protected pages
    const {origin} = window.location;
    const loggedInUser = localStorage.getItem("logged-in-user");
    if (!loggedInUser)   window.location.replace(`${origin}/pages/login.html`);
}
