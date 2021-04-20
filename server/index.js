const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const {UserProfile} = require("./model.js");

const dotenv = require('dotenv').config();
const dburl = process.env.DB_URL;
const sessionSecret = process.env.SECRET || 'dice';
const port = process.env.PORT || 2000;

//Navigation
const clientPath =path.join(__dirname, '../client/');
const staticPath = path.join(clientPath, '/static/');

// Launch server(s)

const app = express();
const server = http.createServer(app);
//mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});
server.listen(port);


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

app.listen(5000);



app.set('view engine', 'ejs');
app.set('views', path.join(clientPath, '/views/'));


// Routing

app.get('/CharacterCreation', (res,req) => {
    res.render('CharacterCreation', {data: req.session});
});

app.post('/characterName', (req,res) => {
    console.log(req.body);
});

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