const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePostInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.text = !isEmpty(data.text) ? data.text : "";

    // Name checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "• Title is required!";
    } else if (!Validator.isLength(data.title, {min: 10, max: 100})){
        errors.title = "• The title must contain from 10 to 100 characters!"
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = "• Text is required!";
    } else if (!Validator.isLength(data.text, { min: 50, max: 1500 })) {
        errors.text = "• The text must contain from 50 to 1500 characters!";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};