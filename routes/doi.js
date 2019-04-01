var express = require('express');
var router = express.Router();
var handler = require('../handler/doi');


/* GET users listing. */
router.get('/doi/:doi(*\/*)', handler.getRefByDoi);

module.exports = router;