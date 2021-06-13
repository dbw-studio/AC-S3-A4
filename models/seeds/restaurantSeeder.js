const Restaurant = require('../restaurant')
const restaurantJson = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantJson.results)
  console.log('Create seed DONE.')
})
