var express = require('express');
var router = express.Router();
var handler = require('../handler/crossrefDOI');


/**
* @swagger
* /crossref/doi/{doi}:
*   get:
*     tags:
*     - CROSSREF/DOI
*     description: ''
*     summary: Retrieve reference metadata from Crosreff using DOI.
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: doi
*         description: The doi of the reference
*         allowReserved: true
*         schema:
*           type: string
*           example: "10.1038/382049a0"
*         required: true
*     responses:
*       200:
*         description: metadata of the reference
*/
/* GET users listing. */
router.get('/doi/:doi(*\/*)', handler.getRefByDoi);

module.exports = router;