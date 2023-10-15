// Create mocha tests for static HTML website
// Run mocha from command line with:
// $ mocha test/test.js

var assert = require('assert');

describe('Test', function() {
    // Create case that checks whether h1 is set to "Piotr Kolawa"
    it('h1 is set to "Piotr Kolawa"', function() {
        assert.equal(document.getElementsByTagName('h1')[0].innerHTML, 'Piotr Kolawa');
    });
    // Check whether section "About me is present"
    it('section "About me is present"', function() {
        assert.equal(document.getElementsByTagName('section')[0].innerHTML, 'About me');
    });
    // Check if #footerCopyrightsParagraph containst year equal to current year
    it('#footerCopyrightsParagraph containst year equal to current year', function() {
        assert.equal(document.getElementById('footerCopyrightsParagraph').innerHTML, 'Copyrights © ' + new Date().getFullYear() + ' - <a href="https://pkolawa.pl">Piotr Kolawa</a>');
    });
}