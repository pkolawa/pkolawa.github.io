const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0];
const todayISO = today + 'T00:00:00+02:00';

// Update sitemap.xml
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/<lastmod>.*<\/lastmod>/, `<lastmod>${today}</lastmod>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`sitemap.xml lastmod updated to ${today}`);

// Update dateModified in index.html ProfilePage JSON-LD
const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace(/"dateModified":\s*"[^"]*"/, `"dateModified": "${todayISO}"`);
fs.writeFileSync(indexPath, html);
console.log(`index.html dateModified updated to ${todayISO}`);
