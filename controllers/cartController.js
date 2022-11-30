const Cart = require("../models/Cart");
const STATUS_CONSTANTS = require('../constants/status.constants');

//Create
exports.create = async(req,res) =>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save()
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data: savedCart
        });
    } catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//Update
exports.updateCart = async(req,res) =>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.parms.id,{
            $set:req.body,
        },{
            new:true
        });
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data: updatedCart
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//Delete
exports.deleteCart = async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.parms.id);
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//Get User Cart
exports.getUserCart = async(req,res) => {
    try{
        const cart = await Cart.findOne({userId:req.parms.userId});
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data:cart
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//GetAll
exports.getAll = async(req,res) =>{
    try{
        const carts = await Cart.find();
        res.status(200).json({
            message: STATUS_CONSTANTS.SUCCESS,
            data:carts
        });
    }catch (error) {
        res.status(500).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}