require('dotenv').config();
var request = require('request');
var parser = require('../parser/bibcode');


const ADS_API_BIBCODE_QUERY="search/query?q=bibcode:";
const ADS_API_DOI_QUERY="search/query?q=doi:";
const ADS_API_FIELDS_RETURN="&fl=title,author,volume,issue,year,page_range,doctype,pub,doi,bibcode,orcid_pub,orcid_user,orcid_other,aff";

//Get metadata of the reference by Bibcode
function getRefByBibcode(req, res, next) {
   // let requestUrl = process.env.ADS_BIBCODE_API_BASE_URL + process.env.ADS_API_BIBCODE_QUERY
   //  + encodeURIComponent(req.params.bibcode) + process.env.ADS_API_FIELDS_RETURN;
     let requestUrl = process.env.ADS_BIBCODE_API_BASE_URL + ADS_API_BIBCODE_QUERY
     + encodeURIComponent(req.params.bibcode) + ADS_API_FIELDS_RETURN;
    console.log(requestUrl);
    let requestOpt = {
        url: requestUrl,
        auth: {
            'bearer': process.env.ADS_API_KEY
        }

    }
    request(requestOpt, function (error, response, body) {
        let result = {};
        let newStatusCode = null;
        if (response.statusCode == 200) {
            //let result = {};
            let parseResult = parser.parseBIBCODE(JSON.parse(body));
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
               // res.status(204)
               // .send("No content.");
            }
            //res.status(200)
            //    .json(result);
        } else if (response.statusCode == 404) {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: "404", title: "The resource does not exist."});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = 404;
           // res.status(404)
          //  .send("Resource not found.");
        } else {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: response.statusCode.toString(), title: error});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = response.statusCode;
           // res.status(response.statusCode)
            //.send(error);
        }
        res.status(newStatusCode)
        .json(result);
      });        
}

//Get metadata of the reference by DOI
function getRefByDoi(req, res, next) {
   // let requestUrl = process.env.ADS_BIBCODE_API_BASE_URL + process.env.ADS_API_DOI_QUERY
    // + encodeURIComponent('"'+req.params.doi+'"') + process.env.ADS_API_FIELDS_RETURN;
     let requestUrl = process.env.ADS_BIBCODE_API_BASE_URL + ADS_API_DOI_QUERY
     + encodeURIComponent('"'+req.params.doi+'"') + ADS_API_FIELDS_RETURN;
    let requestOpt = {
        url: requestUrl,
        auth: {
            'bearer': process.env.ADS_API_KEY
        }

    }

    request(requestOpt, function (error, response, body) {
        let result = {};
        let newStatusCode = null;
        if (response.statusCode == 200) {
            //let result = {};
            let parseResult = parser.parseBIBCODE(JSON.parse(body));
            if(!!parseResult && Object.keys(parseResult).length>0){
                //Object.assign(result,{status: "ok", count: 1, data: parseResult});
                Object.assign(result,{data: parseResult});
                newStatusCode = 200;
            } else {
                let errors=[];
                let errorEle = {};
                Object.assign(errorEle,{status: "204", title: "The related content does not exist although the resource exists."});
                errors.push(errorEle);
                Object.assign(result,{errors:errors});
                newStatusCode = 204;
                //Object.assign(result,{status: "fail", count: 0});
            }
            //res.status(200)
            //    .json(result);
        } else if (response.statusCode == 404) {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: "404", title: "The resource does not exist."});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = 404;
           // res.status(404)
          //  .send("Resource not found.");
        } else {
            let errors=[];
            let errorEle = {};
            Object.assign(errorEle,{status: response.statusCode.toString(), title: error});
            errors.push(errorEle);
            Object.assign(result,{errors:errors});
            newStatusCode = response.statusCode;
           // res.status(response.statusCode)
          //  .send(error);
        }
        res.status(newStatusCode)
        .json(result);
      });        
}





module.exports = {
    getRefByBibcode: getRefByBibcode,
    getRefByDoi: getRefByDoi
};