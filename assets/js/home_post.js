{
    //method to submit the form for new post using ajax
    let createPosts = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
                       e.preventDefault();

                       $.ajax({
                        type:'post',
                        url:'/posts/create/' ,
                        data: newPostForm.serialize(),

                        success:function(data){
                        console.log(data);
                          let newPost = newPostDom(data.data.post);
                          $('#posts-list-container>ul').postpend(newPost);
                        },
                        error: function(error){
                            console.log(error.responseText);
                        }
                       });
        });
    }




    let newPostDom = function(post)
    {
        return $(`<li id="post-${post._id}"> 
        <p>
         
            ${ post.content }
    
          <br>
           <small>
             ${post.user.name }
           </small>
          
        
            <small> <a class ="delete-post-button" href="/posts/destroy/${ post.id }"> Delete </a></small>  
        
        </p>
        </li>
    
    
        <div class ="post-comments">
       
          <div class="post-comments-list">
          <ul id="post-comments-${ post._id}"> 
                  
          </ul>
    
            <form action="/comments/create"  method="POST">
            <input type="text" name ="content" placeholder="type here to add comment..." >
            <input type ="hidden" name="post" value="${ post._id }">
            <input type="submit" value="Post">
            </form>
      
          </div>
        </div>
      </p>`)
    }


//   let newPostDom = function(post){
//     return $(``)
//   }


    //method to  create the post in DOM
    createPosts();
}