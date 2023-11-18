const { nextISSTimesForMyLocation} = require('./iss_promised');
const { nextFlyOvers } = require('./index.js');

//the json body that was promised in the API request
// nextISSTimesForMyLocation()
// .then(fetchMyIP)
// .then(fetchcoordinatesByIP)
// .then(fetchISSFlyOverTimes)
// .then((body) => console.log(body));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    nextFlyOvers(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })