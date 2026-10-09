import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = new Map([
  ['/forex/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/forex/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/forex/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/forex/engine.mjs', ['engine.mjs', 'text/javascript; charset=utf-8']],
]);
const port = Number(process.argv[2] || process.env.PORT || 8080);
const server = createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  if (['/', '/forex', '/forex/'].includes(path)) { response.writeHead(302, { Location: '/forex/index.html' }); response.end(); return; }
  const file = files.get(path);
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const data = await readFile(new URL(`../public/forex/${file[0]}`, import.meta.url));
    response.writeHead(200, { 'Content-Type': file[1], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); response.end(data);
  } catch { response.writeHead(500); response.end('Unable to load game file'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Pip is ready: http://localhost:${port}/forex/index.html`));
