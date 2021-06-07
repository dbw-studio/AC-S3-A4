const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const edit = require('./modules/edit')
const show = require('./modules/show')
const newItem = require('./modules/newItem')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurant', newItem)
router.use('/restaurants', show)
router.use('/restaurants', edit)
router.use('/search', search)

module.exports = router
