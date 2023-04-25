const express = require("express");
const { Router } = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { auth, authorization } = require("../middlewares/auth");

//get User By ID
router.get("/:id", auth, userController.getUserByID);
//delete user by id
router.delete("/:id", auth, userController.deleteUser);
//edit user
router.patch("/:id", auth, userController.updateInfo);
//register
router.post("/register", userController.register);
//login
router.post("/login", userController.login);
//admin login
// router.post("/login/admin", userController.loginAdmin);
//admin logout
router.get("/logout/:id", userController.logout);
//get all users
router.get("/", userController.getAllUsers);

module.exports = router;
