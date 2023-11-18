const { fetchMyIP, fetchCoordsByIP } = require('./iss.js');
const { fetchISSFlyOverTimes } = require('./iss.js');

const coords = { latitude: 48.4284207, longitude: -123.3656444 };

const callback = ((error, ip) => {
  //fetch users IP address
  if (error) {
    console.error("An error occured while fetching your IP address: ", error);
  } else {
    console.log("Your IP address is: ", ip);

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.error("An error occured while fetching your Geo-location Coordinates: ", error);
      } else {
        console.log("Your Coordinates are: ", coordinates);

        fetchISSFlyOverTimes(coords, (error, passTimes) => {
          if (error) {
            console.error("An error occured while fetching ISS pass over coordinates: ", error);
            return;
          }
          console.log('It worked! Returned flyover times:' , passTimes);
        });

      }
    });
  }
});
fetchMyIP(callback);
