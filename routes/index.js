var express = require('express');
var router = express.Router();
// const whatsapp = require("../helpers/whatsapp")

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', qr: null });
});

module.exports = router;
