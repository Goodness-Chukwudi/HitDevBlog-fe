
// Get the URL query parameters to determine the selected blog.
const searchParams = Object.fromEntries(new URLSearchParams(window.location.search));
let selectBlog = {};

document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    fetchBlog();
});

function addEventListeners() {
    // Add any necessary event listeners for the view-blog page (if required).
}

function fetchBlog() {
    // Get the storage service and retrieve the stored blogs.
    const storageService = new StorageService();
    const storedBlogs = storageService.retrieve("blogs");

    // Check if there are stored blogs.
    if (storedBlogs) {
        // Get the selected blog from the URL query parameters.
        selectBlog = storedBlogs[searchParams.email][searchParams.index];

        // Check if the selected blog exists.
        if (selectBlog) {
            // Assign the value from the selected blog to the appropriate elements;
            let contents = "";

            // Check if selectBlog.content is an object (multiple paragraphs) or a string (single paragraph).
            if (typeof selectBlog.content === 'object') {
                // If selectBlog.content is an object, it represents multiple paragraphs.
                selectBlog.content.forEach(content => {
                    contents += `<p class="card-text">${content}</p>`;
                });
            } else if (typeof selectBlog.content === 'string') {
                // If selectBlog.content is a string, it represents a single paragraph.
                contents = `<p class="card-text">${selectBlog.content}</p>`;
            } else {
                // Handle any other unexpected data types for selectBlog.content (optional).
                contents = '<p class="card-text">Invalid blog content</p>';
            }

            // Populate the appropriate HTML elements with the blog data.
            document.getElementById("title").innerHTML = selectBlog.title;
            document.getElementById("author").innerHTML = selectBlog.user;
            document.getElementById("date").innerHTML = selectBlog.date_created;
            document.getElementById("blog-content").innerHTML = contents;

            // Create and append the "Edit" button to the blog content.
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("btn", "btn-outline-primary", "btn-sm", "edit-blog-btn");
            document.getElementById("blog-content").appendChild(editButton);

            // Add event listener to the "Edit" button to handle editing the blog content.
            editButton.addEventListener("click", navigateToEditBlog);

            // Create and append the "Delete" button to the blog content.
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm", "delete-btn");
            deleteButton.addEventListener("click", deleteBlog);
            document.getElementById("blog-content").appendChild(deleteButton);
        } else {
            // Handle the case when the selectBlog is not found (e.g., invalid index).
            alert("Blog not found.");
        }
    }
}

// Function to handle navigation to the create-blog page for editing.
function navigateToEditBlog() {
    // Set the 'action' parameter in the URL to indicate editing.
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('action', 'edit');
    window.location.href = `create-blog.html?${urlParams.toString()}`;
}

// Function to handle deleting a blog.
function deleteBlog() {
    const shouldDelete = confirm("Are you sure you want to delete this blog?");
    if (shouldDelete) {
        // Get the storage service and retrieve the stored blogs.
        const storageService = new StorageService();
        const storedBlogs = storageService.retrieve("blogs");
        const loggedInUser = storageService.retrieve("logged-in-user");
        const userBlogs = storedBlogs[loggedInUser.email];

        // Remove the selected blog from userBlogs based on the index.
        userBlogs.splice(searchParams.index, 1);

        // Update the stored blogs.
        storedBlogs[loggedInUser.email] = userBlogs;
        storageService.save("blogs", storedBlogs);

        // Redirect to the create-blog page after deleting the blog.
        window.location.href = "create-blog.html";
    }
}
