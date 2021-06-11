const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// Require handlebars and just-handlebars-helpers
const Handlebars = require('handlebars')
const H = require('just-handlebars-helpers')

// Register just-handlebars-helpers with handlebars
H.registerHelpers(Handlebars)

const routes = require('./routes')
const app = express()
require('./config/mongoose')

// template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(3000, () => {
  console.log('Server is listening localhost:3000')
})
