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


function displayBlogs(e) {
    const storageService = new StorageService();
    const loggedInUser = storageService.retrieve("logged-in-user");
  
    const storedBlogs = storageService.retrieve("blogs");
    if (storedBlogs) {
        userBlogs = storedBlogs[loggedInUser.email] || [];
        const blogCardsElement = document.getElementById("blog-cards");
        

        

        let cardsTemplate = '';
        const maxTitleLength = 20; 
        const maxContentLength = 40; 
  
        userBlogs.forEach((blog, index) => {
            // Truncate the title if it exceeds the maximum length
            const truncatedTitle = blog.title.length > maxTitleLength ? blog.title.slice(0, maxTitleLength) + "..." : blog.title;
                let contents = "";
            blog.content.forEach(content => {
            // Truncate the content if it exceeds the maximum length (50 characters)
            const truncatedContent = content.length > maxContentLength ? content.slice(0, maxContentLength) + "..." : content;
            contents += truncatedContent;
            });

            // Truncate the entire 'contents' string if it exceeds the maximum length (50 characters)
            contents = contents.length > maxContentLength ? contents.slice(0, maxContentLength) + "..." : contents;

            // Insert the truncated 'contents' string into the card template
            cardsTemplate += `
            <div class="card me-1" style="width: 14rem; height: 20rem; margin: 0.5rem ">
                <img src="../../assets/images/blog-image.jpeg" class="card-img-top" alt="...">
                <div class="card-body" style="position:relative">
                    <h6 class="card-title">${truncatedTitle}</h6>
                    <p style="font-size: 60%; font-weight:bold">${blog.date_created}</p>
                    <p style="font-size: 82%" class="card-text">${contents}</p>
                    <a class="btn btn-outline-primary btn-sm" style="position:absolute; bottom: 10px; right:4.6rem" href="./view-blog.html?email=${loggedInUser.email}&index=${index}">view blog</a>
                </div>
            </div>
            `;

        })    
      blogCardsElement.innerHTML = cardsTemplate;
    
      
    }
}

  

  

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
                <span class= "edit-btn material-symbols-outlined" style = "cursor: pointer">edit</span>
                <span class= "delete-btn material-symbols-outlined" style = "cursor: pointer">delete</span>
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


