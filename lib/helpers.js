exports.getParam = (event, name) => {
  if(event.queryStringParameters && event.queryStringParameters.hasOwnProperty(name)) {
    return event.queryStringParameters[name];
  } else if(event.body) {
    return JSON.parse(event.body)[name];
  } else if(event.hasOwnProperty(name)) {
    return event[name];
  }
}