const http = require('http');
const url = require('url');

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

http.createServer(function(req, res) {

    const accept = req.headers['accept'];
    const parsedUrl = url.parse(req.url, true);
    const temperature = parsedUrl.query.temperature;

    if (accept && accept.toLowerCase() === 'application/xml') {
        res.writeHead(200, {'Content-Type': 'application/xml'});
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
    }
    let responseObj;
    let responseString;

    switch(req.url) {
        case '/temperature':
            responseObj = {
                temperature: randomInt(1, 40),
                unit: "C"
            };
            if (temperature === 'F') {
                response.unit = "F";
            }
            if (accept && accept.toLowerCase() === 'application/xml') {
                // Gerar XML
                const xmlResponse = `<temperature><value>${response.temperature}</value><unit>${response.unit}</unit></temperature>`;
                responseString = xmlResponse;
            } else {
                // Gerar JSON
                responseString = JSON.stringify(responseObj);
            }
            break;
        case '/light':
            responseObj = {
                light: randomInt(1, 100)
            };

            if (accept && accept.toLowerCase() === 'application/xml') {
                const xmlResponse = `<light><value>${response.light}</value></light>`;
                responseString = xmlResponse;
            } else {
                responseString = JSON.stringify(responseObj);
            }
            break;
    }

    res.write(responseString);
    res.end();
}).listen(8000);
