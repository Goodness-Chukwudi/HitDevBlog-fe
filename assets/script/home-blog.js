document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    displayBlogs()
});


function displayBlogs(e) {
    const storageService = new StorageService();
    const loggedInUser = storageService.retrieve("logged-in-user");
  
    const storedBlogs = storageService.retrieve("blogs");
    if (storedBlogs) {
        userBlogs = storedBlogs[loggedInUser.email] || [];
        
        const homeBlogsEle = document.getElementById("homeblog-cards");

        

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
        homeBlogsEle.innerHTML = cardsTemplate;
      
    }
}