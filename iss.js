//API Call #1: Fetch IP Address

const request = require('request');

//make the API request with req library

const fetchMyIP = function(callback) {
  // const options = {
  //   url: 'https://api.ipify.org?format=json',

  //   headers: {
  //     'User-Agent': 'Iss Spotter'
  //   }
  // };

  request('https://api.ipify.org?format=json', (error, response, body) => {
    //err
    if (error) {
      callback(error, null);
      return;
    }

    if (response && response.statusCode !== 200) {
      callback(`Status Code ${response.StatusCode} during IP fetch request. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }

    const ipify = JSON.parse(body);
    callback(null, ipify.ip);
  });
};

const fetchCoordsByIP = function(ip,callback) {

  request('https://ipwho.is/24.108.192.127', (error, response, body) => {
    if (error) {
      callback(error, null);
      return
    }

    if (response && response.statusCode !== 200) {
      callback(`Status Code: ${response.StatusCode} during Geo-location fetch request. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }
    const ipwhois = JSON.parse(body);
    callback(null, ipwhois.io);
  });
};


//Expected output: similar to this { latitude: '49.27670', longitude: '-123.13000' }
// confirmation values stored in perosnal notes

module.exports = { fetchMyIP, fetchCoordsByIP };