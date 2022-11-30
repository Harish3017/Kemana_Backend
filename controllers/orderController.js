const Order = require("../models/Order");
const STATUS_CONSTANTS = require('../constants/status.constants');

//create
exports.create = async(req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const saveOrder = await newOrder.save();
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data: saveOrder
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//Get user orders
exports.getOrders = async(req,res)=>{
    try{
        const orders = await Order.find({
            userId: req.params.userId
        });
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data: orders
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}