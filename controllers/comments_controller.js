const Comment = require('../models/comment');
const Post = require('../models/post');

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
return res.redirect('back');
            });
        }
     });
}