var express = require('express');
var router = express.Router();
var handler = require('../handler/bibcode');

/**
* @swagger
* /ads/bibcode/{bibcode}:
*   get:
*     tags:
*     - ADS/BIBCODE
*     description: ''
*     summary: Retrieve reference metadata from ADS using BIBCODE.
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: bibcode
*         description: The bibcode of the reference
*         allowReserved: true
*         schema:
*           type: string
*           example: "1996Natur.382...49H"
*         required: true
*     responses:
*       200:
*         description: metadata of the reference
* /ads/doi/{doi}:
*   get:
*     tags:
*     - ADS/DOI
*     description: ''
*     summary: Retrieve reference metadata from ADS using DOI.
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
/* GET ref by bibcode */
router.get('/bibcode/:bibcode', handler.getRefByBibcode);

/* GET ref by doi */
router.get('/doi/:doi(*\/*)', handler.getRefByDoi);

module.exports = router;