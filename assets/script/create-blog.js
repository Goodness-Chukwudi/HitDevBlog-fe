// Define an empty array to store the user's blogs.
let userBlogs = [];

// Wait for the DOM content to be loaded before executing the following code.
document.addEventListener("DOMContentLoaded", () => {
    addEventListeners(); // Add event listeners to the buttons.
    displayBlogs(); // Display the user's blogs.
});

// Function to add event listeners to the buttons.
function addEventListeners () {
    document.getElementById("add-paragraph").addEventListener("click", addBlogParagraph);
    document.getElementById("create-blog-form").addEventListener("submit", createBlog);
}



// Function to display the user's blogs.
function displayBlogs() {
    // Get the user's data from the storage service.
    const storageService = new StorageService();
    const loggedInUser = storageService.retrieve("logged-in-user");

    // Retrieve the stored blogs from the storage service.
    const storedBlogs = storageService.retrieve("blogs");

    // Check if there are stored blogs.
    if (storedBlogs) {
        // Get the blogs associated with the logged-in user or an empty array if none exists.
        userBlogs = storedBlogs[loggedInUser.email] || [];

        // Get the HTML element to display the blog cards.
        const blogCardsElement = document.getElementById("blog-cards");
    
        let cardsTemplate = ''; // Initialize an empty template to hold the blog cards.
        
        // Iterate through each blog to create the blog cards template.
        userBlogs.forEach((blog, index) => {
            // Truncate the title to 12 characters.
            const truncatedTitle = blog.title.length > 12 ? blog.title.slice(0, 12) + '...' : blog.title;

            // Check if blog.content exists and is an object before using Object.values.
            let contents = blog.content && typeof blog.content === 'object' ? Object.values(blog.content).join(' ') : '';
        let truncatedContents = ''; // Initialize an empty string for truncated content.
        if (contents.length > 25) {
            truncatedContents = contents.slice(0, 25) + '...'; // Assign truncated content if length exceeds 25.
        } else {
            truncatedContents = contents; // Assign full content if length is not greater than 25.
        }
    
            // Create the blog card template.
            cardsTemplate += `
                <div class="card me-1" style="width: 10rem; height: 17rem;">
                    <img src="../../assets/images/blog-image.jpeg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">${truncatedTitle}</h6>
                        <span style="font-size: 60%">${blog.date_created}</span>
                        <p>${truncatedContents}</p>
                        <a class="btn btn-outline-primary btn-sm card-btn" href="./view-blog.html?email=${loggedInUser.email}&index=${index}">view blog</a>
                    </div>
                </div>
            `;
        });
    
        // Display the blog cards template on the page.
        blogCardsElement.innerHTML = cardsTemplate;
    }
}

// Variables to track the state of the blog creation and editing.
let isUpdate = false; // Indicates if the blog is being updated.
let editId; // The ID of the blog being edited.
let blogs = {}; // Object to store the blog content.
let paragraphCount = 0; // Counter to keep track of the paragraph number.
const textAreaElement = document.getElementById("exampleFormControlTextarea1"); // Reference to the textarea element in the HTML.

// Function to add a new paragraph to the blog content.
function addBlogParagraph() {
    const value = textAreaElement.value;

    if (value) {
        if (!isUpdate) paragraphCount++;
        const id = isUpdate ? editId : paragraphCount;
        blogs[id] = value;
        displayParagraphs();
        isUpdate = false;
    }
}

// Function to create a new blog.
function createBlog(e) {
    e.preventDefault();
    const storageService = new StorageService();
    const loggedInUser = storageService.retrieve("logged-in-user");
    const title = document.getElementById("exampleFormControlInput1").value;


    // Create a blog object with the user's data.
    const blog = {
        user: loggedInUser.name,
        title: title,
        content: Object.values(blogs),
        date_created: new Date().toDateString()
    };

    // Retrieve the stored blogs from the storage service or an empty object if none exists.
    const storedBlogs = storageService.retrieve("blogs") || {};

    // Add the new blog to the user's blogs or create a new array if none exists.
    if (storedBlogs[loggedInUser.email]) {
        storedBlogs[loggedInUser.email].push(blog);
    } else {
        storedBlogs[loggedInUser.email] = [blog];
    }

    // Save the updated blogs to the storage service.
    storageService.save("blogs", storedBlogs);
}

// Function to display the blog paragraphs on the page.
function displayParagraphs() {
    let template = "";

    // Iterate through each blog paragraph to create the template.
    for (const id in blogs) {
        template += `
            <div class="blog-paragraph row">
                <div id=${id}-value class="ps-3 col-md-8 col-10">${blogs[id]}</div>
                <div id=${id} class="col-md-4 col-2 text-end">
                    <span class="edit-btn material-symbols-outlined">edit</span>
                    <span class="delete-btn material-symbols-outlined">delete</span>
                </div>
            </div>
        `;
    }

    // Display the blog paragraphs template on the page.
    document.getElementById("blog-content").innerHTML = template;
    textAreaElement.value = "";

    // Set click events on the paragraph elements.
    const paragraphsEditBtn = document.querySelectorAll(".edit-btn");
    const paragraphsDeleteBtn = document.querySelectorAll(".delete-btn");
    paragraphsEditBtn.forEach(paragraph => paragraph.addEventListener("click", editParagraph));
    paragraphsDeleteBtn.forEach(paragraph => paragraph.addEventListener("click", deleteParagraph));

    // Enable or disable the create blog button based on input validity.
    const title = document.getElementById("exampleFormControlInput1").value;
    const isValidInput = title && Object.keys(blogs).length > 0;
    
    if (isValidInput) {
        document.getElementById("create-blog-btn").className = "btn btn-sm rounded-circle btn-outline-secondary";
    } else {
        document.getElementById("create-blog-btn").className = "btn btn-sm rounded-circle btn-outline-secondary disabled";
    }
}

// Function to edit a blog paragraph.
function editParagraph(e) {
    const id = e.currentTarget.parentElement.id;
    isUpdate = true;
    editId = id;
    const valueElement = document.getElementById(id + "-value");
    textAreaElement.value = value
    textAreaElement.value = valueElement.textContent;
  }
  
  // Function to delete a blog paragraph.
  function deleteParagraph(e) {
      const id = e.currentTarget.parentElement.id;
      delete blogs[id];
      displayParagraphs();
  }