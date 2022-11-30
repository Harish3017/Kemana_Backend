const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");
const verifyTokenController = require("../middlewares/verifyTokenController");

router.route('/')
    .post(
        verifyTokenController.verifyToken,
        cartController.create
    )
    .get(
        cartController.getAll
    )
router.route('/:id')
    .put(
        verifyTokenController.verifyTokenAndAuthorization,
        cartController.updateCart
    )
    .delete(
        verifyTokenController.verifyTokenAndAuthorization,
        cartController.deleteCart
    )
router.route('/find/:userId')
    .get(
        verifyTokenController.verifyTokenAndAuthorization,
        cartController.getUserCart
    )

module.exports = router;