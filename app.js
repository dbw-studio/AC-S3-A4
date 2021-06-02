const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb conneted!!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().trim().includes(keyword.toLocaleLowerCase().trim()) || restaurant.category.toLowerCase().trim().includes(keyword.toLocaleLowerCase().trim())
  })
  const notice = `Sorry! 你搜尋的<span style="color:#4592af">${keyword}</span>，沒有相關餐廳。`

  if (restaurants.length === 0) {
    res.render('index', { keyword, notice })
  } else {
    res.render('index', { restaurants, keyword })
  }
})

app.listen(3000, () => {
  console.log('Server is listening localhost:3000')
})
