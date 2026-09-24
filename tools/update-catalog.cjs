// Keep the initial HTML catalog in sync with the interactive collection.
// Run after changing products in scripts/app.js: node tools/update-catalog.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'scripts/app.js'), 'utf8');
const match = script.match(/const products = (\[[\s\S]*?\n\s*\]);/);
if (!match) throw new Error('Could not locate the products array in scripts/app.js.');
const products = vm.runInNewContext('(' + match[1] + ')', {}, { timeout: 1000 });
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cards = products.map(product => {
  const split = product.name.lastIndexOf(' ');
  return `          <article class="product-card">
            <a class="product-trigger" href="#onde-comprar">
              <div class="product-image"><img src="images/products/${escape(product.image)}" alt="${escape(product.name)}" loading="lazy"></div>
              <div class="product-info"><small>${escape(product.label || product.category)}</small><h3>${escape(product.name.slice(0, split))} <em>${escape(product.name.slice(split + 1))}</em></h3><p>${escape(product.tagline)}</p></div>
            </a>
          </article>`;
}).join('\n');
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');
const start = '<!-- catalog:start -->';
const end = '<!-- catalog:end -->';
const catalog = `${start}\n        <div class="product-grid" id="product-grid">\n${cards}\n        </div>\n        ${end}`;
if (html.includes(start) && html.includes(end)) {
  html = html.slice(0, html.indexOf(start)) + catalog + html.slice(html.indexOf(end) + end.length);
} else {
  const empty = '<div class="product-grid" id="product-grid"></div>';
  if (!html.includes(empty)) throw new Error('Catalog markers or empty container not found.');
  html = html.replace(empty, catalog);
}
fs.writeFileSync(file, html);
console.log(`Updated ${products.length} products in the initial HTML.`);
