const express      = require('express');
const router   = express.Router();
const User  =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');
const Relationship =require('../models/relationship');

router.get('/account/myconnections', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    Relationship.find({$or: [{customer:req.user},{business:req.user}]})
    .populate('business')
    .populate('customer')
    .then((listOfRelationships)=>{
    res.render('userViews/myConnections', {theUser: req.user, listOfRelationships})
    })
    .catch((err)=>{
        next(err);
      })
    })
router.get('/businesslist', (req, res, next) => {
    User.find()
    .then((listOfBusinesses)=>{
        Relationship.find({$and:[{customer: req.user},{business:req.body.business}]})
        .populate('business')
        .populate('customer')
        .then((alreadyExists)=>{
        res.render('business/businessList', {listOfBusinesses, alreadyExists, theUser:req.user});
        console.log(alreadyExists)
    })
    .catch((err)=>{console.log('error from comparision'),
        next(err);
      })
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

router.post('/business/createconnect', (req, res, next)=>{
    Relationship.findOne({$and:[{'business':req.body.business},{'customer':req.user._id}]})
      .then((thisthing)=>{
        console.log('this thing' +thisthing)
        if(thisthing!==null){
            Relationship.find({$or: [{customer:req.user},{business:req.user}]})
            .populate('business')
            .populate('customer')
            .then((listOfRelationships)=>{
                res.render('userViews/myConnections', {theUser:req.user, Message:'You are connected to this business'})
            })
            .catch((err)=>{
                next(err);
              })    
        // res.render('/',{errorMessage: `You have already connected with this business.`})
            return;
          }
            const newRelationship = new Relationship({
            customer: req.user._id,
            business: req.body.business,
            approvedByBusiness: 'false',
            approvedByCustomer: true
            })        
        newRelationship.save()
        .then((thingy)=>{
        Relationship.find({$or: [{customer:req.user},{business:req.user}]})
        .populate('business')
        .populate('customer')
        .then((listOfRelationships)=>{
            res.render('userViews/myConnections', {listOfRelationships, theUser:req.user, Message:'You are connected to this business'})
        })
        .catch((err)=>{
            next(err);
          })    
        })
    })
})

router.post('/business/approve',(req, res, next)=>{
    Relationship.findByIdAndUpdate(req.body.relationshipId, {
    approvedByBusiness: req.body.approval
    })
    .then((thingy)=>{
        Relationship.find({$or: [{customer:req.user},{business:req.user}]})
        .populate('business')
        .populate('customer')
        .then((listOfRelationships)=>{
        res.redirect('/account/myconnections')
        })
        .catch((err)=>{
            next(err);
          })
        })   
    .catch((err)=>{
        next(err);
    })  
})

 module.exports = router;
