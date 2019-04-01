# PID Service Reference Metadata JSON Format

## Response code

| code  | Description |
|-------|------|
| 200 | Success |
| 403 | Resource not found |
| others | Error |

## Main metadata
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| status | String | Required | ok or fail |
| count | Integer | Required | 1 or 0 |
| data | Object | Required | Resolved metadata |


## Data component metadata

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| bibcode | String | No | Bibcode |
| doi | String | No | DOI |
| title | String | Yes | Reference title |
| publisher | String | No | Name of reference's publisher |
| containerTitle | String | Yes | Full titles of the containing reference (usually a book or journal |
| publicationYear | Integer | Yes | Year on which the reference was published in print or online  |
| type | String | Yes | Type of reference |
| issue | String | No | Issue number of an article's journal |
| volume | String | No | Volume number of an article's journal |
| page | String | No | Pages numbers of an article within its journal |
| authors | Array of author | Yes |  |

### Author
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| orcid | String | No | ORCID |
| affiliation | Array | No |  |
| familyName | String | Yes |  |
| givenName | String | No |  |
| sequence | Integer | Yes |  |



