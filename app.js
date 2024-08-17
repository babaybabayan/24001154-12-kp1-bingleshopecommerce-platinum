const express = require("express");
const morgan = require("morgan");
const path = require("path");
const itemRoutes = require("./routes/ItemRoutes");
const userRoutes = require("./routes/UserRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const verificationRoutes = require("./routes/VerificationRoutes");
const orderDetailRoutes = require("./routes/TransactionRoutes");
const cartRoutes = require("./routes/CartRoutes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const { signToken } = require("./utils/GenerateToken");
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/order-detail", orderDetailRoutes);
app.use("/api/docs", swaggerRoutes);
// test
app.get("/test", (req, res) => res.send("This App is running properly!"));

// TODO:- WIll delete letter
app.post("/login", (req, res, next) => {
  const token = signToken(req.body);
  return res.json({ token: token });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./views/controller/404.html"));
});

module.exports = app;
