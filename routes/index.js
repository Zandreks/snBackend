/* eslint-disable indent */
var express = require('express'),
  router = express.Router()

router.get('/', function (_req, res) {
  res.render('index', { title: 'Express' })
})

module.exports = router
