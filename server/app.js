if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const { connect: connectDatabase }= require('./boot/mongodb');

app.use(connectDatabase);

app.use(require('morgan')(process.env.NODE_ENV));
app.use(require('cors')());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const user = require('./routes/user');
const hospital = require('./routes/hospital');
app.use('/user', user);
app.use('/hospital', hospital);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports.handler = serverless(app);