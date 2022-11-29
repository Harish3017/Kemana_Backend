const dotenv = require("dotenv");
dotenv.config({path: "config.env"});

const mongoose = require("mongoose");

const ENV_CONSTANTS = require('./constants/env.constants');

const app = require("./app");

mongoose.connect (
    process.env.NODE_ENV == 'DEV'
        ? process.env.DEV_DATABASE_URL
        :  process.env.DEV_DATABASE_URL, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(()=>{
        console.log(`${ENV_CONSTANTS.ENV_CONNECTED_TO_DB}: ${process.env.NODE_ENV}`);
    }).catch(error =>{
        console.log(error);
    })


app.listen(process.env.PORT, () =>{
    console.log(`${ENV_CONSTANTS.ENV_LISTENING_PORT}:${process.env.PORT}`);
})