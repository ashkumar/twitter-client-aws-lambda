const { Twitter } = require('twitter-node-client');

const ENDPOINTS = {
  USERS_SEARCH: '/users/search.json',
};

exports.TwitterClient = class TwitterClient {
  constructor(config) {
    this.config = config;
    this.client = new Twitter(this.config);
  }

  getPostsByScreenName(screen_name, count = 10) {
    return new Promise((resolve, reject) =>
      this.client.getUserTimeline({ screen_name, count }, reject, resolve)
    );
  }

  getPostsByUserId(user_id, count = 10) {
    return new Promise((resolve, reject) =>
      this.client.getUserTimeline({ user_id, count }, reject, resolve)
    );
  }

  getTweet(id) {
    return new Promise((resolve, reject) =>
      this.client.getTweet({ id }, reject, resolve)
    );
  }

  userSearch(payload) {
    return new Promise((resolve, reject) =>
      this.client.getCustomApiCall(ENDPOINTS.USERS_SEARCH, payload, reject, resolve)
    );
  }

  search(payload) {
    return new Promise((resolve, reject) =>
      this.client.getSearch(payload, reject, data =>
        resolve(this.appendNextIdToSearchMetadata(data))
      )
    );
  }

  /*
  * This method tries to append a property to the search_metadata provided by
  * Twitter, by parsing the search_metadata.next_results and appending a
  * next_max_id property to the response
  * 
  * This is used only when searching Tweets
  */
  appendNextIdToSearchMetadata(data) {
    data = JSON.parse(data);
        
    try {
      const { next_results } = data.search_metadata;
      const index = next_results.indexOf('max_id=');
      if(index !== -1) {
        data.search_metadata.next_max_id = Number(next_results.substr(index + 7).split('&')[0]);
      }
    } catch(e) { }

    return JSON.stringify(data);
  }
}