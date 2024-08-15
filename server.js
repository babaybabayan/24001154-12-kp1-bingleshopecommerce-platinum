require("dotenv").config();
const app = require("./app");
const PORT = process.env.DB_PORT;

app.listen(PORT, () => {
  console.log(`This app running on http://${process.env.DB_HOST}:${PORT}`);
});
