const http = require('http');

http.createServer((request, response)=>{
    let body = [];
    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('cody', body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Hello World\n');
    });
}).listen(8088);

console.log(`server started.`);