const isEmpty = require("./is-empty");
//add module.export and call the function
module.exports = function validateExperienceInput(data) {
  let errors = {};
  //add validations
  //for title field
  if (isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }
  //for data field
  if (isEmpty(data.company)) {
    errors.company = "Company field is required";
  }
  //for from field
  if (isEmpty(data.from)) {
    errors.from = "From date field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
};