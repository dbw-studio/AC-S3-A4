const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword

  const notice = `Sorry! 你搜尋的<span style="color:#4592af">${keyword}</span>，沒有相關餐廳。<a href="/"><br><br><br><button class="btn btn-info">看全部餐廳</button></a>`
  const emptyNotice = 'Sorry! 無搜尋條件，請在搜尋欄輸入<span style="color:#4592af">餐廳名稱或分類</span>喔!<a href="/"><br><br><br><button class="btn btn-info">看全部餐廳</button></a>'

  if (keyword.length === 0) {
    return res.render('index', { emptyNotice })
  }

  return Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filteredRestaurant = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().trim().includes(keyword.toLocaleLowerCase().trim()) || restaurant.category.toLowerCase().trim().includes(keyword.toLocaleLowerCase().trim())})

      if (filteredRestaurant.length === 0) {
        res.render('index', { keyword, notice })
      } else {
        res.render('index', { restaurants: filteredRestaurant, keyword })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router
