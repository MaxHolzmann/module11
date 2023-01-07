const express = require('express');
const notes = require('./db/db.json')
/* 

GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.

The following HTML routes should be created:

GET * should return the index.html file.

The following API routes should be created:

POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and the
n return the new note to the client. You'll need to find a way to give each note a unique id when it's saved 
(look into npm packages that could do this for you).

*/

const app = express();
const PORT = 3001;
const path = require('path');

app.use(express.static('public'));

app.get('/api/notes', (req, res) => res.json(notes))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);


