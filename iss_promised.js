const request = require('request-promise-native');

/*
fetchMyIP is a function that returns a Promise. It uses the request function from the request-promise-native library to make a GET request to https://api.ipify.org?format=json.
*/

const fetchMyIP = function () {
return request('https://api.ipify.org?format=json');
};

module.exports = { fetchMyIP };