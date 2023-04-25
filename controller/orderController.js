const { populate } = require("../models/order");
const Order = require("../models/order");
const User = require("../models/user");
const stripe = require("stripe")("sk_test_51MbJWIE2Vs0vbq9W926MtuJHd4K77bS1ISslElzCtYRruX5swH9dzgpnmQLtAhOx8R8iODn6UUwC2rgeOwF71x1w00waW3PpCu");
// add new order
async function addOrder(req, res) {
  try {
    token = req.body.token;
    total = req.body.total;
    cartList = req.body.cartList;
    console.log(req.body);

    const customer = stripe.customers
      .create({
        email: "maielkomy924@gmail.com",
        source: token.id,
      })
      .then((customer) => {
        console.log(customer);
        // have access to the customer object
        return stripe.charges.create({
          customer: customer.id, // set the customer id
          amount: total, // 25
          currency: "USD",
          description: "Test using node js ",
        });
      })
      .then((charge) => {
        // console.log(charge);
        res.json({ data: "success" });
      })
      .catch((err) => {
        res.json({ data: "failure" });
        // Deal with an error
      });
  } catch (err) {
    res.status(422).json(err);
  }
}

// get by id
async function getByID(req, res) {
  try {
    const orderdId = req.params.id;
    const found = await Order.findById(orderdId);
    if (found.userId == req.userData.userId) {
      res.status(200).json(found);
    } else {
      res.status(422).json("this order not belong to you");
    }
  } catch (err) {
    res.status(422).json(err);
  }
}

async function getOrdersFoUser(req, res) {
  const lang = req.headers.lang || "en";
  try {
    const found = await Order.find({ userId: req.userData.userId })
      .populate({ path: "userId", select: "fullName ,emailAdress" })
      .populate("products.productId");

    if (found) {
      const finalResult = found.map((item) => {
        const prods = item.products.map((p) => {
          if (p.productId._id) {
            return {
              productId: {
                _id: p.productId._id,
                ...p.productId[lang],
                mainImgs: p.productId.mainImgs,
                OtherImgs: p.productId.OtherImgs,
                size: p.productId.size,
                price: p.productId.price,
                priceAfterDiscount: p.productId.priceAfterDiscount,
                quantity: p.productId.quantity,
                artNo: p.productId.artNo,
                category: p.productId.category,
                subcategories: p.productId.subcategories,
                reviews: p.productId.reviews,
                rate: p.productId.rate,
                rateCount: p.productId.rateCount,
              },
              quantity: p.quantity,
            };
          }
        });

        if (prods) {
          return {
            _id: item._id,
            userId: item.userId,
            address: item.address,
            mobile: item.mobile,
            total: item.total,
            state: item.state,
            products: prods,
            createdAt: item.createdAt,
          };
        }
      });

      res.status(200).json(finalResult);
    } else {
      res.status(422).json("this order not belong to you");
    }
  } catch (err) {
    res.status(422).json(err);
  }
}

// delete by id
async function deleteById(req, res) {
  try {
    const orderdId = req.params.id;
    const found = await Order.findById(orderdId);
    if (found.userId == req.userData.userId) {
      const deleteOrder = await Order.findByIdAndDelete(orderdId);
      res.status(200).json("your order has been deleted");
    } else {
      res.status(422).json("this order not belong to you");
    }
  } catch (err) {
    res.status(422).json(err);
  }
}
// Edit
async function editOrder(req, res) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true, new: true });
    res.status(200).json({ status: "success", data: updatedOrder });
  } catch (err) {
    res.status(405).json({ status: "failed", error: err.message });
  }
}
//get all orders
async function getAllOrders(req, res) {
  const lang = req.headers.lang || "en";
  try {
    const allOrders = await Order.find({}).populate({ path: "userId", select: "fullName ,emailAdress" }).populate("products.productId");

    const finalResult = allOrders.map((item) => {
      const prods = item.products.map((p) => {
        return {
          productId: {
            _id: p.productId._id,
            ...p.productId[lang],
            mainImgs: p.productId.mainImgs,
            OtherImgs: p.productId.OtherImgs,
            size: p.productId.size,
            price: p.productId.price,
            priceAfterDiscount: p.productId.priceAfterDiscount,
            quantity: p.productId.quantity,
            artNo: p.productId.artNo,
            category: p.productId.category,
            subcategories: p.productId.subcategories,
            reviews: p.productId.reviews,
            rate: p.productId.rate,
            rateCount: p.productId.rateCount,
          },
          quantity: p.quantity,
        };
      });

      return {
        _id: item._id,
        userId: item.userId,
        address: item.address,
        mobile: item.mobile,
        total: item.total,
        state: item.state,
        products: prods,
        createdAt: item.createdAt,
      };
    });

    res.status(200).json(finalResult);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
module.exports = { addOrder, deleteById, getByID, getAllOrders, editOrder, getOrdersFoUser };
