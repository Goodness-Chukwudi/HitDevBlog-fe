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

const themeElement = document.querySelectorAll(".theme");

console.log(themeElement)

themeElement.forEach(ele => {
    console.log(ele)
    ele.addEventListener("click", (e)=> {
        if (ele == e.currentTarget) {
            console.log(e.currentTarget)
            ele.classlist.add("active")
        } else {
            ele.classlist.remove("active")
        }
    })
})

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const date = new Date;
    
    const title = document.querySelector("#title").value;
    
    const newNote = document.createElement("article");

    const format = `<h4><img src="../assets/images/filled-star.svg" alt="star" class="star">${title}</h4>
    <div class="info">
        <span>${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</span>
        <img class="pen" src="../assets/images/pen.svg" alt="">
    </div>`
    newNote.innerHTML = format;
    notes.append(newNote);
    noNote.style.display = "none"
})

addBtn.addEventListener("click", ()=> {
    addModal.style.animation = "closeModal .6s ease reverse forwards";
})

addModal.addEventListener("click", (e)=> {
    if (!e.target.closest("form")) {
        addModal.style.animation = "closeModal .6s ease forwards";
    }
})



