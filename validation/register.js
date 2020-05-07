const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.second_name = !isEmpty(data.second_name) ? data.second_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.login = !isEmpty(data.login) ? data.login : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "First name field is required";
    }
    if (Validator.isEmpty(data.second_name)) {
        errors.second_name = "Second name field is required";
    }
    // Login checks
    if (Validator.isEmpty(data.login)) {
        errors.login = "Login field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};