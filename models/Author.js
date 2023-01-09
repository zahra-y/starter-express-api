const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const authorSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        social_media: {
            type: String,
            default: '',
            required: true
        },        
        country: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Author', authorSchema)