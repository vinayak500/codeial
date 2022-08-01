const post = require('../models/post');
const Comment = require('../models/comment');
// module.exports.create = function(req , res){
//     post.create({
//         content: req.body.content ,
//         user : req.user._id
//     } , function(err, post){
//         if(err){console.log('error in creating a post'); return; }
     
//         return res.redirect('back');
    
//     })
// }


module.exports.create = async function(req , res){
    
    try{
        let posts = await post.create({
            content: req.body.content ,
            user : req.user._id
        });


       if(req.xhr){
        return res.status(200).json({
            data:{
                post:posts
            },
            message:"post created"
        });
       }


        req.flash('Success' , 'Post created!')
        return res.redirect('back');
    }
    catch(err){
        req.flash('error' , err)
        console.log('Error' + err);
        return res.redirect('back');
    }
}




// module.exports.destroy = function(req , res){
//         post.findById(req.params.id , function(err , post){
//             // post.user is the id , 
//             // .id means converting object is to string 
//             // console.log(post.user);
//             // console.log(req.user.id);
//             if(post.user == req.user.id){
//                    post.remove();
//                    Comment.deleteMany({post : req.params.id} , function(err){
//                            return res.redirect('back');
//                    });

//             } else{
//                 return res.redirect('back');
//             }
//         })
// }




module.exports.destroy = async function(req , res){


        // post.user is the id , 
        // .id means converting object is to string 
        // console.log(post.user);
        // console.log(req.user.id);
try{
    let  posts = await post.findById(req.params.id);
    if(posts.user == req.user.id){
        posts.remove();
       await  Comment.deleteMany({post : req.params.id});

       req.flash('success' , 'Post and associated comment deleted');
                return res.redirect('back');
        

 } else{
    req.flash('error' , 'You cannot delete this post');
     return res.redirect('back');
 }
}
catch(err){
    req.flash('error' , err);
    console.log('Error' + err);
}
    };
