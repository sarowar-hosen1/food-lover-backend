const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oor8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

client.connect(err => {
    const welcomeCollection = client.db(`${process.env.DB_NAME}`).collection("welcome");
    const menuCollection = client.db(`${process.env.DB_NAME}`).collection("menu");
    const dishesCollection = client.db(`${process.env.DB_NAME}`).collection("dishes");
    const teamCollection = client.db(`${process.env.DB_NAME}`).collection("team")
    const feedBackCollection = client.db(`${process.env.DB_NAME}`).collection("review ")
    const serviceCollection = client.db(`${process.env.DB_NAME}`).collection("services ")
    const bookingCollection = client.db(`${process.env.DB_NAME}`).collection("booking")
    const adminCollection = client.db(`${process.env.DB_NAME}`).collection("admin")

    //admin 
    app.get('/admin', (req, res) => {
        adminCollection.find({})
        .toArray((err, admin) => {
            res.send(admin);
        })
    })

    //welcome collection
    app.get('/welcome', (req, res) => { 
        welcomeCollection.find({})
        .toArray((err, welcome) => {
            res.send(welcome)
        })
    })

    //get menu 
    app.get('/menu', (req, res) => {
        menuCollection.find({})
        .toArray((err, menu) => {
            res.send(menu)
        })
    })

    //get gallery
    app.get('/dishes', (req, res) => {
        dishesCollection.find({})
        .toArray((err, dishes) => {
            res.send(dishes)
        })
    })

    //get team
    app.get('/team', (req, res) => {
        teamCollection.find({})
        .toArray((err, team) => {
            res.send(team)
        })
    })

    //get review
    app.get('/review', (req, res) => {
        feedBackCollection.find({})
        .toArray((err,review) => {
            res.send(review)
        })
    })

    //get service
    app.get('/service', (req, res) => {
        serviceCollection.find({})
        .toArray((err,service) => {
            res.send(service)
        })
    })

    // post booking
    app.post('/booking', (req, res) => {
        const booking = req.body;
        bookingCollection.insertOne(booking)
        .then(result => {
            if (result.insertedCount > 0) {
                res.send(true)
            }
        })
    })

    //Get booking
    app.get('/booking-list', (req, res) => {
        bookingCollection.find({})
        .toArray((err,booking) => {
            res.send(booking)
        })
    })
                                

});
  

app.get("/", (req, res) => {
    res.send("Hello word!")
})

app.listen(port, () => console.log("listening on port 5000"))





