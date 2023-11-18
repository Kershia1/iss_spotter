const request = require('request-promise-native');

/*
fetchMyIP is a function that returns a Promise. It uses the request function from the request-promise-native library to make a GET request to https://api.ipify.org?format=json.
*/
const nextISSTimesForMyLocation = function () {
 return fetchMyIP ()
  .then(fetchcoordinatesByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
  };



const fetchMyIP = function () {
return request('https://api.ipify.org?format=json');
};

const fetchcoordinatesByIP = function (body) {
const ip = JSON.parse(body).ip;
 return request(`https://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = (`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`); 
  return request(url);
};

//module.exports = { nextISSTimesForMyLocation, fetchMyIP };

module.exports = { nextISSTimesForMyLocation , fetchMyIP , fetchcoordinatesByIP, fetchISSFlyOverTimes };