module.exports.home = function(req , res){
        //   return res.end('<h1> Home Page </h1>')

        // cookie data can be altered or changed in both browser or server side
        //cookies sent from browser to server and back from server to browser
//      console.log(req.cookies);
//      res.cookie('user_id' , 25);
        return res.render('home' , {
                title: "Home"
        });
};