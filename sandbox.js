const fs = require("fs");

let characters = fs.readFileSync('characters.json', 'utf8');
characters = JSON.parse(characters);
console.log(characters[0], characters[characters.length-1]);