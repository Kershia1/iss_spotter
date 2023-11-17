//API Call #1: Fetch IP Address

const request = require('request');

//make the API request with req library

const fetchMyIP = function(callback) {
  const options = {
    url: 'https://api.ipify.org?format=json',
  
    headers: {
      'User-Agent': 'Iss Spotter'
    }
  };

request(options,(error, response, body) => {
  //err
  if(error) {
    callback (error, null);
    return; 
  }
 
  if (response && response.statusCode !== 200) {
    callback(`Status Code ${response.StatusCode} during IP fetch request. Response: ${body}`, null);
    return;
  }

      const ipify = JSON.parse(body);
        callback (null, ipify.ip);
});
}

module.exports = { fetchMyIP };