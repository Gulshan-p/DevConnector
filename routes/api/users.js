const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//dummy test
//router.get('/test', (req,res) => res.json({msg: 'users works.'}));

//@route  POST api/users/register
//@des  Register user
//@access  public

router.post('/register', (req, res) => {
  //validation call
  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  //end of validation call
  User.findOne({email: req.body.email})
        .then(user => {
          if(user){
                  return res.status(400).json({email: 'email already exsists'});
                  } 
          else{
           const avatar = gravatar.url(req.body.email, {
                  s: '200',  //size
                  r: 'pg',   //rating
                  d: 'mm'    //default image
                });

                bcrypt.genSalt(10, (err, salt) => {
                  if(err)
                  {
                    return res.status(500).json({password: 'password encryption failed'});
                  } 
                bcrypt.hash( req.body.password, salt, (err, hash) => {
                   if(err) {
                    return res.status(500).json({password: 'password encryption failed'});
                   }
                    const newUser = new User({
                      name: req.body.name,
                      email: req.body.email,
                      password: hash,
                      avatar
                  });
                     newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
                })
               }
         })
        .catch(err => console.log(err))
})

//@route  POST api/users/login
//@des  login the user
//@access  public

router.post('/login', (req, res) => { 
  //validation call
  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  //end of validation call
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email})
  .then(user => {
            if(!user){
              return res.status(404).json({email: 'user not found'});
            }
            //check password
            bcrypt.compare(password, user.password)
            .then(isMatch => {
              if(!isMatch){
              return res.status(400).json({password: 'password mismatch'});
                  } 
               else{
                    //return res.json({msg: 'successfully login'});
                    //generate a token
                    const payload = {
                      id: user.id,
                      name: user.name,
                      avatar: user.avatar
                    };
                    jwt.sign(
                      payload,
                      keys.secretOrKey,
                      {expiresIn: 3600},
                      (err, token) => {
                        return res.json({token: 'Bearer ' + token})
                      })
                  }
              })
  })
  .catch(err => console.log(err))
})
//@route  GET api/users/current
//@des  Return current user information
//@access  private

router.get(
  '/current', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    //return res.json({msg: 'success'});
    return res.json(req.user);
    //change req.user not to display

  })

//export
module.exports = router;