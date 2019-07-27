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


};