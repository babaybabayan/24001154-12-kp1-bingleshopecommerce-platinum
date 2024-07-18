const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));




app.use((req, res, next) => {
    res.status(404).send({
      status: "fail",
      message: "not found"
    })
  });


  app.listen(PORT, function () {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
  });