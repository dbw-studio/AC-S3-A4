const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 查詢單一餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

module.exports = router
