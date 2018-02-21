const express = require('express');

//initialize app
const app = express();

//index route
app.get('/', (req, res)=>{
    req.send('index');
});

//index route
app.get('/about', (req, res)=>{
    req.send('about');
});


const port = 5000;
app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});