const express = require("express");
const { Router } = express;
const router = express.Router();
const categoryCont = require("../controller/categoryCont");
const { auth, authorization, isAdmin, isUser } = require("../middlewares/auth");

//ADD CATEGORY
router.post("/", isAdmin, categoryCont.addCat);
//GET CAT BY ID
router.get("/:id", categoryCont.getById);
//DELETE CAT BY ID
router.delete("/:id", isAdmin, categoryCont.deleteById);
//EDIT CATEGORY
router.put("/:id", isAdmin, categoryCont.editCat);
//ALL CATEGORIES
router.get("/", categoryCont.allCat);
module.exports = router;
