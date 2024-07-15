const express = require("express");
const app = express();
const PORT = 3000;

const itemRoutes = require("./routes/ItemRoutes");
const { generateAccessToken } = require("./generateSecretKey");
const { signToken } = require("./middlewares/AuthMiddleware");

app.use(express.json());

app.use("/api/items", itemRoutes);

// TODO:- WIll delete letter
app.post("/login", (req, res, next) => {
  const token = signToken(1);
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