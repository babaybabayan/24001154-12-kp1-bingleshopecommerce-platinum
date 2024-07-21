exports.createRequestItem = (req) => {
  const bindingResult = {
    validatedData: {},
    errors: {},
  };

  if (req.name) {
    bindingResult.validatedData.name = req.name;
  } else {
    bindingResult.errors.name = "name cannot be empty";
  }
  if (req.description) {
    bindingResult.validatedData.description = req.description;
  } else {
    bindingResult.errors.name = "description cannot be empty";
  }
  if (req.price) {
    bindingResult.validatedData.price = req.price;
  } else {
    bindingResult.errors.price = "price cannot be empty";
  }
  if (req.stock) {
    bindingResult.validatedData.stock = req.stock;
  } else {
    bindingResult.errors.stock = "stock cannot be empty";
  }
  bindingResult.validatedData.imageUrl = req.imageUrl;

  return bindingResult;
};
