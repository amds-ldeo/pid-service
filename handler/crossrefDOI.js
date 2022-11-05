require('dotenv').config();
var request = require('request');
var parser = require('../parser/crossrefDOI');


//Get metadata of the reference by DOI
function getRefByDoi(req, res, next) {

    let requestUrl = process.env.CROSSREF_API_BASE_URL + req.params.doi;
    request(requestUrl, function (error, response, body) {
        const neededKeys = ['identifiers', 'title', 'publicationYear','type','authors'];
        let result = {};
        let newStatusCode = null;
        if (response.statusCode == 200) {
            
            let parseResult = parser.parseDOI(JSON.parse(body));
            let isOk = neededKeys.every(key => Object.keys(parseResult).includes(key));
            if(!!parseResult && Object.keys(parseResult).length>0 && isOk){
                Object.assign(result,{data: parseResult});
                newStatusCode = 200;
            } else {
                //Object.assign(result,{status: "fail", count: 0});
                let errors=[];
                let errorEle = {};
                Object.assign(errorEle,{status: "204", title: "The related content(specially mandatory fields including title,publicationYear,type,identifiers, and authors) does not exist although the resource exists.",data: parseResult});
                errors.push(errorEle);
                Object.assign(result,{errors:errors});
                newStatusCode = 204;

               // res.status(204)
                //.json(result);
                //.send("No content.");
            }
            //res.status(200)
             //   .json(result);
        } else if (response.statusCode == 404) {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: "404", title: "The resource does not exist."});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = 404;

            //res.status(404)
            //.send("Resource not found.");
        } else {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: response.statusCode.toString(), title: error});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = response.statusCode;
            //res.status(response.statusCode)
            //.send(error);
        }
        res.status(newStatusCode)
        .json(result);
      });

}



module.exports = {
    getRefByDoi: getRefByDoi
};