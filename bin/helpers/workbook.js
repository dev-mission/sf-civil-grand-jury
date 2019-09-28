'use strict';

const fetch = require('node-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const readline = require('readline');
const XLSX = require('xlsx');

function downloadWorkbook(url) {
  return new Promise(function(resolve, reject) {
    mkdirp.sync(path.resolve(__dirname, '../tmp'));
    const filename = path.resolve(__dirname, '../tmp/file.xlsx');
    const file = fs.createWriteStream(filename);
    fetch(url).then(function(response) {
      response.body.on('end', function() {
        resolve(filename);
      });
      response.body.pipe(file)
    });
  });
}

async function getSheet(filename, callback) {
  //// download file, if url
  if (filename.startsWith('http')) {
    console.log('Downloading workbook...');
    filename = await downloadWorkbook(filename);
  }

  //// read Excel workbook
  console.log('Parsing workbook...');
  const workbook = XLSX.readFile(filename);

  //// set up console input/output
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  //// enumerate all the sheets in the workbook
  console.log('Sheets:')
  let i = 1;
  for (let sheetName of workbook.SheetNames) {
    console.log(`${i}. ${sheetName}`);
    i += 1;
  }

  //// prompt user for sheet selection
  rl.question('Select a sheet to import: ', function(answer) {
    const i = parseInt(answer) - 1;
    callback(workbook.Sheets[workbook.SheetNames[i]]);
  });
}

module.exports.getSheet = getSheet;
