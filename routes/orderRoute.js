const express = require('express');
const router = express.Router();
const verifyTokenController = require("../middlewares/verifyTokenController");
const orderController = require("../controllers/orderController");

router.route('/')
    .post(
        verifyTokenController.verifyToken,
        orderController.create
    )
router.route('/find/:userId')
    .get(
        verifyTokenController.verifyTokenAndAuthorization,
        orderController.getOrders
    )
module.exports = router;