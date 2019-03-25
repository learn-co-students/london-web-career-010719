- Don't forget to enable CORS in your app. Un-comment the following in config/initializers/cors.rb. Don't forget to change the origins from example.com to \*

- That means we are going to un-comment the `cors` gem.

- Depending on the use-case and needs of our API, we might want to limit access to our app. For example, if our React frontend is deployed to myDankReactApp.com, we might want to limit access to that domain only. If certain endpoints are meant to be public, we can make those available but limit to GET requests, for example.

- Please don't forget to change these settings before deploying your app to the internet. Please

- ENV
- .bashrc
- `export VAR=some_string`
- `echo $VAR`
