const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
        content : {
            type:String,
            required:true
        } ,
        user : {
            type: mongoose.Schema.Types.ObjectId,
            // refer to User database model
            ref: 'User'
        } ,
        post :{
            type: mongoose.Schema.Types.ObjectId,
            //refer to Post database model
            ref: 'Post'
        }
} ,{
    timestamps: true
});


const Comment = mongoose.model('Comment' , commentSchema);
module.exports = Comment;