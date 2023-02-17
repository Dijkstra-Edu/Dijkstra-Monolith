const mongoose = require('mongoose');
const { compile } = require('morgan');

mongoose
    .connect("mongodb://localhost:27017/ReactNativeBlog")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB connection failed: ", err.message || err));