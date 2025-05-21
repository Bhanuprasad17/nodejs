const http = require('http')
const fs = require('fs')

const data = {
    name : 'Bhanu',
    role : 'developer',
    language : 'javascript'
}

const server = http.createServer((req,res)=>{
    // res.writeHead(200,{'content-type' : 'text/html'})
    if(req.url === '/'){
    // res.end('welcom to home page')
    // res.end(`
    //       <html>
    //           <head><title>Node Server</title></head>
    //           <body><h1>Hello from node.js</h1></body>
    //       </html>
    //     `)
    fs.readFile('./index.html',(err,data)=>{
        if(err){
             res.statusCode = 500;
            res.end('Error loading HTML');
        }else{
             res.setHeader('Content-Type', 'text/html');
             res.end(data);
        }
    })
  }
  else if(req.url === '/about'){
    res.end('about us page')
  }
  else{
    res.statusCode == 404
    res.end('page not found')
  }
})

server.listen(3000,()=>{
    console.log('server is running on port 3000')
})