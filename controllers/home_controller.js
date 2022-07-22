
const { populate } = require('../models/post');
const post = require('../models/post');


module.exports.home = function(req , res){
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
       post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
                path:'user'
        }
       }
       ).exec(function(err,posts){
        return res.render('home' , {
                title:'Codeial | Home' ,
                posts : posts
      });
       });

        // return res.render('home' , {
        //         title: "Home"
        // });
};