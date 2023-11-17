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
    })
  }
});

fetchMyIP(callback);
//returns everythign yes?
//need to nest urgh
//fetchCoordsByIP(callback);

//Expected output: similar to this { latitude: '49.27670', longitude: '-123.13000' }
// confirmation values stored in perosnal notes
//

/**
 * 
 * Single IP Lookup:
 * 
You can call the API by sending HTTP GET requests to http://ipwho.is/[IP address]
 * 
 * # Get details for 8.8.4.4
$ curl "http://ipwho.is/8.8.4.4"

# Get details for your own IP address
$ curl "http://ipwho.is/"
 * 
 * 
 * Returned data:
 * 
Depending on your subscription plan and the options you choose for your API request, the response will contain a number of different fields. Below is a list of all available API response fields:
 * 

Response Fields:

fields=latitude,longitude

 * latitude	The approximate (WGS84) latitude of the location associated with the IP (e.g. 37.3860517)
longitude	The approximate (WGS84) longitude of the location associated with the IP (e.g. -122.0838511)
 * 
Output:

 * Specify my output format 
 * output=json
 * However this stage is ommited since JSOn is beign used
 * 
 * Callback:
 * JSONP Callback
API supports callback function (JSONP). Simply append the GET parameter callback to your API request URL and set it to your function name.

For example:	
callback=getIPinfo
 * 
 */