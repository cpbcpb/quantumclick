//right now this file is garbage

const express      = require('express');
const router   = express.Router();
const User  =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');
const Meet        = require('../models/meet');
const Connection      = require('../models/connection');


// router.use((req, res, next) => {
//     if (req.meet.currentUser) {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   });
// this way make all the routes in the file private (and also any other routes
// that are connected to app.js AFTER this file)

// view form to create meet  
router.get('/meets/new', (req, res, next) =>{
    Connection.find({business:req.user})
    .populate('customer')
   .then((allRelationships)=>{
       res.render('meet/newMeet', {allRelationships, theUser: req.user});
   })
   .catch((err)=>{
       next(err);
   })
});

//create meet
router.post('/meets/create', (req, res, next)=>{
   const newMeet = new Meet({
    meetName: req.body.meetName,
    business: req.body.business,
    location: req.body.location,
    isConfirmed: true,
    dateTime: req.body.dateTime,
    durationInMinutes: req.body.durationInMinutes,
    imageURL: req.body.imageURL
   })
   newMeet.save()
   console.log(`newmeetid`+newMeet._id)
   User.update({_id: req.user._id},{$push: { meets: newMeet._id}})
   .then((theMeet)=>{
       console.log('doit')
       console.log(newMeet)
       console.log(req.user._id)
       console.log(newMeet._id)

   })
   .catch((err)=>{
       next(err);
   })
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
router.get('/account/mymeets', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    Meet.find({$or: [{customer:req.user},{business:req.user}]})
    .populate('business')
    .populate('customer')
    .then((listOfMeets)=>{
    res.render('userViews/myMeets', {theUser: req.user, listOfMeets})
    })
    .catch((err)=>{
        next(err);
      })
    })



// ____nothing below line is working now___________________________

//view single meet to edit it
router.get('/meets/:id/edit', (req, res, next)=>{
   Meet.findById(req.params.id)
   .then((theMeet)=>{

        User.find()
        .then((allTheUsers)=>{

            allTheUsers.forEach((user)=>{

                if(user._id.equals(theMeet.business)){
                
                    user.yes = true;
                }
            })        
            res.render('editMeet', {theMeet: theMeet, alltheMeets: alltheMeets})
        })
        .catch((err)=>{
            next(err)
        })
   })
   .catch((err)=>{
       next(err);
   })
})
//update the meet
router.post('/meets/:id/update', (req, res, next)=>{
    Meet.findByIdAndUpdate(req.params.id, {
        time: req.body.time,
        duration: req.body.duration,
        date: req.body.date,
    })
    .then((theMeet)=>{
        res.redirect('/meet/'+theMeet._id)
    })
    .catch((err)=>{
        next(err);
    })  
})

//delete the meet

router.post('/meets/:id/delete', (req, res, next)=>{
    Meet.findByIdAndRemove(req.params.id)
    .then((reponse)=>{
        res.redirect('/meets');
    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/meets',(req, res, next) => {
    // if(!req.meet.currentUser){
    //     res.redirect('/login');
    //     return;
    // } // this way you can use to make ONE SINGLE ROUTE private but oyu have to do it in every route that you want to restrict
    Meet.find()
    .populate('customer')
    .populate('business')
    .then((listOfMeets)=>{
        res.render('meet/meets', {listOfMeets});
    })
    .catch((err)=>{
        next(err); 
     })
});

module.exports = router;
