const validator = require('email-validator');

const STATUS_CONSTANTS = require('./../constants/status.constants');
const AUTH_CONSTANTS = require('./../constants/auth.constants');

exports.validateEmail = (req, res, next) => {
    try {
        if (req.body.email !== undefined || req.body.email !== '') {

            if (!validator.validate(req.body.email)) {
                throw new Error(AUTH_CONSTANTS.INVALID_EMAIL_ADDRESS);
            }

            next();
        } else {
            throw new Error(AUTH_CONSTANTS.EMPTY_EMAIL_ADDRESS);
        }
    } catch (error) {
        res.status(400).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
        return;
    }
}

exports.validatePassword = (req, res, next) => {
    try {
        if (req.body.password == undefined || req.body.password == '') {
            throw new Error(AUTH_CONSTANTS.EMPTY_PASSWORD);
        }
        next();
    } catch (error) {
        res.status(400).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
        return;
    }
}