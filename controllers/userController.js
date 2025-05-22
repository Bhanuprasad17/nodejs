const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { id, name, role } = req.body;
    const newUser = new User({ id, name, role });
    const response = await newUser.save();
    res.status(200).json({ message: "User created", data: response });
  } catch (err) {
    res.status(500).json({ message: "Error saving user", error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "All users fetched", data: users });
  } catch (err) {
    res.status(400).json({ message: "Error fetching users", error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Delete error", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};
