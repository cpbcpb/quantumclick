//right now this file is garbage


const express     = require('express');
const router      = express.Router();
const Meet        = require('../models/meet');
const Relationship      = require('../models/relationship');
const ensureLogin = require('connect-ensure-login');

// router.use((req, res, next) => {
//     if (req.session.currentUser) {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   });
// this way make all the routes in the file private (and also any other routes
// that are connected to app.js AFTER this file)



router.post('/meets/create', (req, res, next)=>{
   const newMeet = new Meet({
    date: req.body.date,
    time: req.body.time,
    duration: req.body.duration,
   })

   newMeet.save()
   .then((response)=>{
       res.redirect('/meets')
   })
   .catch((err)=>{
       next(err);
   }) 
})

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

router.get('/meets/new', (req, res, next) =>{
     User.find()
    .then((allTheUsers)=>{
        res.render('meet/newMeet',{allTheUsers});
    })
    .catch((err)=>{
        next(err);
    })
});

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
    // if(!req.session.currentUser){
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
