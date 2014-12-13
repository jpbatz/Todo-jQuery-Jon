var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Note the db name todosdb in the connection string
MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
  if (err) {
  throw err;
}

// Find the collection todos (or create it if it doesn't already exist)
var collection = db.collection('todos');

// Insert a document into the collection
collection.insert({
  index: 1,
  title: "Connect to MongoDB server",
  completed: true
}, function(err, arrayItem) {
  // Show the item that was just inserted; contains the _id field
  // Note that it is an array containing a single object
  console.log(arrayItem);

  // Log the number of items in the collection
  collection.count(function(err, count) {
    console.log("count = " + count);
  });

  // Locate all the entries using find
  collection.find().toArray(function(err, results) {
    console.log(results);

    // Close the db connection
    db.close();
  });
}); // End of function(err, docs) callback
});

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
