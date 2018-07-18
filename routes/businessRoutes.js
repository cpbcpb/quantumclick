const express      = require('express');
const router   = express.Router();
const User  =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');

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


