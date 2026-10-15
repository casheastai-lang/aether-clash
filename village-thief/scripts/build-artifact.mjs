// Builds dist/light-fingers.html: the page body in the shape Claude Artifacts publishes
// (the artifact host supplies <!doctype>, <html>, <head> and <body> itself).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('..', import.meta.url));
const src = (await readFile(dir + 'index.html', 'utf8')).replace(/\r\n/g, '\n');
let body = src.split('\n').slice(5).join('\n'); // drop doctype, <html>, <head>, charset and viewport metas
for (const tag of ['</head>', '<body>', '</body>', '</html>']) body = body.replace(tag, '');
body = body.replace(':root {', ':root { color-scheme: dark;');
// artifacts can't load outside scripts: inline the pyric bundle (build it first with npm run build:pyric)
const pyric = await readFile(dir + 'vendor/pyric.min.js', 'utf8');
if (/<\/script/i.test(pyric)) throw new Error('vendor/pyric.min.js contains </script and cannot be inlined');
body = body.replace('<script src="vendor/pyric.min.js"></script>', () => `<script>${pyric}</script>`);
await mkdir(dir + 'dist', { recursive: true });
await writeFile(dir + 'dist/light-fingers.html', body);
console.log('Wrote dist/light-fingers.html');
