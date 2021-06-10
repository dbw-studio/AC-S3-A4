const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const methodOverride = require('method-override')
router.use(methodOverride('_method'))

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
