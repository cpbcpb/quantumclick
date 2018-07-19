const express      = require('express');
const router   = express.Router();
const User  =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {theUser: req.user});
});

module.exports = router;
