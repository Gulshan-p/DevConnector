const express = require('express');
const passport = require('passport');
const router = express.Router();
//load Posts and Profile model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// Load Validation
const validatePostInput = require("../../validation/post");
//test
//router.get('/test', (req,res) => res.json({msg: 'post works.'}));
//export

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    //save post
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;