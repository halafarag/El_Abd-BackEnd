const Product = require("../models/product");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");

//ADD Product
async function addProduct(req, res) {
  try {
    const data = req.body;
    const newProduct = await Product.create(data);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
//GET Product BY ID
async function getById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate({ path: "category", select: "name" }).populate({ path: "subcategory", select: "name" });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
//DELETE CAT BY ID
async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const deleteproduct = await Product.findByIdAndDelete(id);
    res.status(200).json("DELETED SUCCESSFULLY");
  } catch (err) {
    res.status(405).json(err.message);
  }
}
//EDIT CATEGORY
async function editProduct(req, res) {
  try {
    const id = req.params.id;
    const editProduct = req.body;
    await Product.findByIdAndUpdate(id, { $set: editProduct }, { new: true, runValidators: true });
    res.status(200).json(editProduct);
  } catch (err) {
    res.status(405).json(err.message);
  }
}
// GET PRODUCTS BY CATEGORY ID & PAGINATION
async function getProductByCategory(req, res) {
  try {
    const foundCategory = await Category.findById(req.params.catID);
    if (!foundCategory) {
      res.status(404).json({ status: "failed", error: "This Category is not existed" });
    } else {
      foundProducts = await Product.find({ category: req.params.catID })
        .limit(req.limit)
        .skip(req.skip)
        .populate({ path: "category subcategory", select: `name ` });
    }
    if (foundProducts[0]) {
      const finalResult = foundProducts.map((item, idx) => {
        item = item.toObject();
        // console.log(idx, item);
        return {
          _id: item._id,
          name: item.name,
          discription: item.discription,
          price: item.price,
          volume: item.volume,
          img: item.img,
          category: item.category,
          subcategory: item.subcategory,
          quantity: item.quantity,
          discount: item.discount,
        };
      });
      // console.log("result", finalResult);
      res.status(200).json(finalResult);
    } else res.status(404).json({ status: "failed", error: "NOT FOUND!" });
  } catch (err) {
    res.status(404).json({ status: "failed", error: err.message });
  }
}
// GET PRODUCTS BY SUBCATEGORY ID & PAGINATION
async function getProductBySUB(req, res) {
  try {
    const foundSub = await Subcategory.findById(req.params.subID);
    if (!foundSub) {
      res.status(404).json({ status: "failed", error: "This subCategory is not existed" });
    } else {
      foundProducts = await Product.find({ subcategory: req.params.subID })
        .limit(req.limit)
        .skip(req.skip)
        .populate({ path: "category subcategory", select: `name -_id` });
    }
    if (foundProducts[0]) {
      const finalResult = foundProducts.map((item, idx) => {
        item = item.toObject();
        // console.log(idx, item);
        return {
          _id: item._id,
          name: item.name,
          discription: item.discription,
          price: item.price,
          volume: item.volume,
          img: item.img,
          category: item.category,
          subcategory: item.subcategory,
          quantity: item.quantity,
          discount: item.quantity,
        };
      });

      // console.log("result", finalResult);
      res.status(200).json(finalResult);
    } else res.status(404).json({ status: "failed", error: "NOT FOUND!" });
  } catch (err) {
    res.status(404).json({ status: "failed", error: err.message });
  }
}

//GET ALL CATEGORY
async function allProducts(req, res) {
  try {
    const allProducts = await Product.find().populate({ path: "category", select: "name" }).populate({ path: "subcategory", select: "name" });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
module.exports = { addProduct, getById, deleteById, editProduct, allProducts, getProductByCategory, getProductBySUB };
