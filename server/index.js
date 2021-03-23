const express = require('express');
const http = require('http');
const path = require('path');
//const mongoose = require('mongoose');
const session = require('express-session');

const dotenv = require('dotenv').config();
const dburl = process.env.DB_URL;
const sessionSecret = process.env.SECRET;
const port = process.env.PORT;

//mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});


//Navigation
const clientPath =path.join(__dirname, '../client/');
const staticPath = path.join(clientPath, '/static/');
//const viewsPath = path.join(clientPath, '/views/');

const app = express();
app.use(express.static(path.join(clientPath,'static/')))

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


app.use(express.static(staticPath));

app.listen();