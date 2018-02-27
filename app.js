const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');


//initialize app
const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
    .then(()=>  console.log('MongoDB connected'))
    .catch(err => console.log(`could not connect ${err}`));

//load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



//index route
app.get('/', (req, res)=>{
    const title = 'Index';
    res.render('index', {
        title : title
    });
});

//index route
app.get('/about', (req, res)=>{
    const title = 'About';
    res.render('about', {
        title : title
    });
});


const port = 5000;
app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});