const fs = require("fs");
let characters = fs.readFileSync('characters.json', 'utf8');
characters = JSON.parse(characters);

let unwantedProps = [
  " [collapse] \nnatureType",
  " [expand] \njutsu", 
  " [expand] \ntools", 
  " [collapse] \nfamily",
  "age"
];

// use on occupation, affiliation, team, english, japanese, partner, ninjaRank, kekkeiGenkai, height, weight, age, tailed beasts
let listAttributes = [
  "occupation", 
  "affiliation", 
  "team", 
  "english", 
  "japanese", 
  "partner", 
  "ninjaRank", 
  "kekkeiGenkai", 
  "height", 
  "weight", 
  "age", 
  "tailedBeasts"
]

let listAttributeCleaner = (list) => {
  list = list.split("\n");
  return list;
}

let cleanCharacters = characters.map(character => {
  
  let cleanCharacter = {};

  for (let prop in character) {
    if (unwantedProps.includes(prop)) {
      continue;
    } else if (listAttributes.includes(prop)) {
      let list = listAttributeCleaner(character[prop])
      cleanCharacter[prop] = list;
    } else {
      cleanCharacter[prop] = character[prop];
    }
  }
  
  return cleanCharacter;
})

cleanCharacters = JSON.stringify(cleanCharacters);
fs.writeFileSync('cleanCharacters.json', cleanCharacters);