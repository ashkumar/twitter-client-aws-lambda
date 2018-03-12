const { Twitter } = require('twitter-node-client');
const config = require('../config/app');

exports.TwitterClient = class TwitterClient {
  constructor() {
    this.config = config.twitter;
    this.client = new Twitter(this.config);
  }

  getPosts(screen_name, count = 10) {
    return new Promise((resolve, reject) =>
      this.client.getUserTimeline({ screen_name, count }, reject, resolve)
    );
  }

  getTweet(id) {
    return new Promise((resolve, reject) =>
      this.client.getTweet({ id }, reject, resolve)
    );
  }

  search(q, count = 10, result_type = 'popular') {
    return new Promise((resolve, reject) => {
      this.client.getSearch({ q, count, result_type }, reject, resolve)
    });
  }
}