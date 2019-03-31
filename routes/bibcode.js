var express = require('express');
var router = express.Router();
var handler = require('../handler/bibcode');

/* GET users listing. */
router.get('/:bibcode', handler.getRefByBibcode);

module.exports = router;