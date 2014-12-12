var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/save', function (req, res) {
  console.log( req.body );
  res.send('{"status":"success"}');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
});