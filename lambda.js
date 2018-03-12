const { TwitterClient } = require('./lib/TwitterClient');
const { Response } = require('./lib/Response');
const helpers = require('./lib/helpers');
const config = require('./config');

exports.execute = (event, context, callback) => {
  const client = new TwitterClient(config.twitter);
  const param = helpers.getParam.bind(null, event);

  let query;
  const action = param('action');

  switch(action) {
    case 'search':
      query = client.search({
        q: param('q'),
        max_id: param('max_id'),
        count: param('count'),
        lang: param('lang'),
        geocode: param('geocode'),
        locale: param('locale')
      });
      break;

    case 'user_search':
      query = client.userSearch({
        q: param('q'),
        page: param('page'),
        count: param('count'),
        include_entities: false
      });
      break;

    case 'posts_by_user':
      query = client.getPostsByScreenName(param('user'));
      break;
    
    case 'posts_by_user_id':
      query = client.getPostsByUserId(param('id'));
      break;

    case 'tweet':
      query = client.getTweet(param('id'));
      break;
    
    default:
      const error = `invalid API action called: ${action}`;
      const response = JSON.stringify({ error });

      return callback(undefined, Response.badRequest(response));
  }

  return query.then(data => callback(undefined, Response.OK(data)))
    .catch(error => callback(undefined, Response.serverError(error)));
}