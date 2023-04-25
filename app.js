const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

var bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoutes");
const subCateRoute = require("./routes/subCatRoute");
const productRoute = require("./routes/productRouts");
const cartRoute = require("./routes/cartRoute");
const favsRoute = require("./routes/favsRouts");
const orderRoute = require("./routes/orderRoute");
const stripe = require("stripe")("sk_test_51MbJWIE2Vs0vbq9W926MtuJHd4K77bS1ISslElzCtYRruX5swH9dzgpnmQLtAhOx8R8iODn6UUwC2rgeOwF71x1w00waW3PpCu");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
require("node-offline-localhost").always();

app.use("/users", userRoute);
app.use("/category", categoryRoute);
app.use("/subcat", subCateRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/favs", favsRoute);
app.use("/orders", orderRoute);
app.get("/", (req, res) => {
  res.send("Welcome to Hala farag API");
});
app.use((req, res, err) => {
  res.json({ status: "faild", message: err.message });
});
module.exports = app;
