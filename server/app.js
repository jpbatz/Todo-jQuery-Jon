var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var CONNECTION_STRING = 'mongodb://localhost:27017/todosdb';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

function connect_to_db (cb) {
  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    if(err) {
      throw err;
    }
    var collection = db.collection('todos');

    cb( collection );
  });
}

app.post('/item', function (req, res) {

  connect_to_db( function ( collection ) {
    var new_todo_item_to_be_inserted = req.body.new_item;

    collection.insert( new_todo_item_to_be_inserted, function (err, obj) {
      
      console.log('err', err);
      console.log('obj', obj);
      res.send(obj);
    });
  });

  app.get('/items', function (req, res) {
    connect_to_db( function (collection) {

      collection.find({}).toArray(function(err, docs) {
        
      });
    });
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
});

function saveTodoList(content) {
  fs.writeFile('./public/todo_save.json', content, function (err) {
    if(err) {
      console.log('error');
    } else {
      console.log('successfully saved todo_save.json');
    }
  });
}
