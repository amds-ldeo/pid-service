require('dotenv').config();
var request = require('request');
var parser = require('../parser/bibcode');



//Get metadata of the reference by Bibcode
function getRefByBibcode(req, res, next) {
    let requestUrl = process.env.ADS_BIBCODE_API_BASE_URL + process.env.ADS_API_BIBCODE_QUERY
     + encodeURIComponent(req.params.bibcode) + process.env.ADS_API_FIELDS_RETURN;
    let requestOpt = {
        url: requestUrl,
        auth: {
            'bearer': process.env.ADS_API_KEY
        }

    }
    request(requestOpt, function (error, response, body) {
        if (response.statusCode == 200) {
            let result = {};
            let parseResult = parser.parseBIBCODE(JSON.parse(body));
            if(!!parseResult && Object.keys(parseResult).length>0){
                Object.assign(result,{status: "ok", count: 1, data: parseResult});
            } else {
                Object.assign(result,{status: "fail", count: 0});
            }
            res.status(200)
                .json(result);
        } else if (response.statusCode == 404) {
            res.status(404)
            .send("Resource not found.");
        } else {
            res.status(response.statusCode)
            .send(error);
        }
      });        
}






module.exports = {
    getRefByBibcode: getRefByBibcode
};