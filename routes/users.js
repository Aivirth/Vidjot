const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//User login route
router.get('/login', (req, res)=>{
    res.send('login');
});

//User register route
router.get('/register', (req, res)=>{
    res.send('register');
});


module.exports = router;