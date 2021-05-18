const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
//const bodyparser = require('body-parser');
const {UserProfile} = require("./gamemodels.js");
const {Character} = require("./gamemodels.js");
const ejs = require('ejs');

const dotenv = require('dotenv').config();
const dburl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/ProjectBlue';
const sessionSecret = process.env.SECRET || 'dice';
const port = process.env.PORT || 2000;

//Navigation
const clientPath =path.join(__dirname, '../client/');
const staticPath = path.join(clientPath, '/static/');
const router = require('./router')

// Launch server(s)

const app = express();
const server = http.createServer(app);
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});
server.listen(port);
app.use(express.urlencoded({extended:true}));

// Site-wide middleware



app.use(express.static(staticPath));
app.use(session({
    cookie: {
        maxAge: 1000*60*60*24*7,
        secure: false
    },
    key: 'user_sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: 'dicecapades'
}));

//app.use(bodyParser);
app.listen(5000);

app.set('view engine', 'ejs');
app.set('views', path.join(clientPath, '/views/'));

// constant sets

app.use((req, res, next)=>{console.log(req.originalUrl); next();})
app.use(express.static(staticPath));
app.use('/', router);


// Routing


app.get('/chat/', (req,res) => {
   res.render('chat');
})



// Debug

app.use((req,res,next)=>{
    console.log(req.originalUrl);
    next();
});

// Chat server

const chatserver = require('./chatserver');
chatserver.launch(server);

const { render } = require('ejs');
chatserver.launch(server);

//Login
const authenticated = function(req, res, next) {
    if(req.session.authenticated) {
        next();
    }
    else{
        res.send("Acess Denied");
    }
}


app.post('/register', async (req, res)=> {
    try {
        var hashedpass = await bcrypt.hash(req.body.password, 10);
        var user = new UserProfile(req.body);
        user.password = hashedpass;
        await user.save();
        res.redirect('/login.html');
    }
    catch(e) {
        console.log(e);
        res.send("Unable to register");
    }
});

app.post('/login', (req, res)=> {
    console.log("logging in");
    UserProfile.findOne({username: req.body.username}, async (error, result)=> {
        if(error) {
            console.log(error);
            res.send("!");
        }
        else if(!result) {
            res.send("User not found");
        }
        else {
            try {
                let match = await bcrypt.compare(req.body.password, result.password);
                if(match){
                    req.session.username = result.username;
                    req.session.authenticated = true;
                    req.session.isModerator = result.isModerator;
                    
                    //this still needs some tinkering
                    if(result.character) {
                        req.session.character = result.character
                        res.redirect('/mission.html');

                    }
                    else {
                        res.redirect('/game.html');
                    }
                }
                else {
                    res.send('Incorrect Password');
                }
            }
            catch(e) {
                console.log(e);
                res.send('Error');
            }
        }
    });
});
