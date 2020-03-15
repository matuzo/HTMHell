const settings = {
  port: 8080,
  screenShotWidth: 1300
}
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
var fm = require('front-matter');
const slugify = require("slugify");
const folder = './hell/entries/';

slugify.extend({'<': '', '>': ''})

const readDir = async folder => {
  return await fs.readdir(folder);
}

const readFile = async path => {
  return await fs.readFile(path, 'utf8')
}

const takeScreenshot = async (attributes) => {
  let title = attributes.title;

  if (attributes.seo_title) {
    title = attributes.seo_title
  }

  const path = slugify(title, {
    lower: true
  })

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  console.log('Opening browser')
  const page = await browser.newPage();

  await page.setViewport({
    width: settings.screenShotWidth,
    height: settings.screenShotWidth / 2
  });
  
  await page.goto(`http://localhost:${settings.port}/${path}`);
  console.log(`Opening http://localhost:${settings.port}/${path}`)

  await page.$eval('html', html => {
    html.classList.add('class', 'screenshot')
  });

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.screenshot({path: `./hell/images/og/${path}.png`})
  ])

  await browser.close();
  console.log('Closing browser')

  return browser;
}

readDir(folder).then( async (files) => {
  console.log('Reading dir')

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.indexOf('.md') > -1) {
      console.log(`Processing ${folder+file}`)

      const fileContent = await readFile(folder+file)
      var content = fm(fileContent)  
 
      await takeScreenshot(content.attributes).catch(err => {
        console.log(err)
      })
    }
  }

  console.log('End reading dir')
});
