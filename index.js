const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//this synatx doesnt work   
//try this npm package 
// https://www.npmjs.com/package/connect-mongodb-session
// const MongoStore = require('connect-mongo')(session);

const MongoStore = require('connect-mongo');

//node-sass-middleware
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss/',
    dest: './assets/css/',
    debug: false ,
    outputStyle: 'extended' ,
    prefix: '/css' 
}));



app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);
//use express router'


app.set('view engine' , 'ejs');
app.set('views' , './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },


      store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development' ,
            autoRemove: 'disabled'
        },
        function(err)
        {
            console.log(err || 'connect-mongodb setup ok');
         }
    )



    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
    //     },
    //     function(err)
    //     {
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use('/' , require('./routes/index'));
app.listen(port , function(err){
    if(err){
        // console.log('Error: ' + err);
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});

