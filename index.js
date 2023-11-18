// const { fetchMyIP, fetchCoordsByIP } = require('./iss.js');
// const { fetchISSFlyOverTimes } = require('./iss.js');

// const coords = { latitude: 48.4284207, longitude: -123.3656444 };

// const callback = ((error, ip) => {
//   //fetch users IP address
//   if (error) {
//     console.error("An error occured while fetching your IP address: ", error);
//   } else {
//     console.log("Your IP address is: ", ip);

//     fetchCoordsByIP(ip, (error, coordinates) => {
//       if (error) {
//         console.error("An error occured while fetching your Geo-location Coordinates: ", error);
//       } else {
//         console.log("Your Coordinates are: ", coordinates);

//         fetchISSFlyOverTimes(coords, (error, passTimes) => {
//           if (error) {
//             console.error("An error occured while fetching ISS pass over coordinates: ", error);
//             return;
//           }
//           console.log('It worked! Returned flyover times:' , passTimes);
//         });

//       }
//     });
//   }
// });
// fetchMyIP(callback);



const { nextISSTimesForMyLocation } = require('./iss');

const nextFlyOvers = function(passTimes) {
  for(const pass of passTimes) {
    const dateTime = new Date(0);
    // i.e. Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`The ISS will next pass above you at ${dateTime} for ${duration} seconds!`)
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  nextFlyOvers(passTimes);
});

//Works!!!!! logging to see if lat is returned:  
/*logging to see if long is returned: 
The ISS will next pass above you at Sun Nov 19 2023 02:09:59 GMT+0000 (Coordinated Universal Time) for 566 seconds!
The ISS will next pass above you at Sun Nov 19 2023 12:16:39 GMT+0000 (Coordinated Universal Time) for 244 seconds!
The ISS will next pass above you at Sun Nov 19 2023 22:23:19 GMT+0000 (Coordinated Universal Time) for 672 seconds!
The ISS will next pass above you at Mon Nov 20 2023 08:29:59 GMT+0000 (Coordinated Universal Time) for 144 seconds!
The ISS will next pass above you at Mon Nov 20 2023 18:36:39 GMT+0000 (Coordinated Universal Time) for 233 seconds! */
