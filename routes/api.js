const express = require('express')
const router = express.Router()
const mdb = require('../lib/moviedb')

router.get('/:proxyMethod', function(req, res, next) {
  return mdb[req.params.proxyMethod](req.query, (err, mdbResponse) => {
    if (err) {
      if (err.response.clientError) {
        //seems the request is invalid so we want to show the user
        res.statusCode = err.response.statusCode
        res.send(err.response.body)
      } else {
        //not sure what's wrong so throw generic error
        console.error(err)
        res.statusCode = 500
        res.send({error:'somthing bad has happened...'})
      }
    } else {
      res.send(mdbResponse)
    }
  })
});

module.exports = router;
