const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/commentsmailer');


module.exports.create = function(req , res){
     Post.findById(req.body.post , function(err , post){
        if(post){
            // console.log(req);
            console.log(req.body.content);
            console.log(req.body.post );
            console.log(req.user._id);
            Comment.create({
                content : req.body.content ,
                post: req.body.post ,
                user: req.user._id
            } , function(err , comment)     {
//handle error
// if(err)
// {
//     console.log('Error in creating comment');
//     return;
// }
post.comments.push(comment);
//call save after updating
post.save();

// comment = await comment.populate('user', 'name email').execPopulate();
// commentsMailer.newComment(comment);


return res.redirect('back');
            });
        }
     });
}



module.exports.destroy = function(req , res){
    Comment.findById(req.params.id , function(err , comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId , {$pull : {comments:req.params.id}} , function(err , post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        } 
    })
}