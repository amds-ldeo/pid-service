require('dotenv').config();
var request = require('request');
var parser = require('../parser/dataciteDOI');


//Get metadata of the reference by DOI
function getRefByDoi(req, res, next) {

    let requestUrl = process.env.DATACITE_API_BASE_URL + req.params.doi;
    request(requestUrl, function (error, response, body) {
        let result = {};
        let newStatusCode = null;
        if (response.statusCode == 200) {
            //let result = {};
            let parseResult = parser.parseDOI(JSON.parse(body));
            if(!!parseResult && Object.keys(parseResult).length>0){
                Object.assign(result,{data: parseResult});
                newStatusCode = 200;
            } else {
                //Object.assign(result,{status: "fail", count: 0});
                let errors=[];
                let errorEle = {};
                Object.assign(errorEle,{status: "204", title: "The related content does not exist although the resource exists."});
                errors.push(errorEle);
                Object.assign(result,{errors:errors});
                newStatusCode = 204;
                //res.status(204)
                //.send("No content.");
            }
           // res.status(200)
            //    .json(result);
        } else if (response.statusCode == 404) {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: "404", title: "The resource does not exist."});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = 404;
           // res.status(404)
            //.send("Resource not found.");
        } else {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: response.statusCode.toString(), title: error});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = response.statusCode;
           // res.status(response.statusCode)
           // .send(error);
        }
        res.status(newStatusCode)
        .json(result);
      });

}



module.exports = {
    getRefByDoi: getRefByDoi
};