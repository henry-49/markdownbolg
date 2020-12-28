const express = require('express')

// router for views
const router = express.Router()

// import model
const User = require('./../models/user')

router.get('/', (req, res) => {
    res.send('<h1>Hello from User</h1>')
})


module.exports = router