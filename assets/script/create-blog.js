
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
    const allBlogParagraphs = document.querySelectorAll("#blog-content p");
    allBlogParagraphs.forEach(paragraph => paragraph.addEventListener("click", getParagraphText));
    textAreaElement.value = "";

}

function getParagraphText(e) {
    const {id, textContent} = e.currentTarget;
    console.log(id, textContent)
}