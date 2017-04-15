var fs = require('fs');
var cheerio = require('cheerio');

$ = cheerio.load(fs.readFileSync('index.html'));

describe("HTML title", function() {

  it("School Types", function() {
    expect($('head title').innerHTML.length).toBeGreaterThanOrEqual(0);
  });

});
