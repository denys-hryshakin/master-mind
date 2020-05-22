const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.surname = !isEmpty(data.surname) ? data.surname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.login = !isEmpty(data.login) ? data.login : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "• First name is required!";
    } 
    if (Validator.isEmpty(data.surname)) {
        errors.surname = "• Surname is required!";
    } 
    // Login checks
    if (Validator.isEmpty(data.login)) {
        errors.login = "• Login is required!";
    } else if (!Validator.isLength(data.login, { max: 15 })) {
        errors.login = "• Login must not contain more than 15 characters!";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "• Email is required!";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "• Email is invalid!";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "• Password is required!";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "• Confirm password is required!";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "• Password must be at least 6 characters!";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "• Passwords must match!";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};