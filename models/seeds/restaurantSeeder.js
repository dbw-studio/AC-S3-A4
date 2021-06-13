const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantJson = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
  Restaurant.create(restaurantJson.results)
  console.log('Create seed DONE.')
})
