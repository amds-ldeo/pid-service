module.exports = {
    parseDOI: function(data){
        let toBeParsedData = data.data.attributes;
        let result = {};
        //skip if toBeParsedData={},null,undefined
        if (!!toBeParsedData && Object.keys(toBeParsedData).length>0) {
            let authors = [];
            //let sequenceNum = 0;
            //skip if data.creators=[],null,undefined
            if (!!toBeParsedData.creators && Object.keys(toBeParsedData.creators).length>0) {
                for (j=0;j<toBeParsedData.creators.length;j++) {
                    let author = {};
                    //sequenceNum = sequenceNum + 1;
                    // Skip if orcid = null, "", undefined          
                    if (!!toBeParsedData.creators[j].nameIdentifiers && Object.keys(toBeParsedData.creators[j].nameIdentifiers).length>0) {
                        for (let element of toBeParsedData.creators[j].nameIdentifiers) {
                            if (element.nameIdentifierSchema == 'ORCID') {
                                let orcid = element.nameIdentifier;
                                let re = /^https?:\/\/orcid.org\//;
                                Object.assign(author,{ORCID: orcid.replace(re,'')});
                                break;
                            }
                        }
                    }
                    if (!!toBeParsedData.creators[j].affiliation && Object.keys(toBeParsedData.creators[j].affiliation).length>0) {
                        let affiliations = [];
                        for (let element of toBeParsedData.creators[j].affiliation) {
                            //let affiliation = element;
                            affiliations.push(element);
                        }
                        Object.assign(author,{affiliation: affiliations});
                    }        
                    // Skip if name = null, "", undefined          
                    if (!!toBeParsedData.creators[j].name) {
                        Object.assign(author,{name: toBeParsedData.creators[j].name});
                    }
                    if (!!toBeParsedData.creators[j].nameType) {
                        Object.assign(author,{nameType: toBeParsedData.creators[j].nameType});
                    }                                 
                    // Skip if familyName = null, "", undefined          
                    if (!!toBeParsedData.creators[j].familyName) {
                        Object.assign(author,{familyName: toBeParsedData.creators[j].familyName});
                    }
                    // Skip if givenName = null, "", undefined          
                    if (!!toBeParsedData.creators[j].givenName) {
                        Object.assign(author,{givenName: toBeParsedData.creators[j].givenName});
                    }
                    //skip if author={},null,undefined
                    if (!!author && Object.keys(author).length>0) {
                       // Object.assign(author,{sequence: sequenceNum});
                        authors.push(author);
                    } 
               };
            }
            // Skip if doi = null, "", undefined
            if (!!toBeParsedData.doi) {
                let identifiers = [];
                let identifier = {};
                Object.assign(identifier,{identifier:toBeParsedData.doi});
                Object.assign(identifier,{identifierType:"DOI"});
                identifiers.push(identifier);
                Object.assign(result,{identifiers: identifiers});
            }
            // Skip if title = null, "", undefined
            if (!!toBeParsedData.titles) {             
                Object.assign(result,{title: toBeParsedData.titles[0].title});
            }
            
            // Skip if publisher = null, "", undefined         
            if (!!toBeParsedData.publisher) {
                Object.assign(result,{publisher: toBeParsedData.publisher});
            }
            // Skip if publicationYear = null, "", undefined         
            if (!!toBeParsedData.publicationYear) {
                Object.assign(result,{publicationYear: toBeParsedData.publicationYear.toString()});
            }

            // Skip if type = null, "", undefined         
            if (!!toBeParsedData.types) {
                Object.assign(result,{type: toBeParsedData.types.resourceTypeGeneral});
            }
                
            // Skip if authors =[], null, "", undefined                   
            if (!!authors && Object.keys(authors).length>0){
                Object.assign(result,{authors: authors});
            }
        }
        return result;
    }    
}