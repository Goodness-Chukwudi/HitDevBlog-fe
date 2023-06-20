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

const modalCover = document.querySelector("#note__query");
const form = modalCover.firstElementChild;
const title = form.querySelector("#title");
const content = form.querySelector("#content");
const themeContainer = form.querySelector("#theme-container");
const formBtn = form.querySelector("button");
const themeLabel = form.querySelector("#theme__label");


const noNote = document.querySelector(".no__notes");
const addBtn = document.querySelector("#add__btn");
const notes = document.querySelector("#notes");
const themeElement = themeContainer.querySelectorAll(".theme");


let themeValue = themes[0];
let isEditing = false;
let editID = 0;
let editingElement = Element;

function resetToDefault() {
	title.value = "";
	content.value = "";
	isEditing = false;
	editingElement = Element;
};

function setModalElement() {
	themeLabel.style.display = isEditing? "none" : "block";
	themeContainer.style.display = isEditing? "none" : "flex";
	formBtn.textContent = isEditing? "Edit" : "Add"
};

function toggleModalVisibility() {
	const animationName = modalCover.style.animationName;
	modalCover.style.animation = `${animationName == "openModal" ? "closeModal" : "openModal"} .4s ease forwards`;
};

function makeFavourite(e) {
	const ele = e.currentTarget;
	const origin = window.location.origin;
	const favourite = `${origin}/assets/images/filled-star.svg`;
	const notFavourite = `${origin}/assets/images/unfilled-star.svg`;
	ele.src = ele.src == notFavourite ? favourite : notFavourite;
};

function openEditingModal(e) {
	isEditing = true;
    setModalElement();
	editingElement = e.currentTarget.parentElement.parentElement;
	title.value = editingElement.children[0].textContent;
	content.value = "something we wrote before";
	toggleModalVisibility();
};

themeElement.forEach((ele) => {
	ele.addEventListener("click", (e) => {
		const selectedColorSwatch = e.currentTarget;
		themeElement.forEach((ele, i) => {
			if (ele !== selectedColorSwatch) {
				ele.classList.remove("active");
			}
			if (ele == selectedColorSwatch) {
				selectedColorSwatch.classList.add("active");
				themeValue = themes[i];
			}
		});
	});
});

function createNoteElement(id, date) {
	const newNote = document.createElement("article");
	newNote.classList.add(themeValue);
	newNote.dataset.id = id;
	const format = `<h4><img id="star" src="../assets/images/	unfilled-star.svg" alt="star" class="star">${title.value}</h4><div class="info"><span>${date.month} ${date.day}, ${date.year}</span><img id="pen" class="pen" src="../assets/images/pen.svg" alt=""></div>`;
	newNote.innerHTML = format;
	// newNote.dataset.id = id;
	notes.append(newNote);
	const starBtn = newNote.querySelector("#star");
	const penBtn = newNote.querySelector("#pen");
	starBtn.addEventListener("click", makeFavourite);
	penBtn.addEventListener("click", openEditingModal);
}

function addNoteElement() {
	const date = new Date;
	const id = date.getTime().toString(); //unique id
	const dateCreated = {
		day: date.getDate(),
		month : months[date.getMonth()],
		year: date.getFullYear(),
	};
	createNoteElement(id,dateCreated);
	noNote.remove();
	toggleModalVisibility();
	setModalElement();
	resetToDefault(); 
}

function editNote() {
	toggleModalVisibility(); 
	const starImg = editingElement.querySelector("#star");
	const noteTitle = editingElement.querySelector("h4");
    console.log("editing note")
    noteTitle.innerHTML = `${title.value}<img id="star" src="${starImg.src}" alt="star" class="star">`;
    editingElement.querySelector("#star").addEventListener("click", makeFavourite);
	content.value = "";
	resetToDefault();
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (isEditing) {
		editNote();
	} else {
		addNoteElement();
	}
});

addBtn.addEventListener("click", () => {
	setModalElement();
	toggleModalVisibility();
});

modalCover.addEventListener("click", (e) => {
	if (!e.target.closest("form")) {
		toggleModalVisibility();
		setTimeout(()=> {
			resetToDefault();
			setModalElement();

		}, 500)
	}
});


//*********LOCALSTORAGE*********//
const getLocalStorage = () => localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")): [];

const addToLocalStorage = (id,value) => {
    let groceries = {id : id, value : value};
    let items = getLocalStorage();
    items.push(groceries);
    localStorage.setItem("notes", JSON.stringify(items));
};

const editLocalStorage = (id,value) => {
    let items = getLocalStorage();
    items = items.map(item => {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("notes", JSON.stringify(items));
};

const removeFromLocalStorage = (id) =>{
    let items = getLocalStorage();
    items = items.filter(item =>{
        if (item.id !== id) {
            return item;
        }
    })
    localStorage.setItem("notes", JSON.stringify(items));
}

