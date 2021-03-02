const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// DB config
const db = require('./config/keys').MongoURI;

// Connect To Mongo
mongoose.connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true })
 .then(()=> console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log('Server started at port 3000'));