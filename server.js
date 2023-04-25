const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config();
mongoose.set("strictQuery", false);

const db = process.env.DB.replace("<password>", process.env.PASSWORD);
mongoose
  .connect(db)
  .then(() => {
    console.log(" connected to DB sucessfully");
  })
  .catch(() => {
    console.log("NOT FOUND");
  });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`SERVER CONNECTED ON PORT ${PORT}`);
});
