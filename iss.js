/*API Call #1: Fetch IP Address
Define a function fetchMyIP which will asynchronously return our IP Address using an API.

 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 * 
 * working from the documentation for request library
 * https://www.npmjs.com/package/request#custom-http-headers to do callback to request the API and my IP.
*/

const request = require('request');

//make the API request with req library

const fetchMyIP = function(callback) {
  const options = {
    url: 'https://api.ipify.org?format=json',
  
    headers: {
      'User-Agent': 'Iss Spotter'
    }
  };

request(options,(error, response, body) => {
  //err
  if(error) {
    callback (error, null);
    return; 
  }
 
  if (response && response.statusCode !== 200) {
    callback(`Status Code ${response.StatusCode} during IP fetch request. Response: ${body}`, null);
    return;
  }

      const ipify = JSON.body(body);
        callback (null, ipify.ip);
});
//removed unecessary code and placed withith the fethMyIP function, request was accidentally outside the function scop and could not pass the options function callback as required for the request callback to work properly.
}

module.exports = { fetchMyIP };

/**
 * 
 * const request = require('request');
 * //reruire the installed request library from node to run API requests
 
const options = {
  //this is the url I would like to navigate to url(key):('https../request')value I am accessing, to parse data from as a JSON obj
  url: 'https://api.github.com/repos/request/request',

  headers: {
    //user -agent is the 'agent' place the request
    'User-Agent': 'request'
  }
};
 

the callback is being passed as an arg to request, once the API request is complete

function callback(error, response, body) {
  //callback function which will handle the response from the API req
  //if no errors and 200 proceed

  if (!error && response.statusCode == 200) {
    //parse the JSON string from response body to JS Obj for manipulation

    const info = JSON.parse(body);
    //log the retrived information from the info object and stargazers_count value and concate the amount of stars
    //actually logging the amount of star

    console.log(info.stargazers_count + " Stars");
    //log the retrived information from the info object and forks_count value and concate the amount of forks
    //logging the amount of forks

    console.log(info.forks_count + " Forks");
  }
}
 
//return the named function callback and the body if everything is correct?
//make my API request with the assistance of the 'request' library. Passing the options function and callback function.

request(options, callback);

this is where the request is finally enacted with the request library
 * 
 */