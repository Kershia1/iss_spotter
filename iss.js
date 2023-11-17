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
      const msg = (`An error occured while retriving your IP address.`)
      callback(`Status Code ${response.StatusCode}. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }

    const ipify = JSON.parse(body);
    callback(null, ipify.ip);
  });
};

const fetchCoordsByIP = function(ip,callback) {

  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    //is this the correct way to access the IP? forgot to use backticks to interpolate the IP address from the request url.
    if (error) {
      callback(error, null);
      return
    }

    if (response && response.statusCode !== 200) {
      const msg = (`An error while retrieving your Geo-location.`)
      callback(`Status Code: ${response.StatusCode}. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.longitude;
   
    const coordinates = {
      latitude: latitude,
      longitude: longitude
    }
    callback(null, coordinates);
    //callback(null, ipwhois.io);
  });
};


//Expected output: similar to this { latitude: '49.27670', longitude: '-123.13000' }
// confirmation values stored in perosnal notes

module.exports = { fetchMyIP, fetchCoordsByIP };