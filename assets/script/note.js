const months =  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ] 

const themes = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth"
]
const noNote = document.querySelector(".no__notes");
const addBtn = document.querySelector("#add__btn");
const addModal = document.querySelector("#note__query");
const notes = document.querySelector("#notes");
const form = addModal.children[0];
const themeContainer = document.querySelector("#theme-container");
let themeValue = themes[0];

const themeElement = document.querySelectorAll(".theme-container .theme");



themeElement.forEach(ele => {
    ele.addEventListener("click", (e)=> {
        const colorSwatch = e.currentTarget;
        themeElement.forEach((ele, i) => {
            if (ele !== colorSwatch) {
                ele.classList.remove("active")
            }
            if (ele == colorSwatch) {
                colorSwatch.classList.add("active");
                themeValue = themes[i];

            }

             
        })
    })
})

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const date = new Date;
    
    let title = document.querySelector("#title").value;
    
    const newNote = document.createElement("article");
    newNote.classList.add(themeValue)
    

    const format = `<h4><img src="../assets/images/filled-star.svg" alt="star" class="star">${title}</h4>
    <div class="info">
        <span>${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</span>
        <img class="pen" src="../assets/images/pen.svg" alt="">
    </div>`
    newNote.innerHTML = format;
    notes.append(newNote);
    noNote.style.display = "none";
    document.querySelector("#title").value = "";
    document.querySelector("#content").value = "";
    addModal.style.animation = "closeModal .6s ease forwards";
})

addBtn.addEventListener("click", ()=> {
    addModal.style.animation = "closeModal .6s ease reverse forwards";
})

addModal.addEventListener("click", (e)=> {
    if (!e.target.closest("form")) {
        addModal.style.animation = "closeModal .6s ease forwards";
    }
})



