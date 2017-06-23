const config = require('../config.js')

const mdb = require('moviedb')(config.mdbApiKey)

// add our own method to make rendering a list easier
mdb.searchMovieWithLogo = (function(params, cb) {
  return this.configuration((err, mdbConfig) => {
    if (err) {
      cb(err)
    } else {
      return this.searchMovie(params, (err, searchRes) => {
        if (err) {
          cb(err)
        } else {
          searchRes.results.forEach(movie => movie.logo = movie.poster_path ? (
            `${mdbConfig.images.base_url}w45/${movie.poster_path}`
          ) : null)
          cb(null, searchRes)
        }
      })
    }
  })
}).bind(mdb)

module.exports = mdb

