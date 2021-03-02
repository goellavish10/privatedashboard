const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const ejs = require('ejs');

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

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log('Server started at port 3000'));