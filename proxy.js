const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const target = parsedUrl.query.target;

  if (!target) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Please include a target URL as a query parameter, e.g., ?target=http://example.com');
    return;
  }

  try {
    // Proxy the request to the target URL
    proxy.web(req, res, { target });
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error proxying request: ' + err.message);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});QW