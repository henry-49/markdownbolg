const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const userSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('User', userSchema)