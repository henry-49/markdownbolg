// connect to mongosdb
require('./models/db')

const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const userRouter = require('./routes/users')
const methodOverride = require('method-override')

// create express app
const app = express();

// set app view engine
// view engine convert the view to ejs
app.set('view engine', 'ejs')

// set urlencoder to false
app.use(express.urlencoded({extended: false}))

// use for overriding form method like get or post
app.use(methodOverride('_method'))


// create a route
app.get('/', async(req, res) => {
    // get all article
    const articles =  await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index',  { articles: articles })
})

app.get('/user', async(req, res) => {
    // get all users
    const users =  await User.find().sort({createdAt: 'desc'})
    res.render('users/index',  { users: users })
})

// set app to use articleRouter
app.use('/articles', articleRouter)
app.use('/users', userRouter)

app.listen(5000)