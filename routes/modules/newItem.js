const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const categoryOptions = require('./options')

// 新增的功能
router.get('/new', (req, res) => {
  return res.render('newItem', { categoryOptions })
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
