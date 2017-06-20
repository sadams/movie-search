var express = require('express');
var router = express.Router();

router.get('/:proxyMethod', function(req, res, next) {
  //TODO: send request.query back to proxyMethod as options
  res.send({todo:"proxy requests back to movie db"});
});

module.exports = router;
