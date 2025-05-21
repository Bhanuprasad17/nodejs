const http = require("http");
const url = require("url");

let server = http.createServer((req, res) => {
  // console.log(url.parse(req.url))

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  console.log(pathname);
  console.log(query);
  if (pathname === "/") {
    res.end("welcome to homepage");
  } else if (pathname === "/user" && req.method == "GET") {
    let name = query.name;
    let role = query.role;
    res.end(`Hello ${name}, your role is ${role}`);
  } else if (pathname === "/data" && req.method == "POST") {
    // res.end('post method')
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        // res.end(JSON.stringify(body))
         res.end(JSON.stringify({ message: "Data received", data: JSON.parse(body) }));
    });
    // res.end(JSON.stringify(body));
  } else {
    res.statusCode = 400;
    res.end("page not found");
  }
});

server.listen(3000, () => {
  console.log(`server is running on port ${3000}`);
});
