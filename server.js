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

app.get('/api/whoami', (req, res) => {
  var ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress;
  var lang = req.headers["accept-language"].split(',')[0];
  var software = req.headers['user-agent'].match(/\(([^()]*)\)/)[1];
  
  var json = { "ip": ip,
              "software": software,
              "lang": lang
             };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(json));
});


app.get('*', (req, res, next) => {
  var err = new Error();
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

  res.send(err.message || "Whoops! That page doesn't exist.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
