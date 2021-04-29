const validator = require('validator');
const isEmpty = require('./is-empty');
//add module.export and call the function
module.exports = function validateRegisterInput(data){
    let errors = {};

//add validations
//for name field
if(!validator.isLength(data.name, {min:3, max:30})){
  errors.name = 'name must be between 3 and 30 characters';
   }
   if(isEmpty(data.name)){
     errors.name = 'Name field is required';
   }
   //for email
   if(!validator.isEmail(data.email)) {
    errors.email = 'email is invalid';
   }
   if(isEmpty(data.email)){
    errors.email = 'Email field is required';
    }
   //for password
   if(!validator.isLength(data.password, {min:6, max:30})){
    errors.password = 'password must be between 6 and 30 characters';
     }
   if(isEmpty(data.password)){
    errors.password = 'password field is required';
    }
    //for confirm password
    if(!validator.equals(data.password, data.password2)) {
      errors.password2 = 'password must match';
    }
    if(isEmpty(data.password2)){
      errors.password2 = 'confirm password fields is required';
      }

   return{
     errors,
     isValid: isEmpty(errors)
   }
}