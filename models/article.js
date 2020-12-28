const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDompurify = require('dompurify')
// {JSDOM } taking only portion we want from jsdom
const { JSDOM } = require('jsdom')
// This allows dompurify to create a HTML and purify it by using JSDOM on window object
const dompurify = createDompurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

// for calculating slug before saving to database
// run function before validate
articleSchema.pre('validate', function(next) {
    if(this.title) {
        // convert slug to lower case
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    if(this.markdown){
        // convert our markdown to html
        // and purify it to get rid of any Malicious code
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    // if not called we get error validation
    next()
})

module.exports = mongoose.model('Article', articleSchema)