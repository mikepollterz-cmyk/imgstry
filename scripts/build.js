const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Dummy compilation simulation
console.log('Compiling modules...');
const files = fs.readdirSync(srcDir);
files.forEach(f => {
  console.log('  Bundled: src/' + f);
});

console.log('Build completed successfully inside dist/ folder!');