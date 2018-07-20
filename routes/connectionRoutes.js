//create connection
//see connection
//business approve connection
const express      = require('express');
const router   = express.Router();
const User  =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');
const Connection =require('../models/connection');
const Meet = require('../models/meet')

router.get('/account/myconnections', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    Connection.find({$or: [{customer:req.user},{business:req.user}]})
    .populate('customer')
    .populate('business')
    .populate({
        path:'business',
    populate: {
        path: 'meets',
        model: 'Meet'
    }
})
    .then((listOfConnections)=>{
    res.render('userViews/myConnections', {theUser: req.user, listOfConnections})
    })
    .catch((err)=>{
        next(err);
      })
    })
router.get('/businesslist', (req, res, next) => {
    User.find()
    .then((listOfBusinesses)=>{
        Connection.find({$and:[{customer: req.user},{business:req.body.business}]})
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
    Connection.findOne({$and:[{'business':req.body.business},{'customer':req.user._id}]})
      .then((thisthing)=>{
        console.log('this thing' +thisthing)
        if(thisthing!==null){
            Connection.find({$or: [{customer:req.user},{business:req.user}]})
            .populate('business')
            .populate('customer')
            .then((listOfConnections)=>{
                res.render('userViews/myConnections', {theUser:req.user, Message:'You are connected to this business'})
            })
            .catch((err)=>{
                next(err);
              })    
        // res.render('/',{errorMessage: `You have already connected with this business.`})
            return;
          }
            const newConnection = new Connection({
            customer: req.user._id,
            business: req.body.business,
            approvedByBusiness: 'false',
            approvedByCustomer: true
            })        
        newConnection.save()
        User.update({_id: req.user._id},{$push: { connections: newConnection._id}})   
        .then((thingy)=>{
        Connection.find({$or: [{customer:req.user},{business:req.user}]})
        .populate('business')
        .populate('customer')
        .then((listOfConnections)=>{
            res.render('userViews/myConnections', {listOfConnections, theUser:req.user, Message:'You are connected to this business'})
        })
        .catch((err)=>{
            next(err);
          })    
        })
    })
})


router.post('/business/approve',(req, res, next)=>{
    User.update({_id: req.user._id},{$push: { connections: req.body.connectionId}});
    Connection.findByIdAndUpdate(req.body.connectionId,{approvedByBusiness:req.body.approval})
    .then((thingy)=>{
        Connection.find({$or: [{customer:req.user},{business:req.user}]})
        .populate('business')
        .populate('customer')
        .then((listOfConnections)=>{
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
