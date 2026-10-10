// Builds dist/light-fingers.html: the page body in the shape Claude Artifacts publishes
// (the artifact host supplies <!doctype>, <html>, <head> and <body> itself).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('..', import.meta.url));
const src = (await readFile(dir + 'index.html', 'utf8')).replace(/\r\n/g, '\n');
let body = src.split('\n').slice(5).join('\n'); // drop doctype, <html>, <head>, charset and viewport metas
for (const tag of ['</head>', '<body>', '</body>', '</html>']) body = body.replace(tag, '');
body = body.replace(':root {', ':root { color-scheme: dark;');
await mkdir(dir + 'dist', { recursive: true });
await writeFile(dir + 'dist/light-fingers.html', body);
console.log('Wrote dist/light-fingers.html');
