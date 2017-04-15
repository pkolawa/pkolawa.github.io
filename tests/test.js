var fs = require('fs');
var cheerio = require('cheerio');

$ = cheerio.load(fs.readFileSync('./index.html'));

describe("HTML title", function() {

  it("Title entity", function() {
    expect($('head title').html().length).toBeGreaterThan(0);
  });

  it("Checking images", function(){
	//   expect($('img').attribs.src).toBeDefined();
  });

});
