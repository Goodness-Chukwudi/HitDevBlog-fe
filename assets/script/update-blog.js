const searchParams = Object.fromEntries(
  new URLSearchParams(window.location.search)
);

const updateBtn = document.getElementById("update-blog-btn");
const updateTextArea = document.getElementById("update-textarea");
const updateTitle = document.getElementById("update-blog-title");

document.addEventListener("DOMContentLoaded", fetchBlog);
updateBtn.addEventListener("click", updateBlog);

// function fetchBlog() {
//   const storageService = new StorageService();
//   const storedBlogs = storageService.retrieve("blogs");
//   let selectBlog = storedBlogs[searchParams.email][searchParams.index];

//   //assign the value from the selected blog to the appropriate elements;

//   let contents = "";
//   selectBlog.content.forEach(content => {
//       contents += content + "\n"
//   });


//   document.getElementById("update-blog-title").value = selectBlog.title;
//   document.getElementById("update-textarea").value = contents;

// }



// function fetchBlog() {
//   const storageService = new StorageService();
//   const storedBlogs = storageService.retrieve("blogs");
//   let selectBlog = storedBlogs[searchParams.email][searchParams.index] || [];

//   // Assign the value from the selected blog to the appropriate elements.
//   document.getElementById("update-blog-title").value = selectBlog.title;

//   // Replace <br> tags with newline characters for displaying
//   const contents = selectBlog.content[0].replace(/<br>/g, '\n');
//   document.getElementById("update-textarea").value = contents;
// }


function fetchBlog() {
  const storageService = new StorageService();
  const storedBlogs = storageService.retrieve("blogs");


  if (
      searchParams.email &&
      searchParams.index >= 0 &&
      storedBlogs[searchParams.email] &&
      storedBlogs[searchParams.email][searchParams.index]
  ) {
      let selectBlog = storedBlogs[searchParams.email][searchParams.index];
      const contents = selectBlog.content.map(content => content.replace(/<br>/g, '\n')).join('\n');  // Replace <br> tags with newline characters for displaying
      document.getElementById("update-textarea").value = contents;
      document.getElementById("update-blog-title").value = selectBlog.title;
   
}else

// Redirect to the home page (index.html) immediately
  window.location.replace("http://127.0.0.1:5501/pages/index.html");
  
}





function updateBlog() {
    const updatedTitle = updateTitle.value;
    const updatedContent = updateTextArea.value;
    const contentToStore = updatedContent.replace(/\n/g, "<br>");

    const storageService = new StorageService();
    const storedBlogs = storageService.retrieve("blogs");

    // Update the selected blog if it exists
    if (
        searchParams.email &&
        searchParams.index >= 0 &&
        storedBlogs[searchParams.email] &&
        storedBlogs[searchParams.email][searchParams.index]
    ) {
        const selectBlog = storedBlogs[searchParams.email][searchParams.index];
        selectBlog.title = updatedTitle;
        selectBlog.content = [contentToStore];

        storageService.save("blogs", storedBlogs);
    }

    // Redirect to the home page (index.html) immediately
    window.location.replace("http://127.0.0.1:5501/pages/index.html");
}

