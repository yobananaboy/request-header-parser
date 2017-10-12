// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

/*app.get("/dreams", function (request, response) {
  response.send(dreams);
});*/

app.get('/api/whoami', (req, res) => {
  var ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress;
  var lang = req.headers["accept-language"].split(',')[0];
  var software = req.headers['user-agent'].match(/\(([^()]*)\)/)[1];
  
  var json = { ip: ip, lang: lang, software: software };
  
  res.send(JSON.stringify(json));
});

/*
// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];
*/
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
