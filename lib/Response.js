const Response = () => {};
const generate = (statusCode, body) => ({ statusCode, body });

Response.OK = Body => generate(200, Body);
Response.badRequest = error => generate(400, error);
Response.serverError = error => generate(500, error);

exports.Response = Response;