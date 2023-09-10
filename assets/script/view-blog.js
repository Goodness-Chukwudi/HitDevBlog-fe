
const searchParams = Object.fromEntries(  
    new URLSearchParams(window.location.search)
)

let selectBlog = {};

document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    fetchBlog()
});



function addEventListeners() {
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', deleteBlog);

    const editBtn = document.getElementById('editBtn');
    editBtn.addEventListener('click', editBlog);
}

function deleteBlog() {
    const storageService = new StorageService();
    const storedBlogs = storageService.retrieve("blogs");

    // Check if the selected blog exists in local storage
    if (storedBlogs[searchParams.email] && storedBlogs[searchParams.email][searchParams.index]) {
       
        const confirmation = window.confirm("Are you sure you want to delete this blog?");
        if (confirmation) {
            storedBlogs[searchParams.email].splice(searchParams.index, 1);

            // Update the modified array in local storage
            storageService.save("blogs", storedBlogs);

            window.location.replace("http://127.0.0.1:5501/pages/index.html");
        }
    
    }
}



    let title2 = document.getElementById("update-blog-title");
    

    let textArea2 = document.getElementById("update-textarea");
    

function editBlog() {

    // Redirect to the create-blog page with query parameters for editing
    const queryString = `?email=${searchParams.email}&index=${searchParams.index}`;
    const createBlogUrl = `http://127.0.0.1:5501/pages/update-blog.html${queryString}`;
    window.location.href = createBlogUrl;
}




function fetchBlog() {
    const storageService = new StorageService();
    const storedBlogs = storageService.retrieve("blogs");
    selectBlog = storedBlogs[searchParams.email][searchParams.index];

    //assign the value from the selected blog to the appropriate elements;

    let contents = "";
    selectBlog.content.forEach(content => {
        contents += `<p class="card-text">${content}</p>`
    });

    document.getElementById("title").innerHTML = selectBlog.title;
    document.getElementById("author").innerHTML = `By ${selectBlog.user}`;
    document.getElementById("date").innerHTML = selectBlog.date_created;
    document.getElementById("blog-content").innerHTML = contents;

}



