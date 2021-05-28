const express = require('express')
const port = 3000
const app = express()
const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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

app.listen(port, () => {
  console.log(`Server is listening localhost:${port}`)
})
