const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
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

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//index route
app.get('/', (req, res)=>{
    const title = 'Index';
    res.render('index', {
        title : title
    });
});

//about route
app.get('/about', (req, res)=>{
    const title = 'About';
    res.render('about', {
        title : title
    });
});

//add idea form
app.get('/ideas/add', (req, res)=>{
    const pageTitle = 'Add new video idea';
    res.render('ideas/add', {
        pageTitle : pageTitle
    });
});

//process form
app.post('/ideas', (req, res)=>{
    pageTitle = 'Add new video idea';
    let errors = [];
    if(!req.body.title){
        errors.push({text : 'please add a title'})
    }
    if(!req.body.details){
        errors.push({text : 'please add details'})
    }    

    if(errors.length > 0){
        res.render('ideas/add', {
            pageTitle : pageTitle,
            errors : errors,
            title : req.body.title,
            details : req.body.details
        })
    }else{
        res.send('passed');
    }
});


const port = 5000;
app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});