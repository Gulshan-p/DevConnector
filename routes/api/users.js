const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const router = express.Router();
//dummy test
//router.get('/test', (req,res) => res.json({msg: 'users works.'}));

//@route  POST api/users/register
//@des  Register user
//@access  public

router.post('/register', (req, res) => {
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
                    return res.json({msg: 'successfully login'});
                  }
              })
  })
  .catch(err => console.log(err))
})
//export
module.exports = router;