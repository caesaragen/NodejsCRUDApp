const http = require("http"); // import the http module, so that we can create a web server
const file = require("fs"); // import the fs (file system) module so that we read and write data to files
const url = require("url"); // import the url module so we can parse the web address of the request into readable parts
// Import our routers
const get = require("./getStudents")
const post = require("./postStudents")
const put = require("./updateStudents")
// add an extra R since delete is a reserved word
const deleteR = require("./deleteStudents")
const getBody = require("./getBody")

const host = "localhost"; // address of the server; localhost means that the server is referring to itself and is not accessible from the internet
const port = 8000; // port most commonly used by webservers

// const server = http.createServer(processRequest);// create the server object
const querystring = require("querystring");
const data = file.readFileSync("./students.json");
let students = JSON.parse(data);


//create our server object, pass server function as callback argument
const server = http.createServer((request, response) => {
   response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    response.setHeader("Access-Control-Max-Age", 2592000);
  request.students = students;
  // handle request based on method then URL
  switch (request.method) {
    case "GET":
      getBody(request, response, get);
      break;
    case "POST":
      getBody(request, response, post);
      break;
    case "PUT":
        getBody(request, response, put);
      break;
    case "DELETE":
        getBody(request, response, deleteR);
      break;
    default:
      // Send response for requests with no other response
      response.statusCode = 400;
      response.write("No Response");
      response.end();
  }
})
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
