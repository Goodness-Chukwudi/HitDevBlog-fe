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
let blogs = {};
let paragraphCount = 0;
const textAreaElement = document.getElementById("exampleFormControlTextarea1");
function addBlogParagraph (e) {
    e.preventDefault();
    const value = textAreaElement.value;

    if (value) {
        if (!isUpdate) paragraphCount++;
        const id = isUpdate ? editId : paragraphCount;
        blogs[id] = value;
        displayParagraphs();
        isUpdate = false;
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
        content: Object.values(blogs),
        date_created: new Date().toDateString()
    }

    const storedBlogs = storageService.retrieve("blogs") || {};
    if (storedBlogs[loggedInUser.email]) storedBlogs[loggedInUser.email].push(blog)
    else storedBlogs[loggedInUser.email] = [blog];

    storageService.save("blogs", storedBlogs);

}
    

function displayParagraphs () {
    
    let template = "";
    for (const id in blogs) {
        template += `
        <div class = "blog-paragraph row">
            <div id = ${id}-value class="ps-3 col-md-8 col-10"> ${blogs[id]}</div>
            <div id = ${id} class = "col-md-4 col-2 text-end">
                <span class= "edit-btn material-symbols-outlined">edit</span>
                <span class= "delete-btn material-symbols-outlined">delete</span>
            </div>
        </div>
        `
    }
    document.getElementById("blog-content").innerHTML = template;
    textAreaElement.value = "";

    //set a click event on the paragraph elements
    const paragraphsEditBtn = document.querySelectorAll(".edit-btn");
    const paragraphsDeleteBtn = document.querySelectorAll(".delete-btn");
    paragraphsEditBtn.forEach(paragraph => paragraph.addEventListener("click", editParagraph));
    paragraphsDeleteBtn.forEach(paragraph => paragraph.addEventListener("click", deleteParagraph));

    //enable or disable create blog button
    const title = document.getElementById("exampleFormControlInput1").value;
    const isValidInput = title && Object.keys(blogs).length > 0;
    
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
    delete blogs[id];
    displayParagraphs();
}

// setting maximum length for blog content chracters displayed on blog card 

const paragraphs = document.querySelectorAll('.card-text');

for (let i = 0; i < paragraphs.length; i++) {
  const paragraph = paragraphs[i];
  const text = paragraph.textContent.trim();

  if (text.length > 25) {
    const truncatedText = text.slice(0, 25) + '...';
    paragraph.textContent = truncatedText;
  }
}

// setting maximum length for blog title chracters displayed on blog card 

const titles = document.querySelectorAll('.card-title');

for (let i = 0; i < titles.length; i++) {
  const title = titles[i];
  const text = title.textContent.trim();

  if (text.length > 16) {
    const truncatedText = text.slice(0, 16) + '...';
    title.textContent = truncatedText;
  }
}
