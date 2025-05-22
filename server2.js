const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const userRoutes = require('./routes/userRoutes')
const app = express();

app.use(express.json());



mongoose
  .connect(
    "mongodb+srv://bhanuprasadsuram0018:Suram%40143@cluster0.enfq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((data) => {
    console.log("successfully conneted to mongoDB");
  })
  .catch((err) => {
    console.log("failed to connect mongodb");
  });

app.use("/api", userRoutes); // All routes start with /api

app.get("/", (req, res) => res.send("API running..."));


app.listen(3000, () => {
  console.log("server running on port 3000");
});
