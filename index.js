const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const adminRoutes = require("./routes/admin.routes");

const port = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((e) => console.log(e));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
