const validator = require('validator');
const isEmpty = require('./is-empty');
//add module.export and call the function
module.exports = function validateProfileInput(data){
    let errors = {};
//add validations
//for handle field
if(!validator.isLength(data.handle, {min:3, max:30})){
  errors.handle = 'handle must be between 3 and 30 characters';
   }
   if(isEmpty(data.handle)){
     errors.handle = 'Profile handle field is required';
   }
   //status field
   if(isEmpty(data.status)){
    errors.status = 'status field is required';
  }
  //skills field
  if(isEmpty(data.skills)){
    errors.skills = 'skills field is required';
  }
  //website field
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  //social field youtube
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  //social field twitter
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  //social field facebook
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  //social field linkedin
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  //social field instagram
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
   return{
    errors,
    isValid: isEmpty(errors)
  }
}