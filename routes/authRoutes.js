const express      = require('express');
const userRouter   = express.Router();
const User  =require('../models/user')
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require('connect-ensure-login');
//account edit and delete routes are in account routes


userRouter.get('/signup', (req, res, next)=>{

    res.render('userViews/signupPage', {theUser: req.user});
})

userRouter.post('/signup', (req, res, next)=>{
    const thePassword = req.body.password;
    const theUsername = req.body.username;
    if(thePassword === "" || theUsername === ""){
        res.render('userViews/signupPage', 
        {theUser:req.user, errorMessage: 'Please fill in both a username and password in order to create an account'})
        return;
    }
    User.findOne({'username': theUsername})
    .then((responseFromDB)=>{
        if (responseFromDB !== null){
            res.render('userViews/signupPage', {errorMessage: `Sor
            e ${theUsername} is awesome, so you cant have it. 
            Too late! Be a beta tester next time`})
            return;
        } // ends the if statement
            const salt     = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(thePassword, salt);
            User.create({username: theUsername, 
                password: hashedPassword, 
                email: req.body.email,
                phone: req.body.phone,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                isBusiness: req.body.isBusiness, 

            })
            .then((response)=>{
                res.redirect('/');
            })
            .catch((err)=>{
                next(err);
            })
    }) // ends the .then from the user.findOne
}); // ends the route


//login

userRouter.get('/login', (req, res, next)=>{
    res.render('userViews/loginPage', { theUser: req.user, message: req.flash("error") });
});

userRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));




userRouter.get("/logout", (req, res, next) => {
      req.logout();
      res.redirect("/login");
  });


module.exports = userRouter;