var webCrawler = function(url) {
  // checks if the url is a correctly formatted string
  if (typeof url !== 'string') {
    throw new SyntaxError('The given URL must be a string! Please check the function arguments.');
  }
  url = url.toLowerCase();
  const regex = /^http[s]?:\/\//;
  if (!regex.test(url)) {
    throw new SyntaxError('Invalid URL. URLs must begin with either http:// OR https://');
  }

  // fetch current url
  var promise = fetch(url);
  // .then block to parse the URL
  promise.then(function(result) {
    // successful fetching of URL
    console.log('result inside .then(): ', result);
  }, function(error) {
    // unsuccessful fetching of URL
    console.log('result inside failure callback of .then(): ', error);

  });
};