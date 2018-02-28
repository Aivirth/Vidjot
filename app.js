const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
var methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//initialize app
const app = express();

//Load Routes
const ideas = require('./routes/indeas');
const users = require('./routes/users');

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
    .then(()=>  console.log('MongoDB connected'))
    .catch(err => console.log(`could not connect ${err}`));


/////////////////////////////////////////////////
//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder middleware
app.use(express.static(path.join(__dirname, 'public')));

//session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//flash middleware
app.use(flash());

//global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.err_msg = req.flash('err_msg');
    res.locals.error = req.flash('error');
    next();
});

// method override middleware
app.use(methodOverride('_method'));

////////////////////////////////////////
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


//use Routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;
app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});