module.exports.profile = function(req , res){
    // return res.end('<h1> Users Profile </h1>')

    return res.render('user_profile' , {
        title: "Home"
});
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