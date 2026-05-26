import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const dir = dirname(fileURLToPath(import.meta.url));
const buildPath = join(dir, 'build-index-final.mjs');
let src = readFileSync(buildPath, 'utf8');
src = src.replace(/const out = html[\s\S]*?;\nwriteFileSync/, "const out = html.split('motion.div').join('div');\nwriteFileSync");
writeFileSync(buildPath, src);
execSync(`node "${buildPath}"`, { stdio: 'inherit' });
const html = readFileSync(join(dir, '..', 'index.html'), 'utf8');
console.log('motion tags:', (html.match(/motion\.div/g) || []).length);
console.log('home-bg:', html.includes('home-bg'));
console.log('sim before contatti:', html.indexOf('risparmio') < html.indexOf('id="contatti"'));
