const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//load auth helper
const {ensureAuthenticated} = require('../helpers/auth');

//load Idea model
require('../models/Idea');
const Idea = mongoose.model('ideas');

//add idea form
router.get('/add',ensureAuthenticated, (req, res)=>{
    const pageTitle = 'Add new video idea';
    res.render('ideas/add', {
        pageTitle : pageTitle
    });
});

//edit idea form
router.get('/edit/:id',ensureAuthenticated, (req, res)=>{
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
router.get('/',ensureAuthenticated, (req, res)=>{
    Idea.find({user: req.user.id})
        .sort({date : 'desc'})
        .then(ideas => {
            if(idea.user != req.user.id){
                req.flash('err_msg', 'Not Authorized');
                res.redirect('/ideas')
            }else{
                res.render('ideas/index', {
                    ideas : ideas
                })
            }            
        })    
});

//process form
router.post('/', ensureAuthenticated, (req, res)=>{
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
            details : req.body.details,
            user : req.user.id
        };
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Video idea added');
                res.redirect('/ideas');
            })
            .catch(err => console.log(err));
    }
});

//edit form process
router.put('/:id', ensureAuthenticated, (req, res)=>{
    Idea.findOne({
        _id : req.params.id
    })
    .then(idea => {
        //new values from form
        idea.title = req.body.title;
        idea.details = req.body.details;

        idea.save()
            .then(idea => {
                req.flash('success_msg' , 'Video Idea Edited');
                res.redirect('/ideas');
            });
    })
    .catch(err => console.log(err));
});

//delete form process
router.delete('/:id', ensureAuthenticated, (req, res)=>{
    Idea.remove({
        _id : req.params.id
    })
    .then(() => {
        req.flash('success_msg' , 'Video Idea Removed');
        res.redirect('/ideas');
    })
    .catch(err => console.log(err));
});

//export routes as module
module.exports = router;