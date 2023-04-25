const SubCategory = require("../models/subcategory");
const Category = require("../models/category");

//ADD SUBCATEGORY
async function addSubCat(req, res) {
  try {
    const data = req.body;
    const newSubCat = await SubCategory.create(data);
    res.status(201).json(newSubCat);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
//GET SUBCAT BY ID
async function getById(req, res) {
  try {
    const id = req.params.id;
    const subCat = await SubCategory.findById(id).populate({ path: "category", select: "name" });
    res.status(200).json(subCat);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
//DELETE SUBCAT BY ID
async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const deleteSubCat = await SubCategory.findByIdAndDelete(id);
    res.status(200).json("DELETED SUCCESSFULLY");
  } catch (err) {
    res.status(405).json(err.message);
  }
}
//EDIT SUBCATEGORY
async function editSubCat(req, res) {
  try {
    const id = req.params.id;
    const editSubCat = req.body;
    await SubCategory.findByIdAndUpdate(id, { $set: editSubCat }, { new: true, runValidators: true }).populate({ path: "category", select: "name" });
    res.status(200).json(editSubCat);
  } catch (err) {
    res.status(405).json(err.message);
  }
}
//GET ALL SUBCATEGORIES OF SPECIFIC CATEGORY
async function getSubByCatID(req, res) {
  try {
    const foundCategory = await Category.findById(req.params.catID);
    if (!foundCategory) {
      res.status(404).json({ status: "failed", error: "This Category is not existed" });
    } else {
      foundProducts = await SubCategory.find({ category: req.params.catID }).limit(req.limit).skip(req.skip).populate({ path: "category", select: "name" });
    }
    if (foundProducts[0]) {
      const finalResult = foundProducts.map((item, idx) => {
        item = item.toObject();
        console.log(idx, item);
        return {
          _id: item._id,
          name: item.name,
          img: item.img,
          category: item.category,
        };
      });

      console.log("result", finalResult);
      res.status(200).json(finalResult);
    } else res.status(404).json({ status: "failed", error: "There is No Subcategory in this Category" });
  } catch (err) {
    res.status(404).json({ status: "failed", error: err.message });
  }
}
//GET ALL SUBCATEGORY
async function allSubCat(req, res) {
  try {
    const allSubCategory = await SubCategory.find().populate({ path: "category", select: "name" });
    res.status(200).json(allSubCategory);
  } catch (err) {
    res.status(404).json(err.message);
  }
}

module.exports = { addSubCat, getById, deleteById, editSubCat, getSubByCatID, allSubCat };
