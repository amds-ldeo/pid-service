module.exports = {
    parseBIBCODE: function(data){
        let adsData = data.response;
        let result = {};
        if(adsData.numFound > 0) {
            let authors = [];
            let sequenceNum = 0;
            // Skip if data.message.author=[],null,undefined
            if(!!adsData.docs[0]['author'] && Object.keys(adsData.docs[0]['author']).length>0) {
                for(j=0;j<adsData.docs[0]['author'].length;j++){
                    let author = {};
                    sequenceNum = sequenceNum + 1;
                    // Remove leading and trailing space
                    let re = /^\s+|\s+$/g;
                    let name = adsData.docs[0]['author'][j].replace(re, "");
                    // Looks for 0 or more spaces followed by a comma followed by 0 or more spaces and,
                    // when found, removes the spaces and the comma from the string. 
                    // nameArray is the array returned as a result of split().
                    re = /\s*(?:,|$)\s*/;
                    let nameArray = name.split(re);
                    
                    let orcid;
                    // Trust pub, then known user, last anonymous user
                    if (!!adsData.docs[0]['orcid_other']) {
                        if (!!adsData.docs[0]['orcid_other'][j]) {
                            if (adsData.docs[0]['orcid_other'][j] != "-") {
                                orcid =  adsData.docs[0]['orcid_other'][j];
                            }
                        }   
                    }  
                    if (!!adsData.docs[0]['orcid_user']) {
                        if (!!adsData.docs[0]['orcid_user'][j]) {
                            if (adsData.docs[0]['orcid_user'][j] != "-") {
                                orcid =  adsData.docs[0]['orcid_user'][j];
                            }
                        }
                    }

                    if (!!adsData.docs[0]['orcid_pub']) {
                        if (!!adsData.docs[0]['orcid_pub'][j]) {
                            if (adsData.docs[0]['orcid_pub'][j] != "-") {
                                orcid =  adsData.docs[0]['orcid_pub'][j];
                            }
                        }
                    }

                    let affiliation;
                    if (!!adsData.docs[0]['aff']) {
                        if (!!adsData.docs[0]['aff'][j]) {
                            if (adsData.docs[0]['aff'][j] != "-") {
                                affiliation =  adsData.docs[0]['aff'][j];
                            }
                        }
                    }
                    // Skip if orcid = null, "", undefined          
                    if (!!orcid) {
                        Object.assign(author,{orcid: orcid});
                    }
                    // Skip if affiliation = null, "", undefined          
                    if (!!affiliation) {
                        Object.assign(author,{affiliation: affiliation});
                    }                    
                    // Skip if familyName = null, "", undefined          
                    if (!!nameArray[0]) {
                        Object.assign(author,{familyName: nameArray[0]});
                    }
                    // Skip if givenName = null, "", undefined          
                    if (!!nameArray[1]) {
                        Object.assign(author,{givenName: nameArray[1]});
                    }
                    //skip if author={},null,undefined
                    if (!!author && Object.keys(author).length>0) {
                        Object.assign(author,{sequence: sequenceNum});
                        authors.push(author);
                    } else {
                        sequenceNum = sequenceNum - 1;
                    }

                };
            }
            //skip if bibcode="",null,undefined
            if(!!adsData.docs[0]['bibcode']) {
                Object.assign(result,{bibcode: adsData.docs[0]['bibcode']});
            }            
            //skip if doi="",null,undefined
            if(!!adsData.docs[0]['doi']) {
                Object.assign(result,{doi: adsData.docs[0]['doi'][0]});
            }
            //skip if title="",null,undefined
            if(!!adsData.docs[0]['title'][0]) {
                // Remove html tag like <SUP></SUP> from title
                let re = /<(.|\n)*?>/g;
                let title  = adsData.docs[0]['title'][0].replace(re,"");
                Object.assign(result,{title: title});
            }
            //skip if pub="",null,undefined
            if(!!adsData.docs[0]['pub']) {
                Object.assign(result,{containerTitle: adsData.docs[0]['pub']});
            }
            //skip if year="",null,undefined
            if(!!adsData.docs[0]['year']) {
                Object.assign(result,{publicationYear: adsData.docs[0]['year']});
            }
            //skip if doctype="",null,undefined
            if(!!adsData.docs[0]['doctype']) {
                Object.assign(result,{type: adsData.docs[0]['doctype']});
            }
            //skip if volume="",null,undefined
            if(!!adsData.docs[0]['volume']) {
                Object.assign(result,{volume: adsData.docs[0]['volume']});
            }
            //skip if issue="",null,undefined
            if(!!adsData.docs[0]['issue']) {
                Object.assign(result,{issue: adsData.docs[0]['issue']});
            }
            //skip if page_range="",null,undefined
            if(!!adsData.docs[0]['page_range']) {
                Object.assign(result,{pages: adsData.docs[0]['page_range']});
            }
            // Skip if authors =[], null, "", undefined                   
            if (!!authors && Object.keys(authors).length>0){
                Object.assign(result,{authors: authors});
            }
            if(authors != null) {
                result["authors"] = authors;
            }
        } 
        return result;
    }
}