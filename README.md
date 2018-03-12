# Twitter client proxy AWS lambda
This is a lambda which can be used to proxy requests to Twitter's API, using AWS Lambda.

[Live demo via AWS Gateway API endpoint](https://rkyfgerb90.execute-api.us-west-2.amazonaws.com/Public/TestClient?action=search&q=Bulgaria)

# Installation
Clone this repository and install the missing `npm` packages.

```[bash]
cd twitter-client-aws-lambda
npm install
```

# Deploying to AWS lambda
Before deploying, make sure that you have configured `config.js` and replaced the required API keys with yours.

In order to deploy the package, either use the `aws-cli` tool or zip the contents of the repository (`node_modules` included!) and upload them to AWS lambda using the user interface

# API Specs
Since this is a proxy service, it is going to need an AWS Gateway API endpoint to be generated for it eventually. The HTTP API, performs differently and accepts different parameters based on the `action` provided.

This lambda is made to handle data being sent in both *query strings* or *request body*, so you can use either **POST** or **GET** for your requests to the lambda.

### **?action**=search
This is your standard Tweet search, the API accepts the following parameters:

* `q` - search string
* `max_id` - used for pagination, the API will provide `search_metadata.next_max_id` in your search responses
* `count` - amount of results to be returned
* `geocode` - lonlat location with radius
* `locale` - origin user locale
* `lang` - search language

### **?action**=user_search
Search through the Twitter user accounts. Accepted parameters:

* `q` - search string
* `page` - search results page
* `count` - number of results returned per page

### **?action**=posts_by_user_id
Retrieves posts by User ID

* `id` - Twitter user id 

### **?action**=posts_by_user
Retrieves posts by User handle

* `user` - Twitter user to lookup

### **?action**=tweet
Retrieves a single tweet by ID

* `id` - Tweet ID