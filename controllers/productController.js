const Product = require("../models/Product");
const STATUS_CONSTANTS = require('../constants/status.constants');

//Add product 
exports.addProduct = async(req,res) =>{
    const newProduct = new Product(req.body);

    try{
        const saveProduct = await Product.create(newProduct);
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data: saveProduct
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}
//Get product by Id
exports.getProduct = async(req,res) => {
    try{
        const product = await Product.findById(req.parms.id);
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data: product
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//Get All Products
exports.getAll = async (req,res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        } else if (qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory],
                },
            });
        }else {
            products = await Product.find();
        }
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data: products
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }

}