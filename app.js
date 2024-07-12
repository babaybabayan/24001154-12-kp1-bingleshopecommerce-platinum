const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());



app.use((req, res, next) => {
    res.status(404).send({
      status: "fail",
      message: "not found"
    })
  });


  app.listen(PORT, function () {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
  });