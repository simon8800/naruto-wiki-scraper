const puppeteer = require("puppeteer");
const fs = require("fs");

// grab all links to characters
let characterLinks = fs.readFileSync("characterLinks.json", "utf8");
characterLinks = JSON.parse(characterLinks);

// bring characters in from current json file
let characters = fs.readFileSync('characters.json', 'utf8');
characters = JSON.parse(characters);

async function pageScraper(page) {
  let results = await page.evaluate(async () => {
  let obj = {};
  let name = document.querySelector("#PageHeader > div.page-header__main > h1").innerText;
  let summary = document.querySelector("#mw-content-text > p").innerText;
  obj['name'] = name;
  obj['summary'] = summary;
  let tbody = document.querySelector("#mw-content-text > table.infobox.box.colored.bordered.innerbordered.fill-td.type-character.list-noicon.float-right-clear").querySelector("tbody");
  for (let row of tbody.children) {
    if (row.querySelector("th")) {
      if (row.querySelector("td")) {
        let th = row.querySelector("th");
        let td = row.querySelector("td");
        let attr = await window.attributeMaker(th.innerText);
        let value = td.innerText.trim();
        obj[attr] = value;
      }
    }
  }
  return obj;
  })
  return results;
}

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.exposeFunction('attributeMaker', (text) => {
    text = text.split(" ");

    if (text.length === 1) return text[0].toLowerCase();

    for (let i = 0; i < text.length; i++) {
      if (i === 0) {
        text[i] = text[i].toLowerCase();
      } else {
        text[i] = text[i][0].toUpperCase() + text[i].slice(1);
      }
    }
    return text.join("");
  })

  for (let link of characterLinks) {
    await page.goto(link, {waitUntil: 'networkidle2'});
    let results = await pageScraper(page);
    characters.push(results);
    let json = JSON.stringify(characters);
    fs.writeFileSync('characters.json', json);
  }
  browser.close();
  let json = JSON.stringify(characters);
  fs.writeFileSync('characters.json', json);
}

scrape();