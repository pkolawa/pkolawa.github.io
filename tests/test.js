var fs = require('fs');
var cheerio = require('cheerio');

$ = cheerio.load(fs.readFileSync('./index.html'));

describe("HTML elements", function() {

  it("Title entity", function() {
    expect($('head title').html().length).toBeGreaterThan(0);
  });

});

describe("All elements", function(){

	
});
