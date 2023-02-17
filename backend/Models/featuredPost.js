const mongoose = require('mongoose')

const featuredPostSchema = mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        }
    },
    {
        timestamps: true, //Store created/updated time in DB
    });

module.exports = mongoose.model('featuredPostSchema', featuredPostSchema)