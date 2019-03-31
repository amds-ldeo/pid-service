var request = require('request');
var parser = require('../parser/doi');


//Get metadata of the reference by DOI
function getRefByDoi(req, res, next) {

    request('https://api.crossref.org/works/' + req.params.doi, function (error, response, body) {
        if (response.statusCode == 200) {
            let result = {};
            let parseResult = parser.parseDOI(JSON.parse(body));
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
    getRefByDoi: getRefByDoi
};