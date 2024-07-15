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

exports.buildWithErrorMessages = (messages) => {
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
  return response;
};

function populateResponseWithMessages(response, success, messages) {
  if (response === null) response = {};

  response.success = !!success;

  if (typeof messages === "string") response.message = [messages];
  else if (messages instanceof Array) response.message = messages;
  else if (messages instanceof Object)
    response.message = Object.values(messages);

  return response;
}

exports.buildWithDtoAndMessages = (dto, messages) => {
  return populateResponseWithMessages(dto, true, messages);
};

exports.buildSuccessWithDto = (dto) => {
  return populateResponseWithMessages(dto, true, null);
};
exports.buildSimpleSuccess = () => {
  return { success: true };
};
