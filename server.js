const http = require("http"); // import the http module, so that we can create a web server
const file = require("fs"); // import the fs (file system) module so that we read and write data to files
const url = require("url"); // import the url module so we can parse the web address of the request into readable parts


const host = "localhost"; // address of the server; localhost means that the server is referring to itself and is not accessible from the internet
const port = 8000; // port most commonly used by webservers

// const server = http.createServer(processRequest);// create the server object
const querystring = require("querystring");
const data = file.readFileSync("./students.json");
let students = JSON.parse(data);
////////////////////////////////////////////////////////////////////
// The 'lastindex' variable is used as an auto-increment factor   //
// that will take the last project 'id' and increment plus one    //
////////////////////////////////////////////////////////////////////
let lastindex = students.length === 0 ? 0 : students[students.length - 1].id;
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Max-Age", 2592000);
  const urlparse = url.parse(req.url, true);

  if (urlparse.pathname == "/students" && req.method == "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students, null, 2));
  }
  if (urlparse.pathname == "/students/update" && req.method == "POST") {
        req.on('data', data => {
      const jsondata = JSON.parse(data);
      const fname = jsondata.fname;
      const lname = jsondata.lname;         
      const snum = jsondata.snum;          
      const agrade = jsondata.agrade;         
      const tgrade = jsondata.tgrade;
      const egrade = jsondata.egrade;
          
          
      if (fname || lname || snum || agrade || tgrade || egrade) {
        students.push({ fname, lname,snum,agrade,tgrade, egrade });
    
        file.writeFile('./students.json', JSON.stringify(students), (err) => {
          if (err) {
            const message = { message: 'could not persist data!' };
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(message, null, 2));
          } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(students, null, 2));
          }
        });
      } else {
        const message = { message: 'Check your data and try again!' };
    
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(message, null, 2));
      }
    });
  }
  if (urlparse.pathname == "/students/tasks" && req.method == "POST") {
    //TODO: POST logic
  }
  if (urlparse.pathname == "/students" && req.method == "PUT") {
    //TODO: PUT logic
  }
  if (urlparse.pathname == "/students" && req.method == "DELETE") {
    //TODO: DELETE logic
  }
});
server.listen(port, host, () => { // Bind the port and host to the server
  console.log("Server is running!");
});

// process a request received, prepare and send a response back to the client
function processRequest(request, response){
  const urlObject = url.parse(request.url, true); // parses the URL into readable parts
  console.log(urlObject);
}

// run the server: node server.js
// if you make a change to your server code, you must restart the server
