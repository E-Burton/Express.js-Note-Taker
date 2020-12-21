// Load Data

const noteDatabase = require("../db/db.json");
const fs = require("fs");
const generateUniqueID = require("generate-unique-id");

// Routing

module.exports = (app) => {
    app.get("/api/notes", (req, res) => res.json(noteDatabase));

     app.post("/api/notes", (req, res) => {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: generateUniqueID(),
        };
        noteDatabase.push(newNote);
        res.end();
    });
};
