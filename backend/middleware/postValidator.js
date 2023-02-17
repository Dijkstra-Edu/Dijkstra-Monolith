const {check, validationResult} = require("express-validator")

exports.postValidator = [
    check('title').trim().not().isEmpty().withMessage('Post Title is Missing!'),
    check('content').trim().not().isEmpty().withMessage('Post Content is Missing!'),
    check('meta').trim().not().isEmpty().withMessage('Meta Description is Missing!'),
    check('slug').trim().not().isEmpty().withMessage('Post slug is Missing!'),
    check('tags').isArray().withMessage('Tags must be Array of Strings').custom((tags) => {
        for(let t of tags){
            if(typeof t != 'string')
            {
                throw Error('Tags must be array of strings!');
            }
        }
        return true;
    }),
    //We'll handle tags within controller itself 
]

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if(error.length)
    {
        return res.status(401).json({error: error[0].msg})
        //console.log(error);
    }
    next();
};