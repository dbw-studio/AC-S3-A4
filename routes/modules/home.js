const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋、排序
router.get('/filter', (req, res) => {
  const keyword = req.query.keyword
  const sortMethod = req.query.sortMethod

  const notice = `Sorry! 你搜尋的<span style="color:#4592af">${keyword}</span>，沒有相關餐廳。<a href="/"><br><br><br><button class="btn btn-info">看全部餐廳</button></a>`
  const emptyNotice = 'Sorry! 無搜尋條件，請在搜尋欄輸入<span style="color:#4592af">餐廳名稱或分類</span>喔!<a href="/"><br><br><br><button class="btn btn-info">看全部餐廳</button></a>'

  return Restaurant.find()
    .lean()
    .sort(sortMethod)
    .then((restaurants) => {
      const filteredRestaurant = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().trim().includes(keyword.toLocaleLowerCase().trim()) || restaurant.category.toLowerCase().trim().includes(keyword.toLocaleLowerCase().trim())
      })

      if (sortMethod !== '_id' && filteredRestaurant.length > 0) {
        res.render('index', { restaurants: filteredRestaurant, sortMethod, keyword })
      } else if (keyword.length > 0 && filteredRestaurant.length === 0) {
        res.render('index', { notice, keyword, sortMethod })
      } else if (keyword.length === 0) {
        res.render('index', { emptyNotice })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router
