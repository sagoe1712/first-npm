const http = require('http');
const fs = require('fs');

const rqListener = (req, res) => {
// console.log(req);
// console.log(req.url,req.method,req.headers);
// process.exit();

const url = req.url;
const method = req.method;
if(url === '/'){
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>My First Node JS response</title></head>');
res.write('<body>');
res.write('Welcome to Node JS class');
res.write('</body>');
res.write('</html>');
return res.end();
}
if(url === '/login' && method === 'GET'){
    res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>My First Node Response Form</title></head>');
res.write('<body>');
res.write('<form action="/login" method="post">');
res.write('username <input type="text" name="username"/>');
res.write('<br/>');
res.write('Password <input type="password" name="password"/>');
res.write('<br/>');
res.write('<button type="submit">Login</button>');
res.write('</form>');
res.write('</body>');
res.write('</html>');
return res.end();
}
if(url === '/dashboard'){
    res.write('<html>');
res.write('<head><title>Dashbord Yinka</title></head>');
res.write('<body>');
res.write('Hello ');
res.write('</body>');
res.write('</html>');
return res.end();

}
if(url === '/login' && method === 'POST'){
    const body = [];
    req.on('data', (chunk) => {
            body.push(chunk);
    });
    return req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        const username1 = parsedBody.split('=')[1];
        const username = username1.split('&')[0];
        const password = parsedBody.split('password=')[1];


        if(username === 'yinka' && password === 'pass'){
            fs.writeFileSync('yinka.txt', 'hello '+username+', Your login was successful')
            res.statusCode = 302;
            res.setHeader('location', 'dashboard');
            return res.end();
        }else{
            res.statusCode = 401;
            res.setHeader('location', 'login');
            return res.end();
        }

    })
}
}

const server = http.createServer(rqListener);

server.listen(3000);