const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const bodyParser = require('body-parser')
const routes = require('./routes')
const methodOverride = require('method-override')

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use(methodOverride('_method'))

app.listen(3000, () => {
  console.log('Server is listening localhost:3000')
})
