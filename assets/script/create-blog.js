let userBlogs = [];

document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    displayBlogs()
});

function addEventListeners () {
    document.getElementById("add-paragraph").addEventListener("click", addBlogParagraph);
    document.getElementById("create-blog-form").addEventListener("submit", createBlog);
}

let isUpdate = false;
let editId;
let blogTemplates = {};
let paragraphCount = 0;
const textAreaElement = document.getElementById("exampleFormControlTextarea1");

function displayBlogs (e) {
    const storageService = new StorageService();
    const loggedInUser = storageService.retrieve("logged-in-user");

    const blogs = storageService.retrieve("blogs");
    userBlogs = JSON.parse(blogs)[loggedInUser.email];
    const blogCardsElement = document.getElementById("blog-cards");

    let cardsTemplate = '';
    userBlogs.forEach(blog => {

        cardsTemplate += `
        <div class="card me-1" style="width: 10rem; height: 15rem;">
            <img src="../../assets/images/blog-image.jpeg" class="card-img-top" alt="...">
            <div class="card-body">
                <h6 class="card-title">${blog.title} <span style= "font-size: 60%" >${blog.date_created}</span></h6>
                <p class="card-text">${blog.content}</p>
                <a class=" btn btn-outline-primary btn-sm" href="./view-blog.html">view blog</a>
            </div>
        </div>
        `
    })
    blogCardsElement.innerHTML = cardsTemplate;
}

function addBlogParagraph (e) {
    e.preventDefault();
    const value = textAreaElement.value;

    if (value) {
        if (!isUpdate) paragraphCount++;
        const id = isUpdate ? editId : paragraphCount;
        const blogTemplate = `
        <div class = "blog-paragraph row">
            <div id = ${id}-value class="ps-3 col-md-8 col-10"> ${value}</div>
            <div id = ${id} class = "col-md-4 col-2 text-end">
                <span class= "edit-btn material-symbols-outlined ">edit</span>
                <span class= "delete-btn material-symbols-outlined">delete</span>
            </div>
        </div>
        `
        blogTemplates[id] = blogTemplate;
        displayParagraphs();
    }
}

function createBlog (e) {
    // e.preventDefault();
    const storageService = new StorageService();
    const loggedInUser = storageService.retrieve("logged-in-user");
    const title = document.getElementById("exampleFormControlInput1").value;

    const blog = {
        user: loggedInUser.name,
        title: title,
        content: Object.values(blogTemplates).join(" "),
        date_created: new Date().toDateString()
    }

    const blogs = storageService.retrieve("blogs") || {};
    if (blogs[loggedInUser.email]) blogs[loggedInUser.email].push(blog)
    else blogs[loggedInUser.email] = [blog];

    storageService.save("blogs", blogs);
}

function displayParagraphs () {
    let template = Object.values(blogTemplates).join(" ");
    document.getElementById("blog-content").innerHTML = template;
    textAreaElement.value = "";
    //set a click event on the paragraph elements
    const paragraphsToEdit = document.querySelectorAll(".edit-btn");
    const paragraphsToDelete = document.querySelectorAll(".delete-btn");
    paragraphsToEdit.forEach(paragraph => paragraph.addEventListener("click", editParagraph));
    paragraphsToDelete.forEach(paragraph => paragraph.addEventListener("click", deleteParagraph));

    //enable or disable create blog button
    const title = document.getElementById("exampleFormControlInput1").value;
    const isValidInput = title && Object.keys(blogTemplates).length > 0;
    
    if (isValidInput) document.getElementById("create-blog-btn").className = "btn btn-sm rounded-circle btn-outline-secondary";
    else document.getElementById("create-blog-btn").className = "btn btn-sm rounded-circle btn-outline-secondary disabled";
}

function editParagraph(e) {
    const id = e.currentTarget.parentElement.id;
    isUpdate = true;
    editId = id;
   const valueElement = document.getElementById(id+"-value");
   textAreaElement.value = valueElement.textContent;
}

function deleteParagraph (e) {
    const id = e.currentTarget.parentElement.id;
    delete blogTemplates[id];
    displayParagraphs();
}