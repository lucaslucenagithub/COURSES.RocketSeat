const axios = require("axios");

module.exports = async function ParseStringAsArray(address, key) {
  const api = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      address,
      key
    }
  });
  return api.data.results[0].geometry.location;
};
