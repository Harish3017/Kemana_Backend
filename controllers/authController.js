const User = require("../models/User");
const CryotoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//const cookieParser = require('cookie-parser');
//const session = require('express-session');
//const passport = require("passport");
const STATUS_CONSTANTS = require('../constants/status.constants');
const USERS_CONSTANTS = require('../constants/users.constants');

//Register
exports.Register = async(req,res)=>{
    try{
        const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password.env.PASS_SEC).toString(),
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            message:STATUS_CONSTANTS.SUCCESS,
            data:savedUser
        })
    }
        catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//Login
exports.login = async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});

        if (!user) {
            throw new Error(AUTH_CONSTANTS.USER_DOES_NOT_EXISTS);
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryotoJS.enc.Utf8);
        
        const inputPassword = req.body.password;

        originalPassword != inputPassword && 
            res.status(401).json({
                message:USERS_CONSTANTS.PASSWRODS_DO_NOT_MATCH
            });
        
            //create json web token
            const accessToken = jwt.sign ({
                id:user._id,
            },
            process.env.JWT_SEC,
            {
                expiresIn:"3d"
            }
            );

        const{password, ...others} = user._doc;

        res.status(200).json({
            ...others,
            message: STATUS_CONSTANTS.SUCCESS,
            data:accessToken
        });
    }   
    
    catch (error) {
        console.log(error.message);
        res.status(401).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}

//logout
exports.logout = async(req,res) =>{
    try{
        if(req.session){
            req.session.destroy(err=>{
                if(err){
                res.status.send('Unable to logout');
                }
                else{
                    res.send('Logout Successful');
                }
            });
        } else {
            res.end();
        }
    }  catch (error) {
        console.log(error.message);
        res.status(401).json({
            message: STATUS_CONSTANTS.FAIL,
            error: error.message
        });
    }
}