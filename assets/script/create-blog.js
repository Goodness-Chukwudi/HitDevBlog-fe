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
const titleEle = document.getElementById("exampleFormControlInput1");



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

            let truncatedContentArray = [];
            let totalLength = truncatedContentArray.join(" ").length;
            let remainingSpace = maxContentLength - totalLength;
            
                
            // Loop through each content paragraph in the blog
            for (let i = 0; i < blog.content.length; i++) {
                
                let truncParagraph = blog.content[i].slice(0, maxContentLength) + "..."
            
                if (totalLength + blog.content[i].length <= maxContentLength && [i+1] < blog.content.length){
                    
                    
                    truncParagraph = blog.content[i].slice(0, remainingSpace) + "...";
                    truncatedContentArray.push(truncParagraph);
                    break;
                }
                 else if (totalLength + blog.content[i].length > maxContentLength){
                    
                    truncParagraph = blog.content[i].slice(0, remainingSpace) + "...";
                    truncatedContentArray.push(truncParagraph);
                    break;
                }
                else {
                   
                    truncatedContentArray.push(blog.content);
                    
                } 
            }
            
            // Generate the paragraphs for the truncated content
            const truncatedContentParagraphs = truncatedContentArray.map((contentParagraph) => `<p style="font-size: 90%">${contentParagraph}</p>`).join('');


            cardsTemplate += `
            <div class="card me-1" style="width:14rem; height: 20rem; margin: 0.5rem ">
                <img src="../../assets/images/blog-image.jpeg" class="card-img-top" alt="...">
                <div class="card-body" style="position:relative">
                    <h6 class="card-title">${truncatedTitle}</h6>
                    <p style="font-size: 60%; font-weight:bold">${blog.date_created}</p>
                    ${truncatedContentParagraphs}
                    <span class= "edit-btn2 material-symbols-outlined" data-index="${index}" id="card-edit-btn" style = "cursor: pointer; position:absolute; bottom: 44px; right:7.05rem; color: rgb(102, 172, 230); font-size:140%">edit</span>
                    <span class= "delete-btn2 material-symbols-outlined" data-index="${index}" id= "card-del-btn" style = "cursor: pointer; position:absolute; bottom: 44px; right:5.7rem; color:rgb(255, 89, 122); font-size:140%">delete</span>
                    <a class="btn btn-outline-primary btn-sm" style="position:absolute; bottom: 10px; right:4.6rem" href="./view-blog.html?email=${loggedInUser.email}&index=${index}">view blog</a>
                </div>
            </div>
            `;

        })    
        blogCardsElement.innerHTML = cardsTemplate;

        const editButtons = document.querySelectorAll(".edit-btn2");
        const deleteButtons = document.querySelectorAll(".delete-btn2");
    
        editButtons.forEach((editButton) => {
            editButton.addEventListener("click", editBlog);
        });
    
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener("click", deleteBlog);
        });
      
     
    }


    function editBlog(event) {
        const index = event.target.dataset.index;
    
        if (userBlogs[index]) {
            const blog = userBlogs[index];
    
            // Populate the blog creation form with the content of the selected blog
            document.getElementById("exampleFormControlInput1").value = blog.title;
            textAreaElement.value = blog.content.join("\n");
    
            // Set the update flag and editId to the index of the blog being edited
            isUpdate = true;
            editId = index;
        } else {
            // Handle the case when the blog object at the given index is undefined
            alert(`Blog not found `);
        }
    }
    
    function deleteBlog(e) {
        const id = e.target.dataset.index;
        userBlogs.splice(id, 1);
        
        // Update the local storage with the modified userBlogs array
        const storageService = new StorageService();
        const loggedInUser = storageService.retrieve("logged-in-user");
        const storedBlogs = storageService.retrieve("blogs") || {};
        storedBlogs[loggedInUser.email] = userBlogs;
        storageService.save("blogs", storedBlogs);
    
        // Display the updated blogs after deleting
        displayBlogs();
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




