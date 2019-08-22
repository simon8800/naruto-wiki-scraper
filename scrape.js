const puppeteer = require("puppeteer");

const characters = [];
const charactersPageURL = `https://naruto.fandom.com/wiki/Category:Characters?from=`;

function Character({name = null, summary = null, birthdate = null, sex = null, bloodType = null, occupation = null, affiliation = null, portrait = null}) {
  // this.firstName = firstName;
  // this.lastName = lastName;
  this.name = name
  this.summary = summary;
  this.birthdate = birthdate;
  this.sex = sex;
  this.bloodType = bloodType;
  this.occupation = occupation;
  this.affiliation = affiliation;
  this.portrait = portrait;

  characters.push(this);
}


async function grabCharacterLinksFromPage(page) {
  const results = await page.evaluate(() => {
    let ulTag = document.querySelector('#mw-content-text > div.category-page__members').querySelector('ul');
    let liTags = ulTag.children;
    let links = [];
    for (let li of liTags) {
      links.push(li.querySelector('a').href);
    }
    return links;
  })
  return results;
}

//  Getting info from each character page
async function getCharacterInfoFrom(page) {
  const results = await page.evaluate(() => {
    let name = document.querySelector('#PageHeader > div.page-header__main > h1').innerText;
    let summary = document.querySelector('#mw-content-text > p').innerText;
    // let tbody = document.querySelector('#mw-content-text > table.infobox.box.colored.bordered.innerbordered.fill-td.type-character.list-noicon.float-right-clear').querySelector('tbody');
    // for (let row of tbody.children) {
    //   if (row.querySelector('th')) {
    //     console.log(row.querySelector('th').innerText);
    //     }
    // }
    return {name, summary};
  })

  return results;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const alphabets = [..."A"];
  const characterLinks = [];

  for (let letter of alphabets) {
    // go to characters page starting with current letter
    await page.goto(charactersPageURL + letter);
    
    // returns an array of character links
    const results = await grabCharacterLinksFromPage(page);

    // add all the links to total character links
    results.forEach(link => characterLinks.push(link));
  }

  // traverse each character link and grab all da data!
  for (characterLink of characterLinks) {
    await page.goto(characterLink);
    const results = await getCharacterInfoFrom(page);
    new Character(results)
  }

  console.log(characters);

  browser.close();
})();

// let results = {};
// let name = document.querySelector('#PageHeader > div.page-header__main > h1').innerText;
// let summary = document.querySelector('#mw-content-text > p').innerText;
// results['name'] = name;
// results['summary'] = summary;
// let tbody = document.querySelector('#mw-content-text > table.infobox.box.colored.bordered.innerbordered.fill-td.type-character.list-noicon.float-right-clear').querySelector('tbody');
// for (let row of tbody.children) {
//   if (row.querySelector('th')) {
//     let th = row.querySelector('th')
//     if (row.querySelector('td')) {
//       td = row.querySelector('td');
//       let attr = th.innerText.toLowerCase();
//       let value = td.innerText;
//       results[attr] = value;
//     }
//   }
// }

// function attributeMaker(string) {
//   string = string.split(" ");
//   if (string.length === 1) return string.toLowerCase();
//   for (let i = 0; i < string.length; i++) {
//       if (i === 0) {
//           string[i] = string[i].toLowerCase();
//       } else {
//           string[i] = string[i][0].toUpperCase() + string[i].slice(1);
//       }
//   }
//   return string.join("");
// }