const Category = require("../models/category");

//ADD CATEGORY
async function addCat(req, res) {
  try {
    const data = req.body;
    const newCat = await Category.create(data);
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
//GET CAT BY ID
async function getById(req, res) {
  try {
    const id = req.params.id;
    const cat = await Category.findById(id);
    res.status(200).json(cat);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
//DELETE CAT BY ID
async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const deleteCat = await Category.findByIdAndDelete(id);
    res.status(200).json("DELETED SUCCESSFULLY");
  } catch (err) {
    res.status(405).json(err.message);
  }
}
//EDIT CATEGORY
async function editCat(req, res) {
  try {
    const id = req.params.id;
    const editCat = req.body;
    await Category.findByIdAndUpdate(id, { $set: editCat }, { new: true, runValidators: true });
    res.status(200).json(editCat);
  } catch (err) {
    res.status(405).json(err.message);
  }
}
//GET ALL CATEGORY
async function allCat(req, res) {
  try {
    const allCategory = await Category.find();
    res.status(200).json(allCategory);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
module.exports = { addCat, getById, deleteById, editCat, allCat };
