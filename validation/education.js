const isEmpty = require("./is-empty");
//add module.export and call the function
module.exports = function validateEducationInput(data) {
  let errors = {};
//for school field
  if (isEmpty(data.school)) {
    errors.school = "School field is required";
  }
//for degree field
  if (isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }
//for fieldofstudy field
  if (isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
  }
//for from date field
  if (isEmpty(data.from)) {
    errors.from = "From date field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
};