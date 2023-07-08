
document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
});

function addEventListeners () {
    document.getElementById("create-blog").addEventListener("click", addBlogParagraph);
}
let isUpdate = false;
let editId;
let blogTemplates = [];

const textAreaElement = document.getElementById("exampleFormControlTextarea1");


function addBlogParagraph (e) {
    const value = textAreaElement.value;
    const id = isUpdate ? editId : blogTemplates.length;
    const blogTemplate = `
    <div class = "blog-paragraph row">
        <div id = ${id}-value class="ps-3 col-md-8 col-10"> ${value} </div>
        <div id = ${id} class = "col-md-4 col-2 text-end">
            <span class= "edit-btn material-symbols-outlined ">edit</span>
            <span class= "delete-btn material-symbols-outlined">delete</span>
        </div>
    </div>
    `
    if (isUpdate) {
        blogTemplates[editId] = blogTemplate;
        isUpdate = false;
    }
    else blogTemplates.push(blogTemplate);

    displayParagraphs()
    e.preventDefault();
    
}
    

function displayParagraphs () {
    let template = blogTemplates.join(" ");
    document.getElementById("blog-content").innerHTML = template;
    textAreaElement.value = "";
    //set a click event on the paragraph elements
    const paragraphsToEdit = document.querySelectorAll(".edit-btn");
    const paragraphsToDelete = document.querySelectorAll(".delete-btn");
    paragraphsToDelete.forEach(paragraph => paragraph.addEventListener("click", editParagraph));
    paragraphsToDelete.forEach(paragraph => paragraph.addEventListener("click", deleteParagraph));

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
    const newTemplates = [];
    for (let i = 0; i < blogTemplates.length; i++) {
        const template = blogTemplates[i];
        if (i != id) newTemplates.push(template)
    }
    blogTemplates = newTemplates;
    console.log(id)
    displayParagraphs();
}

// setting maximum length of blog content chracters displayed on blog card 

const paragraphs = document.querySelectorAll('.card-text');

for (let i = 0; i < paragraphs.length; i++) {
  const paragraph = paragraphs[i];
  const text = paragraph.textContent.trim();

  if (text.length > 25) {
    const truncatedText = text.slice(0, 25) + '...';
    paragraph.textContent = truncatedText;
  }
}

// setting maximum length of blog title chracters displayed on blog card 

const titles = document.querySelectorAll('.card-title');

for (let i = 0; i < titles.length; i++) {
  const title = titles[i];
  const text = title.textContent.trim();

  if (text.length > 16) {
    const truncatedText = text.slice(0, 16) + '...';
    title.textContent = truncatedText;
  }
}
