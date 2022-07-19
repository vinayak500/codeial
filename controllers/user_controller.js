
const User = require('../models/users');

module.exports.profile = function(req , res){
    // return res.end('<h1> Users Profile </h1>')


    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id , function(err, user){
          if(user)
          {
            console.log(user);
            return res.render('user_profile' ,{
              title: "User Profile",
              user: user
            })
          }else{
            return res.redirect('/users/sign-in');
          }

          // return res.redirect('/users/sign-in');
        });
    }
    else{
      return res.redirect('/users/sign-in');
    }

};

//render signup page
module.exports.signUp = function(req,res)
{
      return res.render('user_sign_up' , {
        title: "Codeial! Sign Up"
      })
};

//render signin page
module.exports.signIn = function(req,res)
{
      return res.render('user_sign_in' , {
        title: "Codeial! Sign In"
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
  //steps to authenticate
     //find the user 
      User.findOne({email:req.body.email} , function(err,user){

        if(err){console.log('error in finding user in signing up'); return;}

     //handle user found
             if(user)
             {
 //handle password which dont match
              if(user.password != req.body.password)
              {
                return res.redirect('back');
              }
               //handle session creation
                    res.cookie('user_id',user._id);
                    return res.redirect('/users/profile');
                           
             }else
             {
               //handle user not found
              return res.redirect('back');
             }


      })


    

    

    
};