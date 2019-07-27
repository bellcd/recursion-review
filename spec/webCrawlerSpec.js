describe('webCrawler', function() {
  // it('Accepts a url to begin the crawl', function() {

  // });

  // it('Outputs a list of the URLs of crawled pages for a valid starting URL', function() {
  //   validURLs.forEach(function(test) {
  //     var result = webCrawler(test);
  //     expect(result).to.be.an('array').of('string');
  //   });

  // });

  it('Throws an error if the starting URL is incorrectly formatted', function() {
    invalidURLs.forEach(function(test) {
      var fn = function() {
        webCrawler(test);
      };
      expect(fn).to.throw(SyntaxError);
    });
  });
});