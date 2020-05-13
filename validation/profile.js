const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateProfileInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.surname = !isEmpty(data.surname) ? data.surname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.login = !isEmpty(data.login) ? data.login : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "• First name is required!";
    } else if (!Validator.isAlpha(data.first_name, ['ar-AE'])) {
        errors.first_name = "• First name must contain only letters!";
    }
    if (Validator.isEmpty(data.surname)) {
        errors.surname = "• Surname is required!";
    } else if (!Validator.isAlpha(data.surname, ['ar-AE'])) {
        errors.surname = "• Surname must contain only letters!Second name is required!";
    }
    // Login checks
    if (Validator.isEmpty(data.login)) {
        errors.login = "• Login is required!";
    }
    if (Validator.isLength(data.login, { min: 6, max: 15 })) {
        errors.login = "• Login must be at least 6 symbols!";
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