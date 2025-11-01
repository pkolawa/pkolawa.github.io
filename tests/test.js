const fs = require('fs');
const path = require('path');
const { strict: assert } = require('assert');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

describe('Head metadata', function () {
  it('defines a non-empty title', function () {
    const title = $('head > title').text().trim();
    assert.ok(title.length > 0, 'Title should contain text');
  });

  it('exposes core meta tags', function () {
    const charset = $('meta[charset]').attr('charset');
    const description = $('meta[name="description"]').attr('content');
    const keywords = $('meta[name="keywords"]').attr('content');

    assert.strictEqual(charset, 'UTF-8');
    assert.ok(description && description.length > 0, 'Description meta tag should be present');
    assert.ok(keywords && keywords.includes('engineering manager'), 'Keywords meta tag should highlight engineering expertise');
  });

  it('contains Open Graph information with a valid image URL', function () {
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogUrl = $('meta[property="og:url"]').attr('content');

    assert.ok(ogImage && ogImage.startsWith('https://'), 'OG image URL should be absolute https URL');
    assert.ok(ogUrl && ogUrl.startsWith('https://'), 'OG URL should be absolute https URL');
  });

  it('links to favicon and main stylesheet', function () {
    const iconHref = $('link[rel~="icon"]').attr('href');
    const stylesheetHref = $('link[rel~="stylesheet"]').attr('href');

    assert.strictEqual(iconHref, './favicon.ico');
    assert.strictEqual(stylesheetHref, './assets/css/main.css');
  });
});

describe('Page structure', function () {
  it('contains header, main, and footer sections', function () {
    assert.ok($('header').length === 1, 'Expected a header element');
    assert.ok($('main').length === 1, 'Expected a main element');
    assert.ok($('footer').length === 1, 'Expected a footer element');
  });

  it('renders all top-level sections inside the main element', function () {
    const main = $('main');
    assert.strictEqual(main.find('section.section--intro').length, 1, 'Expected a single intro section');
    assert.strictEqual(main.find('section.section--fields').length, 3, 'Expected three field-focused sections');
    assert.strictEqual(main.find('section.section--lists').length, 1, 'Expected a repositories section');
  });
});

describe('Header content', function () {
  it('introduces Piotr Kolawa and the tagline', function () {
    const header = $('header');
    const name = header.find('h1').text().trim();
    const tagline = header.find('h2').text().trim();

    assert.strictEqual(name, 'Piotr Kolawa');
    assert.strictEqual(tagline, 'Engineering leadership for product-focused teams');
  });
});

describe('Intro section', function () {
  it('displays hero image, subtitle, and CTA button', function () {
    const intro = $('.section--intro');

    assert.strictEqual(intro.find('.intro__logo').length, 1, 'Hero image should exist');
    assert.strictEqual(
      intro.find('.intro__subtitle').text().trim(),
      'Engineering manager and developer building resilient digital products.'
    );
    assert.strictEqual(intro.find('.intro__button').text().trim(), 'Scroll to explore');
  });
});

describe('How I help teams section', function () {
  const helpSection = $('.section--fields').eq(0);
  const helpItems = helpSection.find('.field__overview-container');

  it('highlights three ways of supporting teams', function () {
    assert.strictEqual(helpItems.length, 3, 'Expected three help cards');
  });

  it('names the leadership and consulting offerings', function () {
    const titles = helpItems
      .map((_, item) => $(item).find('.field__overview-name').text().trim())
      .get();

    assert.deepStrictEqual(
      titles,
      ['Engineering Manager', 'Experienced Developer', 'No-code consultant'],
      'Unexpected help section titles'
    );
  });

  it('describes each service area', function () {
    helpItems.each(function (_, item) {
      const description = $(item).find('.field__overview-description').text().trim();
      assert.ok(description.length > 0, 'Each help card should explain the offering');
    });
  });
});

describe('Core expertise section', function () {
  const expertiseSection = $('.section--fields').eq(1);
  const expertiseItems = expertiseSection.find('.field__overview-container');

  it('lists technical expertise areas', function () {
    const titles = expertiseItems
      .map((_, item) => $(item).find('.field__overview-name').text().trim())
      .get();

    assert.deepStrictEqual(
      titles,
      ['JavaScript & Python', 'Agile & Scrum', 'Front-end craft', 'Cloud environments'],
      'Unexpected expertise titles'
    );
  });

  it('provides context for each expertise area', function () {
    expertiseItems.each(function (_, item) {
      const description = $(item).find('.field__overview-description').text().trim();
      assert.ok(description.length > 0, 'Expertise cards should include descriptions');
    });
  });
});

describe('Connect with me section', function () {
  const connectSection = $('.section--fields').eq(2);
  const connectItems = connectSection.find('.field__overview-container');

  it('promotes four external profiles', function () {
    assert.strictEqual(connectItems.length, 4, 'Expected four connect cards');
  });

  it('links to Medium, LinkedIn, GitHub, and Stack Overflow', function () {
    const titles = connectItems
      .map((_, item) => $(item).find('.field__overview-name').text().trim())
      .get();

    assert.deepStrictEqual(titles, ['Medium', 'LinkedIn', 'GitHub', 'Stack Overflow']);
  });

  it('ensures each call-to-action opens in a new tab', function () {
    connectItems.each(function (_, item) {
      const link = $(item).find('.fieldDetails__repo-link');
      assert.strictEqual(link.attr('target'), '_blank');
      assert.ok(link.attr('href').startsWith('https://'), 'Connect links should be https URLs');
      assert.strictEqual(link.attr('rel'), 'noopener noreferrer', 'Connect links should prevent opener leaks');
    });
  });
});

describe('Repositories section', function () {
  const repoSection = $('.section--lists');
  const repoItems = repoSection.find('.fieldDetails__list-element');

  it('announces the repositories section title', function () {
    const title = repoSection.find('.section__title').text().trim();
    assert.strictEqual(title, 'Open-source highlights');
  });

  it('lists seven repository cards', function () {
    assert.strictEqual(repoItems.length, 7, 'Expected seven repository entries');
  });

  it('provides a name, description, and thumbnail for each entry', function () {
    repoItems.each(function (_, item) {
      const name = $(item).find('.fieldDetails__repo-name').text().trim();
      const description = $(item).find('.fieldDetails__repo-desc').text().trim();
      const thumb = $(item).find('.fieldDetails__repo-thumbnail').attr('src');

      assert.ok(name.length > 0, 'Repository card should have a name');
      assert.ok(description.length > 0, 'Repository card should have a description');
      assert.ok(thumb && thumb.length > 0, 'Repository card should have a thumbnail image');
    });
  });

  it('opens external calls-to-action in a new tab', function () {
    const externalLinks = repoItems.find('.fieldDetails__repo-link');
    externalLinks.each(function (_, link) {
      const href = $(link).attr('href');
      const target = $(link).attr('target');
      assert.ok(href && href.startsWith('https://'), 'Call-to-action link should point to https resource');
      assert.strictEqual(target, '_blank', 'Call-to-action link should open in a new tab');
    });
  });
});

describe('Footer', function () {
  it('credits Piotr Kolawa with a link to his site', function () {
    const footerText = $('footer p').text().trim();
    const footerLink = $('footer a[href="https://pkolawa.pl"]');

    assert.ok(footerText.includes('Piotr Kolawa'), 'Footer should mention Piotr Kolawa');
    assert.strictEqual(footerLink.length, 1, 'Footer should link to https://pkolawa.pl');
  });
});
