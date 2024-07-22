exports.createRequestOrder = (req) => {
    const bindingResult = {
      validatedData: {},
      errors: {},
    };
  
    if (req.user_id) {
      bindingResult.validatedData.user_id = req.user_id;
    } else {
      bindingResult.errors.user_id = "user_id cannot be empty";
    }
  
    if (req.item_id) {
      bindingResult.validatedData.item_id = req.item_id;
    } else {
      bindingResult.errors.item_id = "item_id cannot be empty";
    }
  
    if (req.quantity) {
      bindingResult.validatedData.quantity = req.quantity;
    } else {
      bindingResult.errors.quantity = "quantity cannot be empty";
    }
  
    if (req.total_price) {
      bindingResult.validatedData.total_price = req.total_price;
    } else {
      bindingResult.errors.total_price = "total_price cannot be empty";
    }
  
    bindingResult.validatedData.status = req.status || "pending";
  
    return bindingResult;
  };
  