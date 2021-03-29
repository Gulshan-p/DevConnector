const express = require('express');
const passport = require('passport');
const router = express.Router();
//load User and Profile model
const User = require('../../models/User');
const Profile = require('../../models/Profile');
// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
//dummy test
//router.get('/test', (req,res) => res.json({msg: 'profile works.'}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
   //find profile and grab the name and avatar from user collection by id
    Profile.findOne({ user: req.user.id })
    //.populate command will add more information from reference
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
  router.get("/all", (req, res) => {
  const errors = {};
//.find() will find and fetch all the profiles 
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      //display all profiles
      res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
  });

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
  router.get("/handle/:handle", (req, res) => {
  const errors = {};
  //find the profile based on the value stored in the handle variable.
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
    //display profile
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
  });

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
  router.get("/user/:user_id", (req, res) => {
  const errors = {};
  //pull the profile based on user_id.
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      //display profile
      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//@route  POST api/profile
//@des  Create or edit  user profile
//@access  private
router.post(
  "/",
  passport.authenticate("jwt", {session:false}),
  (req, res) => {
    //validations
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //end of validation
    //get data fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // if (typeof req.body.skills !== "undefined") can use this
    if(req.body.skills){
      profileFields.skills = req.body.skills.split(",");
    }
    //social 
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    // to check if profile already exsists.
    Profile.findOne ({user: req.user.id})
    .then(profile => {
      if(profile){
        //edit profile
        Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        )
        .then(profile => res.json(profile));
      }
      else{
        //create profile
        //check if handle already exsist.
        Profile.findOne({handle: profileFields.handle})
        .then(profile => {
          if(profile){
            return res.status(400).json({handle: "handle already exsists"});
          }
          //save profile
           new Profile(profileFields)
          .save()
          .then(profile => res.json(profile));
        })
      }
    })
    .catch(err => console.log(err));

  });

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
  router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      //check if profile exsist.
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      //end of checking profile.
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.experience.unshift(newExp);
      profile.save().then((profile) => res.json(profile));
    });
  }
);
// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //end validation part
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //check if profile exsist.
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      //end of checking profile
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.education.unshift(newEdu);
      //save 
      profile.save().then((profile) => res.json(profile));
    });
  }
);


//export
module.exports = router;