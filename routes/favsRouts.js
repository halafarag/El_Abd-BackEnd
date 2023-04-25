const express = require("express");
const router = express.Router();
const { isUser } = require("../middlewares/auth");
const favController = require("../controller/favsConteoller");
// add fav
router.post("/", favController.addFav);
// remove fav
router.delete("/:id", favController.deleteFav);
//get all
router.get("/", favController.getAllFav);
module.exports = router;
