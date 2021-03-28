const express = require("express");
const os = require("os");
const axios = require("axios");

const app = express();

const baseUrl =
  "https://www.canadapost-postescanada.ca/track-reperage/rs/track/json/";

app.use(express.static("dist"));

app.get("/check", async (req, res) => {
  const trackingId = req.query?.trackingId || "";

  if (!trackingId) {
    res.send({ error: "Invalid tracking ID supplied" });
    return;
  }

  const trackingInfo = await axios
    .get(`${baseUrl}package/${trackingId}/detail`)
    .then(({ data }) => {
      console.log(data);
      return data;
    });
  console.log("res", trackingInfo);

  res.send(trackingInfo.events);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
