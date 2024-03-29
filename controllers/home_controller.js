const Post = require('../models/post');
const User = require('../models/users');

module.exports.home = async function(req , res){
        //   return res.end('<h1> Home Page </h1>')

        // cookie data can be altered or changed in both browser or server side
        //cookies sent from browser to server and back from server to browser
//      console.log(req.cookies);
//      res.cookie('user_id' , 25);

//        post.find({} , function(err,posts){
//              return res.render('home' , {
//                        tittle:'Codeial | Home' ,
//                        posts : posts
//              });
//        });


// populate the user of each part
    /*   Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
                path:'user'
        }
       }
       ).exec(function(err,posts){


         User.find({} , function(err , users){
                return res.render('home' , {
                        title:'Codeial | Home' ,
                        posts : posts ,
                        all_users : users 
              });
         })

       
       }); */


        // return res.render('home' , {
        //         title: "Home"
        // });





try{
      let posts = await Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
                path:'user'
        }
       });

       let users = await User.find({});


       return res.render('home' , {
        title:'Codeial | Home' ,
        posts : posts ,
        all_users : users 
         });
        }    
 catch(err) {
        console.log(err);
        }



}