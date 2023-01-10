const express = require('express')
const notes = require('./db/db.json');
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = 3001;


const readAndAppend = (content) => {
  fs.readFile("db/db.json", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      content.id = uuidv4();
      parsedData.push(content);
      writeToFile("db/db.json", parsedData);
    }
  });
};

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));


app.get('/api/notes', (req, res) => res.json(notes))

app.post('/api/notes', (req, res) => {
  readAndAppend(req.body)
  res.send(200)
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  })

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);

/* 

  app.post('/api/tips', (req, res) => {
  console.info(`${req.method} request received to add a tip`);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newTip = {
      username,
      tip,
      topic,
      tip_id: uuid(),
    };

    readAndAppend(newTip, './db/tips.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

*/


