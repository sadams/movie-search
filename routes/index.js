const express = require('express');
const router = express.Router();
const mdb = require('../lib/moviedb');

const mdbConfigPromise = mdb.configuration()
router.get('/', function(req, res, next) {
  mdbConfigPromise.then(mdbConfig => {
    mdb.searchMovie({ query: 'Alien' })
      .then(searchRes => {
        const movies = searchRes.results
        movies.forEach(movie => movie.logo = `${mdbConfig.images.base_url}/w45/${movie.poster_path}`)

/* not using movieImages for listing because it would add a lot of overhead and it doesn't give us logo size (only poster).
will use it when showing more details
return Promise.all(
          movies.map(movie => {
            return mdb.movieImages({id:movie.id})
              .then(images => {
                console.log(movie.id)
                movie.images = images
                movie.logo = `${mdbConfig.images.base_url}/w45/${movie.poster_path}`
              })
          })        
      )
*/
        res.render('index', { 
          title: 'Movie Search',
          movies,
        })
      })
      .catch(err => {
        console.error(err)
        res.statusCode = 500
        res.send('somthing bad has happened...')
      });
  })
  
});

module.exports = router;
