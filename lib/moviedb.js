const config = require('../config.js')

const mdb = require('moviedb')(config.mdbApiKey)

// i tried some off the shelf modules for promisifying it didn't work... 
// ...something wrong with the way it was binding?!
const dumbPromises = require('./dumbPromises')

module.exports = dumbPromises(mdb)

