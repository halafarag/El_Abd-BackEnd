const Cart = require("../models/cart");

// GET CART BY USER ID
async function getCartByUserID(req, res) {
  try {
    const cart = await Cart.find({ user: req.params.id }).populate("product user", "name title price volume img category subcategory , firstName ");
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// GET ALL CARTS FOR USER
async function getAll(req, res) {
  try {
    const cart = await Cart.find({ user: req.userdata.userId }).populate("product");
    const allCarts = cart.map((item) => {
      return {
        _id: item._id,
        user: item.user,
        product: {
          _id: item.product._id,
          name: item.product.name,
          discription: item.product.discription,
          price: item.product.price,
          volume: item.product.volume,
          img: item.product.img,
          category: item.product.category,
          subcategory: item.product.subcategory,
          quantity: item.product.quantity,
          discount: item.product.discount,
        },
        quantity: item.quantity,
      };
    });
    res.status(200).json(allCarts);
  } catch (err) {
    res.status(404).json(err.message);
  }
}
// EDIT
async function updateQuantity(req, res) {
  try {
    const updated = await Cart.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}
// DELETE
async function deleteFromCart(req, res) {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart Deleted Successfully ..");
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}
// ADD TO CART
async function addToCart(req, res) {
  try {
    const product = req.body;
    // console.log(req.body.user);
    const found = await Cart.findOne({ user: req.body.user, product: req.body.product, amount: req.body.amount });
    if (found) {
      const update = await Cart.findOneAndUpdate({ user: req.body.user, product: req.body.product, amount: req.body.amount }, product, {
        runValidators: true,
        new: true,
      });
      res.status(201).json(update);
    } else {
      req.body.user = req.body.user;
      const savedProduct = await Cart.create(product);
      res.status(201).json(savedProduct);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = { getCartByUserID, addToCart, getAll, deleteFromCart, updateQuantity };
