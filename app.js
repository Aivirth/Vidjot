const express = require('express');

//initialize app
const app = express();
const port = 5000;
app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});