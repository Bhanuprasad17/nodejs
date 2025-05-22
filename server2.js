const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

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

app.get("/", (req, res) => {
  res.json("data");
});

app.post("/postUser", async (req, res) => {
  try {
    let { id, name, role } = req.body;

    let newUser = new User({ id, name, role });

    let response = await newUser.save();

    res.status(200).json({
      message: "Successfully Post Created on MongoDB",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save data on MongoDB ",
    });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    let data = await User.find();
    res.json({ message: "successfully fetched all users data", data });
  } catch (error) {
    res.status(400).json({
      message: "Error fectching users",
      error: error,
    });
  }
});

app.get("/getUser/:id", async (req, res) => {
  try {
    let userId = Number(req.params.id);
    console.log(userId);
    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({
      message: "user fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "error fetching user",
      error: err.message,
    });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    let userId = req.params.id;

    // let deleteUser = await User.findOneAndDelete({userId})
    let deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "error deleting user",
      error: error.message,
    });
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updateUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ 
        message: "user updated successfully" ,
        data : updateUser
    });
  } catch (error) {
    res.status(500).json({
        message : 'error updating user',
        error : err.message
    })
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
