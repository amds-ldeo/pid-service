var express = require('express');
var router = express.Router();
var handler = require('../handler/bibcode');

/* GET ref by bibcode */
router.get('/bibcode/:bibcode', handler.getRefByBibcode);

/* GET ref by doi */
router.get('/doi/:doi(*\/*)', handler.getRefByDoi);

module.exports = router;