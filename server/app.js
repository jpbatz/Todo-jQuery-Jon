var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/save', function (req, res) {
  saveTodoList(req.body.list);
  console.log( req.body );
  res.send('{"status":"success"}');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
});

function saveTodoList(content) {
  fs.writeFile('./public/todo_save.txt', content, function (err) {
    if(err) {
      console.log('error');
    } else {
      console.log('successfully saved todo_save.txt');
    }
  });
}
