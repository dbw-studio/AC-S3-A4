const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongodb connected!!!!!!!!!!')
  for (let i = 0; i < 5; i++) {
    Restaurant.create({ 
      name: 'name-' + i,
      category: 'category-' + i,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg',
      location: 'location-' + i,
      phone: 02385038 + i,
      google_map: 'google_map-' + i,
      rating: i,
      description: 'description-' + i
    })
  }
  console.log('Create seed DONE.')
})


