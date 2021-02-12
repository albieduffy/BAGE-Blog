//Button 0 -inside the function drawblogs
const newComment = document.querySelector("#comment")
const commentBtn = document.querySelector(`#button0`);
commentBtn.addEventListener("click", comment)

function comment(e){
  e.preventDefault()
  showNewComments();
  console.log(newData[0].comments)
  for (i = 0; i < newData[0].comments.length; i++){
    newComment.insertAdjacentHTML("afterend", `<section class="add-comment">
                                       <h1>${newData[0].comments[i]}</h1>
                                       </section>` )
  }  
}


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

fetch('http://localhost:3000/blogs/:id/comments', options)
  .then(r => r.json())
  .catch(console.warn) 

}