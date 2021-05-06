const validator = require('validator');
const isEmpty = require('./is-empty');
//add module.export and call the function
module.exports = function validatePostInput(data){
    let errors = {};
//add validations
//for text field
if(!validator.isLength(data.text, {min:5, max:300})){
  errors.text = 'text must be between 5 and 300 characters';
   }
   if(isEmpty(data.text)){
     errors.text = 'Text field is required';
   }
   return{
    errors,
    isValid: isEmpty(errors)
  }
}