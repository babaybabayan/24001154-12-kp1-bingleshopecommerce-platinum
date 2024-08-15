const express = require("express");
const morgan = require("morgan");
const itemRoutes = require("./routes/ItemRoutes");
const userRoutes = require("./routes/UserRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const verificationRoutes = require("./routes/VerificationRoutes");
const orderDetailRoutes = require("./routes/TransactionRoutes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const { signToken } = require("./utils/GenerateToken");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
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
  res.status(404).send({
    status: "fail",
    message: "not found",
  });
});

module.exports = app;
