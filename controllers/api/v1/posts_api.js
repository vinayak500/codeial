const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req , res){
    let posts = await Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
                path:'user'
        }
       });
    return res.json(200 , {
        message:"list of posts",
         posts :posts
    });
}



module.exports.destroy = async function(req , res){
try{
let  posts = await Post.findById(req.params.id);
   console.log('hello');
    posts.remove();
   await  Comment.deleteMany({post : req.params.id});   
   return res.json(200,{
     message: "Post and associated message deleted!"
   });
}
catch(err){
     return res.json(500, {
        message:"Internal server error!"
     });
}
}