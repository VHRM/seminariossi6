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
            const options = {
                headers: {"Accept": "application/json"}
            }
            http.get("http://devices.webofthings.io/pi/sensors/temperature/", options, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    dataJson = JSON.parse(data)
                    responseObj = {
                        temperature: dataJson.value,
                        unit: "C"
                    };
                    
                    if (temperature === 'F') {
                        responseObj.unit = "F";
                        responseObj.temperature = (dataJson.value * 9/5) + 32;
                    }
                    if (accept && accept.toLowerCase() === 'application/xml') {
                        const xmlResponse = `<temperature><value>${responseObj.temperature}</value><unit>${responseObj.unit}</unit></temperature>`;
                        responseString = xmlResponse;
                    } else {
                        responseString = JSON.stringify(responseObj);
                    }
                    
                    res.write(responseString);
                });
            });
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
            res.write(responseString);
            break;
    }

    res.end();
}).listen(8000);
