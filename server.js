const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/greet') {
        const { name, age } = parsedUrl.query;

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello ${name}, you are ${age} years old!`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

server.listen(3000, () => {
    console.log('GET with query params server running on port 3000');
});
