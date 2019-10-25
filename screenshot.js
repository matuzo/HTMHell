const puppeteer = require('puppeteer');
var fs = require('fs');
var fm = require('front-matter');
const slugify = require("slugify");

const takeScreenshot = async (path) => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`http://localhost:8080/${path}`);
  
  await page.$$eval('body', html => {
    html[0].setAttribute('class', 'screenshot')
  });

  await page.setViewport({
    width: 1200,
    height: 600
  });

  await page.screenshot({path: `./hell/images/og/${path}.png`});
  await browser.close();
}

const folder = './hell/entries/';

// Loop through all the files
fs.readdir(folder, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach(function (file, index) {
    if (file.indexOf('.md') > -1) {
      console.log(folder+file)

      fs.readFile(folder+file, 'utf8', function(err, data){
        if (err) throw err
       
        var content = fm(data)      
        takeScreenshot(slugify(content.attributes.title))
      })
    }
  });
});
