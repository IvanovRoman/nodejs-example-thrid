var http = require("http");
var fs = require("fs");
//create a server object:
http
  .createServer((req, res) => {
    getTitles(res);
  })
  .listen(8080, "127.0.0.1"); //the server object listens on port 8080

function getTitles(res) {
  fs.readFile("./src/titles.json", (err, data) => {
    if (err) {
      hadError(err, res);
    } else {
      getTemplate(JSON.parse(data.toString()), res);
    }
  });
}

function getTemplate(titles, res) {
  fs.readFile("src/index.html", (err, data) => {
    if (err) {
      hadError(err, res);
    } else {
      formatHtml(titles, data.toString(), res);
    }
  });
}

function formatHtml(titles, tmpl, res) {
  const html = tmpl.replace("%", titles.join("<li></li>"));
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function hadError(err, res) {
  console.error(err);
  res.end("Server Error");
}
