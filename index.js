const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (path === '/') {
    res.end('Welcome to homepage');
  } else if (path === '/users' && req.method == 'GET') {
    const username = query.username 
    const role = query.role 
    res.end(`${username} I'm not ${role}`);
  }
  else if(path === '/data' && req.method === 'POST'){

     let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
         res.end(JSON.stringify({ message: "Data received", data: JSON.parse(body) }));
    });
  }
  else {
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
