const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const ENV_CONSTANTS = require('./constants/env.constants');

const app = express();

const authRoute = require('./routes/authRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');

const apiURL = '/api/v1/';

app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === ENV_CONSTANTS.ENV_DEVELOPMENT) {
    app.use(morgan('dev'));
}

//app routes
app.use(apiURL + 'auth/',authRoute);
app.use(apiURL + 'product/',productRoute);
app.use(apiURL + 'order/',orderRoute);
app.use(apiURL + 'cart/',cartRoute);

module.exports = app