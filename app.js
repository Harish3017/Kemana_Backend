const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const ENV_CONSTANTS = require('./constants/env.constants');

const app = express();

const authRoute = require('./routes/authRoute');


const apiURL = '/api/kemana/';

app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === ENV_CONSTANTS.ENV_DEVELOPMENT) {
    app.use(morgan('dev'));
}

app.use(apiURL + 'auth/',authRoute);


module.exports = app