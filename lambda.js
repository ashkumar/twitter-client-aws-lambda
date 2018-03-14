const { Response } = require('./lib/Response');
const { Controller } = require('./lib/Controller');

exports.execute = (event, context, callback) => {
  try {
    const controller = new Controller(event);

    if(!controller.action) {
      const error = `invalid API action called: ${controller.actionName}.`;
      return callback(undefined, Response.badRequest({ error }));
    }
  
    return controller.action()
      .then(data => callback(undefined, Response.OK(data)))
      .catch(error => callback(undefined, Response.serverError(error)));
  } catch(e) {
    return callback(undefined, Response.serverError(e));
  }
}