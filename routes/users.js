const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//User login Route
router.get('/login', (req,res) => {
    res.render('users/login');
});

//load User Model
require('../models/User');
const User = mongoose.model('users');

//User Register Route
router.get('/register', (req,res) => {
    res.render('users/register');
});

//Register Form POST
router.post('/register', (req,res)=>{
    let errors = [];
    if (req.body.password != req.body.password2){
        errors.push({text: 'Passwords do not match'});
    }
    if (req.body.password.length < 4){
        errors.push({text: 'Passwords must be at least 4 characters'});
    }
    if (errors.length > 0){
        res.render('users/register', {
            errors,
            name:req.body.name,
            email: req.body.email
        });
    }else{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then((user)=>{
                    req.flash('success_mng', 'You are now registered and can log in');
                    res.redirect('/users/login');
                }).catch(err => {
                    console.log(err);
                    return;
                });
            });
        });

    }

});

module.exports = router;