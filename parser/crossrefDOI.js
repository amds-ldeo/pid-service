module.exports = {
    parseDOI: function(data){
        let result = {};
        //skip if data={},null,undefined
        if (!!data && Object.keys(data).length>0) {
            let authors = [];
            //let sequenceNum = 0;
            //skip if data.message.author=[],null,undefined
            if (!!data.message.author && Object.keys(data.message.author).length>0) {
                for (j=0;j<data.message.author.length;j++) {
                    let author = {};
                    //sequenceNum = sequenceNum + 1;
                    // Skip if orcid = null, "", undefined          
                    if (!!data.message.author[j].ORCID) {
                        let orcid = data.message.author[j].ORCID;
                        let re = /^https?:\/\/orcid.org\//;
                        Object.assign(author,{ORCID: orcid.replace(re,'')});
                    }
                    if (!!data.message.author[j].affiliation && Object.keys(data.message.author[j].affiliation).length>0) {
                        let affiliations = [];
                        for (k=0;k<data.message.author[j].affiliation.length;k++) {
                            let affiliation = data.message.author[j].affiliation[k]["name"];
                            affiliations.push(affiliation);
                        }
                        Object.assign(author,{affiliation: affiliations});
                    }                    
                    // Skip if familyName = null, "", undefined          
                   // if (!!data.message.author[j].family) {
                   //     Object.assign(author,{familyName: data.message.author[j].family});
                   // }
                    // Skip if name = null, "", undefined
                    // name won't appear at the same time as family and given          
                    if (!!data.message.author[j].name) {
                        Object.assign(author,{name: data.message.author[j].family + ', ' + data.message.author[j].given});
                        Object.assign(author,{nameType: "Personal"});
                        Object.assign(author,{familyName: data.message.author[j].family});
                        Object.assign(author,{givenName: data.message.author[j].given});
                    } else {
                        Object.assign(author,{name: data.message.author[j].name});
                        Object.assign(author,{nameType: "Other"});
                    }
                    //skip if author={},null,undefined
                    if (!!author && Object.keys(author).length>0) {
                        //Object.assign(author,{sequence: sequenceNum});
                        authors.push(author);
                    } else {
                        //sequenceNum = sequenceNum - 1;
                    }
               };
            }
            // Skip if doi = null, "", undefined
            if (!!data.message.DOI) {
                //Object.assign(result,{doi: data.message.DOI});
                let identifiers = [];
                let identifier = {};
                Object.assign(identifier,{identifier:data.message.DOI});
                Object.assign(identifier,{identifierType:"DOI"});
                identifiers.push(identifier);
                Object.assign(result,{identifiers: identifiers});
            }
            // Skip if title = null, "", undefined
            if (!!data.message.title) {
                Object.assign(result,{title: data.message.title[0]});
            }
            
            // Skip if publisher = null, "", undefined         
            if (!!data.message.publisher) {
                Object.assign(result,{publisher: data.message.publisher});
            }
            // Skip if containerTitle = null, "", undefined         
            if (!!data.message['container-title']) {
                Object.assign(result,{containerTitle: data.message['container-title'][0]});
            }

            // Skip if publicationYear = null, "", undefined         
            if (!!data.message['published-print']){
                if (!!data.message['published-print']['date-parts']) {
                    Object.assign(result,{publicationYear: data.message['published-print']['date-parts'][0][0].toString()});
                }
            }
            else if (!!data.message['published-online']){
                if (!!data.message['published-online']['date-parts']) {
                    Object.assign(result,{publicationYear: data.message['published-online']['date-parts'][0][0].toString()});
                }                
            }

            // Skip if type = null, "", undefined         
            if (!!data.message.type) {
                Object.assign(result,{type: data.message.type});
            }

            // Skip if volume = null, "", undefined         
            if (!!data.message.volume) {
                Object.assign(result,{volume: data.message.volume});
            }

            // Skip if issue = null, "", undefined                   
            if (!!data.message.issue) {
                Object.assign(result,{issue: data.message.issue});
            }

            // Skip if page = null, "", undefined                   
            if (!!data.message.page) {
                Object.assign(result,{pages: data.message.page});
            }
                
            // Skip if authors =[], null, "", undefined                   
            if (!!authors && Object.keys(authors).length>0){
                Object.assign(result,{authors: authors});
            }
        }
        return result;
    }    
}