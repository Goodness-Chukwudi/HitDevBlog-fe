
const searchParams = Object.fromEntries(  
    new URLSearchParams(window.location.search)
)

let selectBlog = {};

document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    fetchBlog()

});

function addEventListeners () {

    
}

function fetchBlog() {
    const storageService = new StorageService();
    const storedBlogs = storageService.retrieve("blogs");
    selectBlog = storedBlogs[searchParams.email][searchParams.index];

    //assign the value from the selected blog to the appropriate elements;

    let contents = "";
    selectBlog.content.forEach(content => {
        contents += `<p class="card-text">${content}</p>`
    })

    document.getElementById("title").innerHTML = selectBlog.title;
    document.getElementById("author").innerHTML = selectBlog.user;
    document.getElementById("date").innerHTML = selectBlog.date_created;
    document.getElementById("blog-content").innerHTML = contents;
}