const express = require("express");
const app = express();
const PORT = 3000;

const itemRoutes = require("./routes/ItemRoutes");
const userRoutes = require("./routes/UserRoutes");
const orderRoutes = require('./routes/orderRoutes');
const { signToken } = require("./utils/GenerateToken");

app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes);

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

app.listen(PORT, function () {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
