// server/appjs - communicates with the client (expressjs using app...) 
//   via req and res,  ===>>
//   and the MongoDB database (Mongoose?) with collection and db <<===

// mongodb needs to be defined before MongoClient and ObjectID, 
// so we can refer to mongodb.MongoClient and mongodb.ObjectID
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;  // ??? Why not "ObjectId" - with lowercase "d" ???

var bodyParser = require('body-parser');

// expressjs: listens for client requests on route /items and processes them
var express = require('express');
var app = express();

// DRY and easy to make change as declared
// ??? how do we know to use "docker:27017" ???
var CONNECTION_STRING = 'mongodb://docker:27017/todosdb';

// expressjs: serve static pages from the public dir
app.use(express.static('public'));

// expressjs: ??? not clear about this ???
app.use(bodyParser.urlencoded({ extended: true }));

// DRY - lines of code duplicated in 4 expressjs HTTP Request Methods
// accepts a callback function "cb", which, when called,  
// provides arguments database "db", from .connect and 
// and "collection" of the specified "db"
function connect_to_db (cb) {
  // establishes a connection to the MongoDB and returns any error message
  // and the database object "db" ("todosdb")
  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    if(err) {
      throw err;
    }

    // "collection" holds the "todos" collection from the 
    // "todosdb" database we defined directly in MongoDB
    var collection = db.collection('todos');

    // cb() calls the function argument, "cb", which is a callback function, 
    // and provides: 
    // -- the "db" argument from the .connect function 
    // (which will be used to close the database connection)
    // -- and the "collection" "todos" of the "db" "todosdb"
    cb( db, collection );

  });
}

/*
  LIST
  GET /items
 */

// expressjs: listens for GET request via todos.js on route /items
// "/" is part of the reg ex syntax, not a dir!
app.get('/items',function (req, res) {
  
  connect_to_db( function ( db, collection ) {
    // {} indicates deliberate selection of all docs in the "todos" collection
    collection.find({}).toArray(function (err, docs) {
      // close the database connection, to prevent runaway resource
      db.close();
      // send query result to, and close comms with todo.js
      res.send(docs);
    });
  });

});

/*
  CREATE
  POST /items
 */

// expressjs: listens for POST request via todos.js on route /items
// and saves list items to the database
app.post('/items',function (req, res) {
  
  connect_to_db( function ( db, collection ) {

    // 
    var new_todo_item_to_be_inserted = req.body.new_item;

    // 
    collection.insert( new_todo_item_to_be_inserted, function (err, docs) {
      db.close();
      // respond to todos.js with the doc id's
      res.send( docs[0]._id );
    });
  });

});

/*
  UPDATE completed status
  PUT /items/:id/:status
 */
app.put('/items/:id/:status',function (req, res) {
  
  connect_to_db( function ( db, collection ) {
    var todo_id = req.params.id;
    var todo_completed_status = req.params.status;

    // collection.update(criteria, objNew, options, [callback]);
    collection.update(
      { '_id' : new ObjectID(todo_id) },    // criteria
      {
        $set: {
          completed : todo_completed_status
        }
      },                                    // objNew
      {w:1},                                // options
      function(err) {                       // callback
        var success;
        if (err){
          success = false;
          console.warn(err.message);
        }else{
          success = true;
          console.log('successfully updated');
        }

        db.close();
        res.json( { success : success } );
      }
    );
  });

});

/*
  DESTROY
  DELETE /items/:id
 */
app.delete('/items/:id',function (req, res) {
  connect_to_db( function ( db, collection ) {
    var _id = req.params.id;
    collection.remove({"_id": new ObjectID( _id )}, function (err, result) {
      if( err ) throw err;
      
      db.close();
      res.json({ success : "success" });
    });
  });
});



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});