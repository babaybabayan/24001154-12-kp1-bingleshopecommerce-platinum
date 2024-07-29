const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const PORT = 3000;
const socketio = require("socket.io");

const itemRoutes = require("./routes/ItemRoutes");
const userRoutes = require("./routes/UserRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const verificationRoutes = require("./routes/VerificationRoutes");
const { signToken } = require("./utils/GenerateToken");

app.use(express.json());


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/verification", verificationRoutes);

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

const server = app.listen(PORT, function () {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
  });

const io = socketio(server);
  io.on ('connection', (socket) => {
    console.log('a user connected');

  socket.on('chat message', (msg) =>{
    console.log('message: ', msg);
    io.emit('new chat', msg);
  });

  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  });
});