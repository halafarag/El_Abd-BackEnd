const express = require("express");
const { Router } = express;
const router = express.Router();
const subCategory = require("../controller/subCatContro");
const { auth, authorization, isAdmin, isUser } = require("../middlewares/auth");
const { pagination } = require("../middlewares/pagination");

//ADD SUBCATEGORY
router.post("/", isAdmin, subCategory.addSubCat);
//GET SUBCAT BY ID
router.get("/:id", subCategory.getById);
//DELETE SUBCAT BY ID
router.delete("/:id", isAdmin, subCategory.deleteById);
//EDIT SUBCATEGORY
router.put("/:id", isAdmin, subCategory.editSubCat);
//GET ALL SUBCATEGORIES OF SPECIFIC CATEGORY
router.get("/category/:catID", pagination, subCategory.getSubByCatID);
//ALL SUBCATEGORIES
router.get("/", subCategory.allSubCat);

module.exports = router;
