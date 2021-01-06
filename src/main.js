const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

async function updateIfExists(id, body) {
  const url = `${BASE_URL}/constellations/${id}`;
  // http://localhost:5000/constellations/dFBbdkr
  return axios
    .get(url)
    .then(response => {
      if (response && response.data) {
        return axios.put(url, body);
      } else {
        throw "Constellation doesn't exist";
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.message;
    });
}

module.exports = {
  updateIfExists,
};
