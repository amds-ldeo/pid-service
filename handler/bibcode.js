var request = require('request');
var parser = require('../parser/bibcode');


//Get metadata of the reference by Bibcode
function getRefByBibcode(req, res, next) {

    let requestOpt = {
        url: 'https://api.adsabs.harvard.edu/v1/search/query?q=bibcode:' + encodeURIComponent(req.params.bibcode) + 
        '&fl=title,author,volume,issue,year,page_range,doctype,pub,doi,bibcode,orcid_pub,orcid_user,orcid_other',
        auth: {
            'bearer': 'qokRTSpeCLdB5aIkuhGUFRJW0ARp2JeFyukKIvXh'
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