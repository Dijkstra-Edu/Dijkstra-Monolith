const mongoose = require('mongoose');
require('dotenv').config()
// const { compile } = require('morgan');

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB connection failed: ", err.message || err));