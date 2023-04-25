const Favourite = require("../models/favourit");
const User = require("../models/user");
// add FAV
async function addFav(req, res, next) {
  try {
    const product = req.body;
    // console.log(req.body.user);
    const found = await Favourite.findOne({ user: req.body.user, product: req.body.product });
    if (found) {
      const update = await Favourite.findOneAndUpdate({ user: req.body.user, product: req.body.product }, product, {
        runValidators: true,
        new: true,
      });
      res.status(201).json(update);
    } else {
      req.body.user = req.body.user;
      const savedProduct = await Favourite.create(product);
      res.status(201).json(savedProduct);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// delete by id
async function deleteFav(req, res) {
  try {
    var id = req.params.id;
    var deletedProduct = await Favourite.findByIdAndDelete(id);
    console.log(deletedProduct);
    res.status(200).json({ message: "your Favourite has been deleted" });
  } catch (err) {
    res.status(422).json({ status: "failed", message: `${err.message}` });
  }
}
//get all favs for one user
async function getAllFav(req, res) {
  try {
    const allFAV = await Favourite.find();
    res.status(200).json(allFAV);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
module.exports = { addFav, deleteFav, getAllFav };
