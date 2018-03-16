<div align="center">

<h1>userstats</h1>
<p>API that persists daily stats of compare users usage</p>

## Development
Import the `compare-userstats.postman_collection.json` into postman. Keep it up to date by exporting your collection to the file.
The following commands will allow you to run the service locally.  

### Commands
```bash
# clone repo
git clone https://github.com/cooleagle8837/userstat.git
# install dependencies
npm i
# run server locally
npm start
# run tests on file changes in project
npm run watch
# run unit tests
npm test test/unit
# run integration tests
npm test test/integration
# migrations
migrate up --env .env --state-file migrations/.master|develop|sandbox
migrate down --env .env --state-file migrations/.master|develop|sandbox
```

### Running swagger locally

```bash
docker pull swaggerapi/swagger-ui
docker run -p 8080:8080 swaggerapi/swagger-ui
# visit in browser
http://localhost:9000/?url=https://localhost:3000/userstats/swagger
```
