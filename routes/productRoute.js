const express = require('express');
const router = express.Router();
const verifyTokenController = require("../middlewares/verifyTokenController");
const productController = require("../controllers/productController");

router.route('/find/:id')
    .get(
        productController.getProduct
    )
router.route('/')
        .get(
            productController.getAll
        )
module.exports = router;