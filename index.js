let newPostSection;
let addNew;
newPostSection = document.querySelector('.new-post')
newCommentSection = document.querySelector('.comment-section')
addNew = document.querySelector('#addNew')
addNew.addEventListener('click', showNewPost)
hideNewPost()
hideNewComments()



function hideNewPost() {
  newPostSection.setAttribute('style', 'visibility: hidden;')
}

function hideNewComments() {
  newCommentSection.setAttribute('style', 'visibility: hidden;')
}

function showNewComments() {
  newCommentSection.setAttribute('style', 'visibility: visible;')
}

function showNewPost() {
  newPostSection.setAttribute('style', 'visibility: visible;')
}

const blogPost = document.querySelector("#submit")
blogPost.addEventListener("click", savePost)

let title;
let main;
let dropdown;
let all;
function savePost(e){
    e.preventDefault();
    title = document.getElementById("title").value;
    // console.log(title)
    // const prac = document.querySelector("#practice");
    // prac.textContent= title;

    text = document.getElementById("blogText").value;
    // console.log(main)
    // const prac2 = document.querySelector("#practice2");
    // prac2.textContent= text;

    dropdown = document.getElementById("category").value;
    // console.log(dropdown)
    // const prac3 = document.querySelector("#practice3");
    // prac3.textContent= dropdown;

    newPostSection.setAttribute('style', 'visibility: hidden;')

    const data = {title : `${title}`, text : `${text}`, tags : `${dropdown}`, comments : [ ] ,  emojis : { }, key : "" }

    const options = { 
        method: 'POST',
        headers : {
          "ContentType": "application/json"
        },
        body: JSON.stringify(data)
    };
    
    fetch('http://localhost:3000/blogs/new', options)
    .then(r => r.json())
    .then(console.log(title))
    .catch(console.warn)
    deleteBlogs()
}



//George's code
const newPost = document.querySelector("#post-made");

let newData =[];

loadBlogs()

function loadBlogs() {
  fetch('http://localhost:3000/blogs')
    .then(r => r.json())
    .then(drawBlogs)
    .catch(console.error())
}

function deleteBlogs() {
    location.reload()
}

function drawBlogs(array) {
    newData = array.blogs
  for (i = 0; i < array.blogs.length; i++){
    newPost.insertAdjacentHTML("afterend", `<section class="post-made">
                                        <h1>${newData[i].title}</h1>
                                        <h4 id="h4Item">${newData[i].text}<h4>
                                        <p>${newData[i].tags}</p>
                                        <button type="button" id="${i}" class="button">View Comments</button>
                                        <label class="emoji-but">
                                            <input type="checkbox" id="emoji1-${i}">
                                            <span class="emoji-slider">&#128515;</span>
                                        </label>
                                        <label class="emoji-but">
                                            <input type="checkbox" id="emoji2-${i}">
                                            <span class="emoji-slider">&#128514;</span>
                                        </label>
                                        <label class="emoji-but">
                                            <input type="checkbox" id="emoji3-${i}">
                                            <span class="emoji-slider">&#128546;</span>
                                        </label>
                                        </section>`                                     
                                        
                                       )

  }

//load all comments when pressed view comment
let newComment = document.querySelector("#comment")
let commentBtn = document.querySelectorAll(".button");
console.log(commentBtn)
for (i = 0; i < commentBtn.length; i++){
  commentBtn[i].addEventListener("click", loadComments)  
}

let uniqueBtn ;
function loadComments (e) {
  newComment.style.visibility = "hidden";
  uniqueBtn = e.target.id
  console.log(uniqueBtn)
  
  fetch("http://localhost:3000/blogs")
  .then(r => r.json())
  .then(drawComments(uniqueBtn))
  .catch(console.error())
  
}

function drawComments(Btn){ 
  // while (newComment.firstChild) {
  //   newComment.removeChild(newComment.lastChild);
  // }     
 
  showNewComments()
  
  for (i = 0; i < newData[Btn].comments.length; i++){
          newComment.insertAdjacentHTML("afterend", `<section class="add-comment">
                                             <h1>${newData[Btn].comments[i]}</h1>
                                             </section>` )                                                                               
//   if (newComment.hasChildNodes()) {
//     newComment.removeChild(newComment.childNodes);
// } 
  } 
}
//add new comment and post it
const addComment = document.querySelector("#addCommentButton")
addComment.addEventListener("click", postComment)

function postComment(e) {
const posting = document.getElementById("commentTextbox").value
const newComment = document.querySelector("#comment")
newComment.insertAdjacentHTML("afterend", `<section class="add-comment">
                                       <h1>${posting}</h1>
                                       </section>` )
  const options = { 
      method: 'POST',
      headers : {
        "ContentType": "application/json"
      },
      body: JSON.stringify(posting)
  };

fetch(`http://localhost:3000/blogs/${uniqueBtn}/comments`, options)
  .then(r => r.json())
  .catch(console.warn) 
}
}
