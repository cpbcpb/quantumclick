//currently user password and username cannot be changed.
const express      = require('express');
const router   = express.Router();
const User  =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');
router.get('/account', ensureLogin.ensureLoggedIn(), (req, res)=>{
    res.render('userViews/account', {theUser: req.user});
})

router.get('/account/edit',  ensureLogin.ensureLoggedIn(), (req, res, next)=>{
res.render('userViews/editAccount', {theUser: req.user});
})

router.post('/user/update', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    User.findByIdAndUpdate(req.user._id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        websiteURL: req.body.websiteURL,
        businessDescription: req.body.businessDescription,
        businessName: req.body.businessName,

    })
    .then((theUser)=>{
        res.redirect('/account')
    })
    .catch((err)=>{
        next(err);
    })  
})

router.get('/account/areyousure',  ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    res.render('userViews/deleteConfirm', {theUser: req.user});
    })

    router.post('/user/delete', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
        User.findByIdAndRemove(req.user._id)     
        .then((reponse)=>{
            res.redirect('/');
        })
        .catch((err)=>{
            next(err);
        })
    })

module.exports = router;
