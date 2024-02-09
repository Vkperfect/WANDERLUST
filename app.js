const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("hi, i am root");
});

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My new villa",
    description: "By the beach",
    price: 1200,
    location: "calangute,Goa",
    country: "India",
  });
  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful tesing");
});

app.listen(8080, () => {
  console.log("server listening");
});
