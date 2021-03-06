PID service Retrieve and customize metadata of works(paper, dataset, etc.) using PID like DOI, BIBCODE, etc. from trusted PID service provider Crossref, Datacite, ADS, etc. 

# API Endpoints
| Endpoint  | Description |
|-------|------|
| {domainName}/ads/doi/{doi} | has DOI, also want to get Bibecode |
| {domainName}/ads/bibcode/{bibcode} | BIBCODE only |
| {domainName}/crossref/doi/{doi} | DOI only |
| {domainName}/datacite/doi/{doi} | only resolve ECL dataset DOIs |

# Reference
* CrossRef API Reference: https://github.com/CrossRef/rest-api-doc
* Datacite API Reference: https://support.datacite.org/docs/api
* ADS API Reference: https://github.com/adsabs/adsabs-dev-api

# Metadata Properties

## Response code

| code  | Description |
|-------|------|
| 200 | Success |
| 204 | No content |
| 404 | Resource not found |
| others | Error |

## Main metadata
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| data | Object | Optional | Resolved metadata if response code is 200 |
| errors | Object | Optional | if response code is not 200 |


## Data component metadata

| Field | Type | Obligation | Description |
|-------|------|----------|-------------|
| identifiers | Array of identifier | Mandatory |  |
| title | String | Mandatory | Title of work |
| publisher | String | Optional | Name of work's publisher |
| containerTitle | String | Optional | Full titles of the containing work (usually a book or journal) |
| publicationYear | Integer | Mandatory | Year on which the work was published in print or online  |
| type | String | Mandatory | Type of work |
| issue | String | Optional | Issue number of an article's journal |
| volume | String | Optional | Volume number of an article's journal |
| page | String | Optional | Pages numbers of an article within its journal |
| authors | Array of author | Mandatory |  |

### Identifier
| Field | Type | Obligation | Description | Allowed values |
|-------|------|----------|-------------|-------------|
| identifier | String | Mandatory | A unique string that identifiers a resource. | |
| identifierType | String | Mandatory | The type of identifier | Controlled List Value: DOI, BIBCODE |


### Author
| Field | Type | Obligation | Description |
|-------|------|----------|-------------|
| name | String | Mandatory |  |
| nameType | String | Mandatory |  |
| familyName | String | Optional | appear in the block if nameType is 'Personal' |
| givenName | String | Optional | appear in the block if nameType is 'Personal'|
| orcid | String | Optional | ORCID |
| affiliation | Array | Optional |  |





