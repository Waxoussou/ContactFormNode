var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
let ejs = require('ejs');


const app = express();

// DB Config 
const URL = 'mongodb://localhost:27017';
const dbName = 'contacts'

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
// app.set('views', require ('./views'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/sentSucces', (req, res) => {
    res.render('sentSucces');
})

app.post('/', (req, res) => {
    const { name, lastname, email, phone, address, city, state, zip } = req.body;
    // connect to db
    MongoClient.connect(URL, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        // if (err) throw err;
        var db = client.db(dbName);
        console.log(`connected to MongoDB`);

        var doc = {
            name: req.body.name,
            lastname: req.body.lastname,
            mail: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        };

        db.collection("contacts").insertOne(doc, function (err, res) {
            assert.equal(err, null)
            console.log("Document inserted");
            // close the connection to db when you are done with it
            client.close();
        });
    });
    res.redirect('/sentSucces');

});

//     // makeNewCollection(db, function () {
//     insertNewDocs(db, () => {
//         // findDocuments(db, function () {
//         // })
//         client.close();
//     })
//     // })

// })

// // Create Collection 
// const makeNewCollection = function (db, cb) {
//     db.createCollection('contacts', (err, res) => {
//         if (err) throw err;
//         console.log('collection contacts created');
//     });
// }



// // Find method function
// const findDocuments = function (db, cb) {
//     // get the document collection
//     const collection = db.collection('contacts');

//     collection.findDocuments({}).toArray((err, docs) => {
//         assert.equal(err, null);
//         console.log(`FOund followings docs available : ${docs}`);
//         cb(docs);

//     })

// }

const PORT = 8787;

app.listen(PORT, (err, res) => {
    if ((err) => console.log(err));
    console.log(`Server runs on port ${PORT} `);

})
