const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const bodyParser = require('body-parser')

const db = mongoose.connection

const categoryOptions = `<option value="台式特色料理">台式特色料理</option>
          <option value="中式傳統料理">中式傳統料理</option>
          <option value="日本料理">日本料理</option>
          <option value="韓式料理">韓式料理</option>
          <option value="泰式料理">泰式料理</option>
          <option value="中東料理">中東料理</option>
          <option value="義式餐廳">義式餐廳</option>
          <option value="法式料理">法式料理</option>
          <option value="美式">美式</option>
          <option value="咖啡">咖啡</option>
          <option value="酒吧">酒吧</option>
          <option value="其他">其他</option>`

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb conneted!!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 新增的功能
app.get('/restaurant/new', (req, res) => {
  return res.render('new', { categoryOptions } )
})

app.post('/restaurant', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 查詢單一餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 修改單一餐廳
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant, categoryOptions }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 刪除功能

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  const notice = `Sorry! 你搜尋的<span style="color:#4592af">${keyword}</span>，沒有相關餐廳。<a href="/"><br><br><br><button class="btn btn-info">看全部餐廳</button></a>`
  const emptyNotice = 'Sorry! 無搜尋條件，請在搜尋欄輸入<span style="color:#4592af">餐廳名稱或分類</span>喔!<a href="/"><br><br><br><button class="btn btn-info">看全部餐廳</button></a>'

  if (keyword.length === 0) {
    res.render('index', { emptyNotice })
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

app.listen(3000, () => {
  console.log('Server is listening localhost:3000')
})
