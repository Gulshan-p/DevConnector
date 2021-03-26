const validator = require('validator');
const isEmpty = require('./is-empty');
//add module.export and call the function
module.exports = function validateLoginInput(data){
    let errors = {};

//add validations
   //for email
   if(isEmpty(data.email)){
    errors.email = 'Email field is required';
    }
   if(!validator.isEmail(data.email)) {
    errors.email = 'email is invalid';
   }
   //for password
   if(!validator.isLength(data.password, {min:6, max:30})){
    errors.password = 'password must be between 6 and 30 characters';
     }
   if(isEmpty(data.password)){
    errors.password = 'password field is required';
    }
    return{
     errors,
     isValid: isEmpty(errors)
    }
}