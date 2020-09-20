var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    // if path is home then set path name to index instead of q.pathname
    var pathname = q.pathname === "/" ? "index" : q.pathname;
    var filename = "./html/" + pathname;
    // return requested file back to browser
    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      // respond with data held in file
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
