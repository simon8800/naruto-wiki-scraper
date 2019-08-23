const puppeteer = require("puppeteer");
const fs = require("fs");

const charactersPageURL = `https://naruto.fandom.com/wiki/Category:Characters?from=`;

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

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const characterLinks = [];

  for (let letter of alphabets) {
    // go to characters page starting with current letter
    await page.goto(charactersPageURL + letter);
    
    // returns an array of character links
    const results = await grabCharacterLinksFromPage(page);

    // add all the links to total character links
    results.forEach(link => characterLinks.push(link));
  }
  let characterLinksJSON = JSON.stringify(characterLinks)
  fs.writeFileSync('characterLinks.json', characterLinksJSON);


  browser.close();
})();
