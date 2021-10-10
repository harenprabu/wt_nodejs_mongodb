var http = require('http');
var url = require('url');
var querystring = require('querystring');
var http = require('http');
var module = require("dbmodule");


http.createServer(function(request, response) {
var data1 ='';
if (request.url === '/favicon.ico') {
response.writeHead(200, { 'Content-Type': 'image/x-icon' });
response.end();
    }
    
 else 
 {console.log("hai");
request.on('data', function(chunk) {
            data1 += chunk;
           console.log(data1);
  });


request.on('end', function() {
var name = querystring.parse(data1)["stname"];
console.log(name);
var roll = querystring.parse(data1)["roll"];
console.log(roll);
var avg = querystring.parse(data1)["avg"];
console.log(avg);



if (request.url === '/login') 
{
    dbmodule.authenticateUser(name, roll, avg, response);
} 
else if (request.url === '/save') 
{
    dbmodule.saveUser(name, roll, avg,  response);
}
else if (request.url === '/update') 
{
   dbmodule.update(name, roll, avg,  response);
}
else if (request.url === '/del') 
{
   dbmodule.del(name, response);
} 
else 
{
console.log("Invalid url ");
}
            //console.log(name+" "+email);
            //module.authenticateUser(name,email,response); 
            //module.saveUser(name,email);
        });
    }
}).listen(3000);
console.log("Server started");
