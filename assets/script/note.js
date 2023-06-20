const months = [
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
];

const themes = ["first", "second", "third", "fourth", "fifth"];
const noNote = document.querySelector(".no__notes");
const addBtn = document.querySelector("#add__btn");
const addModal = document.querySelector("#note__query");
const notes = document.querySelector("#notes");
const form = addModal.children[0];
const themeContainer = document.querySelector("#theme-container");
let themeValue = themes[0];
const themeElement = document.querySelectorAll(".theme-container .theme");
const formBtn = document.querySelector("#note__query button")


const themeLabel = document.querySelector("#theme__label");
let isEditing = false;
let editID = 0;
let editingElement = Element;

function setToDefault() {}

function makeFavourite(e) {
	const ele = e.currentTarget;
	const origin = window.location.origin;
	const favourite = `${origin}/assets/images/filled-star.svg`;
	const notFavourite = `${origin}/assets/images/unfilled-star.svg`;
	ele.src = ele.src == notFavourite ? favourite : notFavourite;
}

function openEditingModal(e) {
	isEditing = true;
	const note = e.currentTarget.parentElement.parentElement;
	const title = document.querySelector("#title");
	const content = document.querySelector("#content");
    
    formBtn.textContent = "Edit";
	console.log(note.children);
	title.value = note.children[0].textContent;
	content.value = "something we wrote before";
	editID = note.dataset.id;
	editingElement = note;
	const themeLabel = document.querySelector("#theme__label");
	const themeContainer = document.querySelector("#theme-container");
	themeLabel.style.display = "none";
	themeContainer.style.display = "none";
	addModal.style.animation = "closeModal .6s ease reverse forwards";
}

themeElement.forEach((ele) => {
	ele.addEventListener("click", (e) => {
		const colorSwatch = e.currentTarget;
		themeElement.forEach((ele, i) => {
			if (ele !== colorSwatch) {
				ele.classList.remove("active");
			}
			if (ele == colorSwatch) {
				colorSwatch.classList.add("active");
				themeValue = themes[i];
			}
		});
	});
});

function makeNote(e) {
	const date = new Date();
    console.log("making a note")

	const title = document.querySelector("#title");

	const newNote = document.createElement("article");
	newNote.classList.add(themeValue);
	newNote.dataset.id = new Date().getTime().toString();

	const format = `<h4><img id="star" src="../assets/images/unfilled-star.svg" alt="star" class="star">${
		title.value
	}</h4>
    <div class="info">
        <span>${
			months[date.getMonth()]
		} ${date.getDate()}, ${date.getFullYear()}</span>
        <img id="pen" class="pen" src="../assets/images/pen.svg" alt="">
    </div>`;
	newNote.innerHTML = format;
	notes.append(newNote);
	themeLabel.style.display = "block";
    themeContainer.style.display = "flex";

	noNote.style.display = "none";
	title.value = "";
	document.querySelector("#content").value = "";
	addModal.style.animation = "closeModal .6s ease forwards"; //needs to be worked on
	const starBtn = newNote.querySelector("#star");
	const penBtn = newNote.querySelector("#pen");
	starBtn.addEventListener("click", makeFavourite);
	penBtn.addEventListener("click", openEditingModal);
}

function editNote () {
	const title = document.querySelector("#title");
	const starImg = editingElement.querySelector("#star");
    console.log("editing note")
    editingElement.querySelector("h4").innerHTML = `${title.value}<img id="star" src="${starImg.src}" alt="star" class="star">`;
    editingElement.querySelector("#star").addEventListener("click", makeFavourite);
	document.querySelector("#content").value = "";
	addModal.style.animation = "closeModal .6s ease forwards";  //needs to be worked on
	isEditing = false;
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (isEditing) {
		editNote();
	} else {
		makeNote(e);
	}
});

addBtn.addEventListener("click", () => {
    formBtn.textContent = "Add";
    themeLabel.style.display = "block";
	themeContainer.style.display = "flex";
	addModal.style.animation = "closeModal .6s ease reverse forwards";
});

addModal.addEventListener("click", (e) => {
	if (!e.target.closest("form")) {
        const formBtn = document.querySelector("#note__query button")
        formBtn.textContent = "Edit";
		themeLabel.style.display = "block";
		themeContainer.style.display = "flex";
		addModal.style.animation = "closeModal .6s ease forwards";
        isEditing = false;
	}
});
