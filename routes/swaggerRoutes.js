const router = require("express").Router();
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerModelValidator = require("swagger-model-validator");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
swaggerModelValidator(swaggerSpec);

router.get("/json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

exports.validateModel = (name, model) => {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    console.error(responseValidation.errors);
    throw new Error(`Model doesn't match Swagger contract`);
  }
};

module.exports = router;
