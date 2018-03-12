exports.Response = {
  OK: body => response(200, body),
  badRequest: error => response(400, error),
  serverError: error => response(500, error),
};

function response(statusCode, body) {
  if(typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  return { statusCode, body };
};