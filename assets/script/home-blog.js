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
        
        let homeBlogsEle = document.getElementById("homeblog-cards");
        const maxTitleLength = 20;
        const maxContentLength = 40;
        let cardsTemplate = '';
             
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
            const truncatedContentParagraphs = truncatedContentArray.map((contentParagraph) => `<p>${contentParagraph}</p>`).join('');



            // Insert the truncated 'contents' paragraphs into the card template
            cardsTemplate += `
                <div class="card me-1" style="width: 14rem; height: 20rem; margin: 0.5rem ">
                    <img src="../../assets/images/blog-image.jpeg" class="card-img-top" alt="...">
                    <div class="card-body" style="position:relative">
                        <h6 class="card-title">${truncatedTitle}</h6>
                        <p style="font-size: 60%; font-weight:bold">${blog.date_created}</p>
                        ${truncatedContentParagraphs}
                        <a class="btn btn-outline-primary btn-sm" style="position:absolute; bottom: 10px; right:4.6rem" href="./view-blog.html?email=${loggedInUser.email}&index=${index}">view blog</a>
                    </div>
                </div>
            `;
        });

        homeBlogsEle.innerHTML = cardsTemplate;
        
    } 

   
}



 
