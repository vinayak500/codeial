
const User = require('../models/users');

module.exports.profile = function(req , res){
    // return res.end('<h1> Users Profile </h1>')
         User.findById(req.params.id , function(err , user){
          return res.render('user_profile' , {
               title: "User Profile" ,
               profile_user: user 
         })

});
};


module.exports.update = async function(req , res){
//    if(req.user.id == req.params.id){
//      User.findByIdAndUpdate(req.params.id , req.body ,function(err , user){
//           return res.redirect('/');
//      })
//    }else{
//      return res.status(401).send('Unauthorised');
//    }


if(req.user.id==req.params.id){

try{
     let user=await User.findById(req.params.id);
     User.uploadedAvatar(req,res,function(err){
            if(err){console.log('*******Multer Error' , err);}


            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){
               //this is saving the path of uploaded file into avatar feild in the user
               user.avatar=User.avatarPath + '/' + req.file.filename;
            }
                      user.save();
                      return res.redirect('back');
          //   console.log(req.file);

     });

}catch(err){
     req.flash('error',err);
            return res.redirect('back');
}

}
else{
     req.flash('error' , 'Unauthorised');
     return res.redirect('back');
}



};






//render signup page
module.exports.signUp = function(req,res)
{

     if(req.isAuthenticated())
     {
          return res.redirect('/users/profile');
     }



      return res.render('user_sign_up' , {
        title: "Codeial! Sign Up"
      })
};

//render signin page
module.exports.signIn = function(req,res)
{

     if(req.isAuthenticated())
     {
          return res.redirect('/users/profile');
     }


      return res.render('user_sign_in' , {
        title: "Codeial! Sign In",
      })
};

//get the sign up data
module.exports.create = function(req ,res)
{
     if(req.body.password != req.body.confirm_password)
     {
      return res.redirect('back');
     }

   User.findOne({email:req.body.email} , function(err , user) {
         if(err){console.log('error in finding user in signing up'); return;
        }

        if(!user)
        {
         User.create(req.body , function(err , user){
              if(err){console.log('error in creating user while signing up'); return;}
         
              return res.redirect('/users/sign-in');
         
             });
        }else{
         return res.redirect('back');
        }
        

   })

   

};




//sign in and create a session for user
module.exports.createSession = function(req ,res)
{
     return res.redirect('/');
};



module.exports.destroySession = function(req , res)
{
     req.logout(function(err) {
          if (err) { return next(err); }

          req.flash('success' , 'You have logged out');
          res.redirect('/');
        });

     // return res.redirect('/');

}