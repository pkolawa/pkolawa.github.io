const fs = require('fs');
const path = require('path');
const assert = require('assert');
const cheerio = require('cheerio');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const $ = cheerio.load(html);

describe('Head metadata', function () {
  it('has a non-empty title', function () {
    const title = $('head > title').text().trim();
    assert.ok(title.length > 0, 'Title element should contain text');
  });

  it('defines a viewport meta tag for responsive layout', function () {
    const viewport = $('meta[name="viewport"]').attr('content');
    assert.ok(
      viewport && viewport.includes('width=device-width'),
      'Viewport meta tag should include width=device-width'
    );
  });

  it('links to the compiled stylesheet', function () {
    const stylesheetHref = $('link[rel~="stylesheet"][href$="assets/css/main.css"]').attr('href');
    assert.strictEqual(
      stylesheetHref,
      './assets/css/main.css',
      'Expected stylesheet link to point to ./assets/css/main.css'
    );
  });
});

describe('Header content', function () {
  it('renders the main heading with the expected name', function () {
    const heading = $('header h1').text().trim();
    assert.strictEqual(heading, 'Piotr Kolawa');
  });

  it('renders the tagline beneath the name', function () {
    const tagline = $('header h2').text().trim();
    assert.strictEqual(tagline, "let's plot web together");
  });
});

describe('Intro section', function () {
  it('shows the hero image, subtitle, and call-to-action button', function () {
    const introSection = $('.section--intro');
    assert.ok(introSection.length, 'Introduction section should exist');

    assert.strictEqual(introSection.find('.intro__logo').length, 1, 'Expected a single hero image');

    const subtitle = introSection.find('.intro__subtitle').text().trim();
    assert.strictEqual(subtitle, "Let's plot web together");

    const buttonText = introSection.find('.intro__button').text().trim();
    assert.strictEqual(buttonText, "don't be shy, scroll");
  });
});

describe('Fields of activity section', function () {
  const overviewItems = $('.section--fields .field__overview-container');

  it('highlights exactly three fields', function () {
    assert.strictEqual(overviewItems.length, 3, 'Expected three field overview entries');
  });

  it('provides a description for each field', function () {
    overviewItems.each(function (_, entry) {
      const description = $(entry).find('.field__overview-description').text().trim();
      assert.ok(description.length > 0, 'Each field should include a description');
    });
  });
});

describe('Repositories section', function () {
  const repoItems = $('.section--lists .fieldDetails__list-element');

  it('lists seven repositories or projects', function () {
    assert.strictEqual(repoItems.length, 7, 'Expected seven repository entries');
  });

  it('includes a title and description for every entry', function () {
    repoItems.each(function (_, entry) {
      const title = $(entry).find('.fieldDetails__repo-name').text().trim();
      const description = $(entry).find('.fieldDetails__repo-desc').text().trim();
      assert.ok(title.length > 0, 'Repository entry should include a title');
      assert.ok(description.length > 0, 'Repository entry should include a description');
    });
  });

  it('links out to external resources when a call-to-action is provided', function () {
    const linkItems = repoItems.filter(function (_, entry) {
      return $(entry).find('.fieldDetails__repo-link').length > 0;
    });

    linkItems.each(function (_, entry) {
      const link = $(entry).find('.fieldDetails__repo-link');
      const href = link.attr('href');
      const target = link.attr('target');
      assert.ok(href && href.startsWith('https://'), 'Call-to-action links should point to external https URLs');
      assert.strictEqual(target, '_blank', 'Call-to-action links should open in a new tab');
    });
  });
});

describe('Footer', function () {
  it('credits Piotr Kolawa with an external link', function () {
    const footerText = $('footer p').text().trim();
    assert.ok(footerText.includes('Piotr Kolawa'), 'Footer paragraph should credit Piotr Kolawa');

    const footerLink = $('footer a[href="https://pkolawa.pl"]');
    assert.strictEqual(footerLink.length, 1, 'Expected footer link to point to https://pkolawa.pl');
  });
});
