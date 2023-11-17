const fetchMyIP = require('./iss');

const callback = ((error, ip) => {
  //callback to handle errors for user and return the user ip
  if(error) {
    console.error("An error occured while fetching your IP address: ", error);
  } else {
    console.log("Your IP address is: ", ip);
  }
});

fetchMyIP(callback);