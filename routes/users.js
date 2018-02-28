const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const passport = require('passport');
const router = express.Router();

//load user model
require('../models/User');
const User = mongoose.model('users');


//User login route
router.get('/login', (req, res)=>{
    res.render('users/login');
});

//User register route
router.get('/register', (req, res)=>{
    res.render('users/register');
});

//Register form POST
router.post('/register', (req, res)=>{

    const passwordLength = 5;
    
    let errors = [];
    if(req.body.password != req.body.password2){
        errors.push({text: "Passwords do not match"});
    }
    if(req.body.password.length < passwordLength){
        errors.push({text: `Password must be at least ${passwordLength} characters`});
    }

    if(errors.length > 0){
        res.render('users/register', {
            errors : errors,
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            password2 : req.body.password2
        });
    }else{
        User.findOne({email : req.body.email})
        .then(user => {
            if(user){
                req.flash('err_msg', 'Email already in use');
                res.redirect('/users/register');
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password : req.body.password
                });

                bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can login');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));                         
                    });
                });               
            }
        })
        .catch(err => console.log(err));
    }
})


module.exports = router;