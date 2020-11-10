var express = require('express');
var router = express.Router();
var handler = require('../handler/dataciteDOI');

/**
* @swagger
* /datacite/doi/{doi}:
*   get:
*     tags:
*     - DATACITE/DOI
*     description: ''
*     summary: Retrieve reference metadata from datacite using DOI.
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: doi
*         description: The doi of the reference
*         allowReserved: true
*         schema:
*           type: string
*           example: "10.26022/IEDA/111713"
*         required: true
*     responses:
*       200:
*         description: metadata of the reference
*/
/* GET users listing. */
router.get('/doi/:doi(*\/*)', handler.getRefByDoi);

module.exports = router;