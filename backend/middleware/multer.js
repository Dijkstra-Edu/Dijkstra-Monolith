const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.includes('image')){
        return cb('Invalid Image Format', false)
    }
    cb(null, true);

    //console.log(file);
};

module.exports = multer({storage,fileFilter});