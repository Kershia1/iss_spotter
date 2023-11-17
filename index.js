//const { fetchMyIP } = require('./iss.js');

const callback = ((error, ip) => {
  if (error) {
    console.error("An error occured while fetching your IP address: ", error);
  } else {
    console.log("Your IP address is: ", ip);
  }
});

fetchMyIP(callback);