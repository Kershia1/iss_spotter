const { fetchMyIP, fetchCoordsByIP } = require('./iss.js');

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
      }
    });
  }
});

fetchMyIP(callback);
