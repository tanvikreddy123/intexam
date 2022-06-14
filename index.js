const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) {
        console.log("Error");
    }
    else {
        db = client.db("studb");
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/operations.html");
})


app.get("/stu", (req, res) => {
    db.collection("stu").find().toArray((err, items) => {
        if (err) { }
        res.send(items);
    })
});
app.post("/addstu", (req, res) => {
    db.collection("stu").insertOne({
        _id: req.body.id,
        name: req.body.name,
        age: req.body.age
    });
    console.log("inserted successfully");
    res.end();
});
app.put("/updatestu/:id", (req, res) => {
    db.collection("stu").updateOne({ "_id": req.params.id }, { $set: { name: req.body.name, age: req.body.age } });
    console.log("updated");
});
app.delete("/deletestu/:id", (req, res) => {

    db.collection("stu").deleteOne({ "_id": req.params.id });
    console.log("deleted");
})

app.get("/stu/:id", (req, res) => {
    db.collection("stu").find({ "_id": req.params.id }).toArray((err, item) => {
        if (err) { }
        console.log(item);
        res.send(item);
        res.end();
    })
});
app.listen("4000", () => console.log("server started"));