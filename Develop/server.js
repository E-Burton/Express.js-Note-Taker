// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
// const noteDatabase = require("./db/db.json");
const generateUniqueID = require("generate-unique-id");
const { response } = require("express");

// Seting up Express App

const app = express();
const PORT = 3000;

// Setting up Express App to handle data parsing

app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use(express.static("public"));

// Routes

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname + "/public", "notes.html")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname + "/public", "index.html")));

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) throw err;
        res.json(data);
    })
});

app.post("/api/notes", (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: generateUniqueID(),
    };
    // console.log(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) => {
        if (err) throw errr;
    });
})

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));