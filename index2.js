const { fetchMyIP } = require('./iss_promised');

fetchMyIP()
.then((body) => console.log(body));
//the json body that was promised in the API request