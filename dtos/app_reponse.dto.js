exports.buildSimpleSuccess = () => {
  return { success: true };
};

exports.buildSuccessWithMessages = (messages) => {
  let response = { success: true };
  if (typeof messages === "string") response.message = [messages];
  else if (messages instanceof Array) response.message = messages;
  else if (messages instanceof Object)
    response.message = Object.values(messages);

  return response;
};

exports.buildWithErrorMessages = (messages, statusCode) => {
  let response = { success: false };
  response.errors = [];
  if (typeof messages === "string") response.message = [messages];
  else if (messages instanceof Array) response.message = messages;
  else if (messages instanceof Error) {
    response.message = [messages.name + "->" + messages.message];
    response.errors.push({ name: messages.name, message: messages.message });
    response.errors.push({ stack: messages.stack });
  } else if (messages instanceof Object) {
    response.errors = messages;
    response.message = Object.values(messages);
  }
  response.statusCode = statusCode || 500;
  return response;
};

function populateResponseWithMessages(response, success, messages, statusCode) {
  if (response === null) response = {};

  response.success = !!success;

  if (typeof messages === "string") response.message = [messages];
  else if (messages instanceof Array) response.message = messages;
  else if (messages instanceof Object)
    response.message = Object.values(messages);
  response.statusCode = statusCode || 200;
  return response;
}

exports.buildWithDtoAndMessages = (dto, messages, statusCode) => {
  return populateResponseWithMessages(dto, true, messages, statusCode);
};

exports.buildSuccessWithDto = (dto) => {
  return populateResponseWithMessages(dto, true, null);
};
exports.buildSimpleSuccess = () => {
  return { success: true };
};
