const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const hashtagSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
        },
        author: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        text: {
            type: String,
            required: true
        },
        social_media: {
            type: String,
            default: '',
            required: true
        },
        hashtags: {
            type: String,
            default: '',
        },
        rtl_hashtag: {
            type: String,
        },
        ltr_hashtag: {
            type: String,
        },
        country: {
            type: String,
        }
    },
    {
        timestamps: true
    } 
)

module.exports = mongoose.model('Hashtag', hashtagSchema)