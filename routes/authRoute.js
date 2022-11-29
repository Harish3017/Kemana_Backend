const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');

const commonMiddleware = require('../middlewares/commonMiddleware');

router.route ('/')
    .post(
        authController.Register
    );

router.route('/login')
    .post(
        commonMiddleware.validateEmail,
        commonMiddleware.validatePassword,
        authController.login
    );

router.route('/logout')
    .delete(
        authController.logout
    )

module.exports = router;