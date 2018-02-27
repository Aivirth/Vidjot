const express = require('express');
const exphbs = require('express-handlebars');
var methodOverride = require('method-override');
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

// method override middleware
app.use(methodOverride('_method'));

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

//edit idea form
app.get('/ideas/edit/:id', (req, res)=>{
    const pageTitle = 'Edit video idea';
    Idea.findOne({
        _id : req.params.id
    })
    .then(idea => {
        res.render('ideas/edit', {
            pageTitle : pageTitle,
            idea : idea
        });
    })
    .catch(err => console.log(err));

    
});

//render ideas page
app.get('/ideas', (req, res)=>{
    Idea.find({})
        .sort({date : 'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas : ideas
            })
        })    
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
        const newUser = {
            title : req.body.title,
            details : req.body.details
        };
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas')
            })
            .catch(err => console.log(err));
    }
});

//edit form process
app.put('/ideas/:id', (req, res)=>{
    Idea.findOne({
        _id : req.params.id
    })
    .then(idea => {
        //new values from form
        idea.title = req.body.title;
        idea.details = req.body.details;

        idea.save()
            .then(idea => {
                res.redirect('/ideas');
            });
    })
    .catch(err => console.log(err));
});

//delete form process
app.delete('/ideas/:id', (req, res)=>{
    Idea.remove({
        _id : req.params.id
    })
    .then(() => {res.redirect('ideas')})
    .catch(err => console.log(err));
});

const port = 5000;
app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});