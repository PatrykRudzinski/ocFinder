const fs = require('fs');
const rimraf = require('rimraf');
const createHTML = require('create-html');

const dir = './demo';
const scriptName = 'script.js';


// clean ./demo directory content
const flush = () => {
  rimraf.sync(dir);
  fs.mkdirSync(dir);
};

// create index.html
const html = createHTML({
  title: 'demo',
  style: `
    <style type="text/css">
        body { margin: 0}
    </style>
  `,
  head: `
    <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
    <script src = "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
  `,
  body: `
    <div class="mfind-calculator" data-id="demo"></div>
    <div class="mfind-calculator" data-id="demo2"></div>
  `,
  script: scriptName,
});

flush();

// put index.html to ./demo
fs.writeFile(`${dir}/index.html`, html, function (err) {
  if (err) throw Error(err)
});

// copy script.js from build
fs.createReadStream(`./build/static/js/${scriptName}`).pipe(fs.createWriteStream(`./demo/${scriptName}`));
