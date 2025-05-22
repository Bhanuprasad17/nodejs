const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post("/postUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUser/:id", userController.getUserById);
router.delete("/deleteUser/:id", userController.deleteUser);
router.put("/updateUser/:id", userController.updateUser);


module.exports = router;