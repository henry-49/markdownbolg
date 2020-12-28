const express = require('express')

// router for views
const router = express.Router()

// import model
const Article = require('./../models/article')

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

// edit route
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article })
})

router.get('/:slug', async(req, res) => {
    // findById is a syn function so i use async
    // const article = await Article.findById(req.params.id)
    // find by slug
    const article = await Article.findOne({ slug: req.params.slug })
    // check if article is null
    if(article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})

// create new article
router.post('/', async(req, res, next) => {
   req.article = new Article()
   // goes to the next function in our list
   next()
}, saveArticleAndRedirect('new'))

// put
router.put('/:id', async(req, res, next) => {
    req.article = await Article.findById(req.params.id)
    // goes to the next function in our list
    next()
 }, saveArticleAndRedirect('edit'))

// return a middelware
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
        try {
            // save article
         article = await article.save()
         // route to the slug when new article is created
         res.redirect(`/articles/${article.slug}`)
        } catch (error) {
           // console.log(error)
            res.render(`articles/${path}`, {article: article})
        }
       
    }
}

// delete route
router.delete('/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router