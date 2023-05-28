let loggedInUser = null;

document.addEventListener("DOMContentLoaded", () => {
    checkLoggedInUser();
});


function addEventListeners () {
}

function checkLoggedInUser () {
    //Do logic to get logged in user
    // const user = {
    //     name: "Arinze",
    //     email: "arinze@gmail.com"
    // }
    loggedInUser = null;

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
