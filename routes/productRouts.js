const express = require("express");
const { Router } = express;
const router = express.Router();
const productContro = require("../controller/productContro");
const { auth, authorization, isAdmin, isUser } = require("../middlewares/auth");
const { pagination } = require("../middlewares/pagination");

//ADD PRODUCT
router.post("/", isAdmin, productContro.addProduct);
//GET PRODUCT BY ID
router.get("/:id", productContro.getById);
//DELETE PRODUCT BY ID
router.delete("/:id", isAdmin, productContro.deleteById);
//EDIT PRODUCT
router.put("/:id", isAdmin, productContro.editProduct);
// GET PRODUCTS BY CATEGORY ID & PAGINATION
router.get("/category/:catID", productContro.getProductByCategory);
// GET PRODUCTS BY SUBCATEGORY ID & PAGINATION
router.get("/subcat/:subID", productContro.getProductBySUB);
//ALL PRODUCTS
router.get("/", productContro.allProducts);

module.exports = router;
