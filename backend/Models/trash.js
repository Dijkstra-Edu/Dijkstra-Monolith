const mongoose = require('mongoose')

const trashSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    meta: {
        type: String,
        required: true,
        trim: true
    },
    tags: [String],
    author: {
        type: String,
        default: "Admin",
        //ref: ''
    },
    slug: { //Important for SEO, and scalalbility (in case using API for web)
        type: String,
        required: true,
        trim: true,
        unique: true //Unique Posts only
    },
    thumbnail: { //To store link, not actual page in DB
        type: Object,
        url: {
            type: URL,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }
},
{
    timestamps: true, //Store created/updated time in DB
});

module.exports = mongoose.model('Trash',trashSchema)