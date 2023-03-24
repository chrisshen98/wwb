const axios = require("axios");
const HttpError = require("../models/http-error");
require("dotenv").config();

async function getCoordsFromAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("Cannot find location for the specified address!", 422);
  }

  const coords = data.results[0].geometry.location;
  return coords;
}

module.exports = getCoordsFromAddress;
