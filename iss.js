//API Call #1: Fetch IP Address

const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    //err
    if (error) {
      callback(error, null);
      return;
    }

    if (response && response.statusCode !== 200) {
      const msg = (`An error occured while retriving your IP address.`);
      callback(`Status Code ${response.StatusCode}. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }

    const ipify = JSON.parse(body);
    callback(null, ipify.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    //is this the correct way to access the IP? forgot to use backticks tointerpolate the IP address from the request url.
    if (error) {
      callback(error, null);
      return;
    }

    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    if (response && response.statusCode !== 200) {
      const msg = (`It didn't work!`);
      callback(`Status Code: ${response.StatusCode}. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;

    const coordinates = {
      latitude: latitude,
      longitude: longitude
    };
    callback(null, coordinates);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };