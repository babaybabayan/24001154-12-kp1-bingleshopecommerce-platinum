exports.createRequestItem = (req) => {
  const bindingResult = {
    validatedData: {},
    errors: {},
  };

  if (req.body.name) {
    bindingResult.validatedData.name = req.body.name;
  } else {
    bindingResult.errors.name = "name cannot be empty";
  }
  if (req.body.description) {
    bindingResult.validatedData.description = req.body.description;
  } else {
    bindingResult.errors.name = "description cannot be empty";
  }
  if (req.body.price) {
    bindingResult.validatedData.price = req.body.price;
  } else {
    bindingResult.errors.price = "price cannot be empty";
  }
  if (req.body.imageUrl) {
    bindingResult.validatedData.imageUrl = req.body.imageUrl;
  } else {
    bindingResult.errors.imageUrl = "image cannot be empty";
  }

  return bindingResult;
};
