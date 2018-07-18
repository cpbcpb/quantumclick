const express = require('express');
const router  = express.Router();
const User  =require('../models/user')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {theUser: req.user});
});

router.get('/businesslist', (req, res, next) => {
  User.find()
  .then((listOfBusinesses)=>{
  res.render('business/businessList', {listOfBusinesses});
})
.catch((err)=>{
  next(err);
})
});
module.exports = router;
