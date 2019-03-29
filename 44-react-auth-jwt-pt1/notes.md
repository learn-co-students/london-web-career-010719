process:

- Don't forget to enable CORS in your app. Uncomment the following in config/initializers/cors.rb. Don't forget to change the origins from example.com to \*

- That means we are going to uncomment the `cors` gem.

- Depending on the use-case and needs of our API, we might want to limit access to our app. For example, if our React frontend is deployed to myDankReactApp.com, we might want to limit access to that domain only. If certain endpoints are meant to be public, we can make those available but limit to GET requests, for example.

- Please don't forget to change these settings before deploying your app to the internet. Please
