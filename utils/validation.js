import {ValidationError} from "./error.js";

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validateLength = (key, maxValue, descriptionOfError) => {
    if (!key && key.length > maxValue) {
        throw new ValidationError(descriptionOfError);
    }
}

export const validateMaxNumber = (key, value, descriptionOfError) => {
    if (!key && key < value) {
        throw new ValidationError(descriptionOfError);
    }
}