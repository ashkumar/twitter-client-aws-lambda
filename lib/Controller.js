const { TwitterClient } = require('./TwitterClient');
const config = require('../config');

exports.Controller = class Controller {
  constructor(event) {
    this.client = new TwitterClient(config.twitter);
    this.event = event;
  }

  get actionName() {
    return this.get('action');
  }

  get action() {
    const method = `${this.actionName}Action`;
    if(typeof this[method] !== 'function') {
      return;
    }

    return this[method];
  }

  get(name) {
    const { queryStringParameters, body } = this.event;

    if(queryStringParameters && queryStringParameters.hasOwnProperty(name)) {
      return queryStringParameters[name];
    } else if(body) {
      return JSON.parse(body)[name];
    } else if(this.event.hasOwnProperty(name)) {
      return this.event[name];
    }
  }

  searchAction() {
    const payload = {
      q: this.get('q'),
      max_id: this.get('max_id'),
      count: this.get('count'),
      lang: this.get('lang'),
      geocode: this.get('geocode'),
      locale: this.get('locale')
    };

    return this.client.search(payload);
  }

  userSearchAction() {
    const payload = {
      q: this.get('q'),
      page: this.get('page'),
      count: this.get('count'),
      include_entities: false
    };

    return this.client.userSearch(payload);
  }

  postsByUserAction() {
    const user = this.get('screen_name');
    return this.client.getPostsByScreenName(user);
  }

  postsByUserIdAction() {
    const id = this.get('id');
    return thns.client.getPostsByUserId(id);
  }

  tweetAction() {
    const id = this.get('id');
    return this.client.getTweet(id);
  }
}

