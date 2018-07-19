const express      = require('express');
const router   = express.Router();
const User      =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');
const Relationship =require('../models/relationship')

router.get('/businesslist', (req, res, next) => {
    User.find()
    .then((listOfBusinesses)=>{
    res.render('business/businessList', {listOfBusinesses});
  })
  .catch((err)=>{
    next(err);
  })
  });
  


router.get('/business/:id/connect', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    User.find()
    .then((listOfBusinesses)=>{
    res.render('business/newConnection', {listOfBusinesses});
    })
    .catch((err)=>{
        next(err);
      })
  });

router.post('/business/:id/createconnect', (req, res, next)=>{
    const newRelationship = new Relationship({
        customer: req.user._id,
        business: req.body.business,
        approvedByBusiness: 'false',
        approvedByCustomer: true
        })
    newRelationship.save()
        .then((response)=>{
            res.redirect('/')
        })
    .catch((err)=>{
        next(err);
    }) 

 })
 module.exports = router;

//  console.log("hellothere")
//  theCustomer=req.session.user_id,
//  console.log(theCustomer)


        // // business: 'hi',
        // customer: theCustomer,
        // approvedByBusiness: 'false',