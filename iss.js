//API Call #1: Fetch IP Address

const request = require('request');

const fetchMyIP = function (callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    //err
    if (error) {
      callback(error, null);
      return;
    }

    if (response && response.statusCode !== 200) {
      const msg = (`An error occured while retriving your IP address.`);
      callback(`Status Code ${response.statusCode}. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }

    const ipify = JSON.parse(body);
    callback(null, ipify.ip);
  });
};

const fetchcoordinatesByIP = function (ip, callback) {

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

    const coords = {
      latitude: latitude,
      longitude: longitude
    };
    callback(null, coords);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response && response.statusCode !== 200) {
      const msg = (`Something went wrong while fetching ISS pass data.`);
      callback(`Status Code: ${response.StatusCode}. Response: ${body}`, null);
      callback(Error(msg), null);
      return;
    }
    try {
      const passes = JSON.parse(body).response;
      callback(null, passes);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};

//With all three API calls implemented, we can now glue or "chain" these together in order to build the app itself. We'll do that as the next thing.

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  // timebox start 7:15 pm 
  fetchMyIP((error, ip) => {
    if(error) {
      //console.log("IP function throwing Null: ", null);
      return callback(error, null);
    }

    fetchcoordinatesByIP(ip, (error, coords) => {
       if (error){
        //console.log("byIP throwing Null: ", null);
      return callback(error, null);
       }

       fetchISSFlyOverTimes(coords, (error, passes) => {
        if(error) {
          // console.log("ISS function throwing Null: ", null);
          return callback(error, null);
        }
        callback(null, passes)
       })
    })
  })
};
// nextISSTimesForMyLocation(callback);

module.exports =  { nextISSTimesForMyLocation };

//module.exports = { fetchMyIP, fetchcoordinatesByIP, fetchISSFlyOverTimes };