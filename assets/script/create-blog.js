
document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
});

function addEventListeners () {
    document.getElementById("create-blog").addEventListener("click", addBlogParagraph);
}

const blogTemplates = [];
const textAreaElement = document.getElementById("exampleFormControlTextarea1");


function addBlogParagraph (e) {
    const value = textAreaElement.value;
    const blogTemplate = `<p id = ${blogTemplates.length} >${value}</p>`
    blogTemplates.push(blogTemplate);

    displayNewParagraphs()
    e.preventDefault();
    
}
    

function displayNewParagraphs () {
    let template = blogTemplates.join(" ");
    document.getElementById("blog-content").innerHTML = template;
    textAreaElement.value = "";

    // Add event listener to each paragraph
    const paragraphs = document.querySelectorAll("#blog-content p");
    paragraphs.forEach((paragraph) => {
    paragraph.addEventListener("click", () => {
    console.log(paragraph);
  });
});

}






// value.addEventListener("click", () => {
//     console.log(`id: ${blogTemplate.length} value: ${value}`);
// });
