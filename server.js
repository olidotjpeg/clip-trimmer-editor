'use strict'

/**
 * Module dependencies.
 */
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');
const app = express();

// log requests
app.use(logger('dev'));

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

// if for some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET /style.css" instead of "GET /css/style.css":
app.use(express.static(path.join(__dirname, 'public', 'css')));

app.get('/clips', async (req, res) => {
    const clips = await getClipDirectory();

    return res.json(clips);
});

app.post('/trim', async (req, res) => {
    // Handle ffmpeg stuff here

    return res.json(req.body);
});

app.listen(3000);
console.log('listening on port 3000');


async function getClipDirectory() {
    const directoryPath = path.join(__dirname, 'public/clips');
    const prettyPath = directoryPath.replace(/\\/g, "/");
    let clips = [];
    const fileObjs = fs.readdirSync(directoryPath, { withFileTypes: true });
  
    console.log("\nCurrent directory files:");
    fileObjs.forEach(file => {
        console.log(file);
        clips.push({
            name: file.name,
            path: prettyPath
        });
    });

    return clips
}