const passport = require('passport');
const User = require('../models/users');

const LocalStrategy = require('passport-local').Strategy;


//authentication using passport 
passport.use(new LocalStrategy({
    usernameField: 'email', 
    passReqToCallback: true  
},
   function(req , email,password , done){
       //find a user and establish a identity  
       User.findOne({email:email} , function(err , user){
        if(err)
        {
            req.flash('error' , err);
            console.log('error in finding user --> Passport');
            return done(err);
        }
        if(!user || user.password != password)
        {
            req.flash('error' , 'Invalid Username/Password');
            console.log('Invalid Username/Pssword');
            return done(null,false);
        }

        //user is found
        return done(null, user);
       });
   }


));



// seralizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user , done){
    done(null , user.id);
});


//deserialing the user from the key in the cookies
passport.deserializeUser(function(id , done){
  User.findById(id , function(err , user){
          if(err) {
            console.log('error in finding user');
            return done(err);
          }
          return done(null,user);
  });
});

passport.checkAuthentication = function(req , res , next)
{
    //if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}
 
passport.setAuthenticatedUser = function(req , res , next)
{
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;