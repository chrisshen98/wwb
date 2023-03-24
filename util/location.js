const axios = require("axios");
const HttpError = require("../models/http-error");
// require("dotenv").config();

async function getCoordsFromAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyB-2KnL9a_Yrihpb16Nu2Y-ZR2rhWrbC_E`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("Cannot find location for the specified address!", 422);
  }

  const coords = data.results[0].geometry.location;
  return coords;
}

module.exports = getCoordsFromAddress;
