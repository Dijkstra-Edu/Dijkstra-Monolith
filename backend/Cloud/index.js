const cloudinary = require("cloudinary").v2;
require('dotenv').config()

//Using cloudinary instead of AWS - free

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET,
    secure: true
  });

module.exports = cloudinary;