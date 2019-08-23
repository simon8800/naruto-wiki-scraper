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
//       let attr = attributeMaker(th.innerText);
//       let value = td.innerText.trim();
//       results[attr] = value;
//     }
//   }
// }

// function attributeMaker(string) {
//   string = string.split(" ");
//   if (string.length === 1) return string[0].toLowerCase();
//   for (let i = 0; i < string.length; i++) {
//       if (i === 0) {
//           string[i] = string[i].toLowerCase();
//       } else {
//           string[i] = string[i][0].toUpperCase() + string[i].slice(1);
//       }
//   }
//   return string.join("");
// }

  // traverse each character link and grab all da data!
  // for (characterLink of characterLinks) {
  //   await page.goto(characterLink);
  //   const results = await getCharacterInfoFrom(page);
  //   new Character(results)
  // }
