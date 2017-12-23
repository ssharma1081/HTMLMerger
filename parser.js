const fs = require('fs')

const readFile = fileName =>
  new Promise((resolve, reject) =>
    fs.readFile(fileName, 'UTF-8', (err, data) =>
      err
        ? reject(err)
        : resolve(data)))

const writeFile = data =>
  new Promise((resolve, reject) =>
    fs.writeFile('mergedFile.html', data, err =>
      err
        ? reject(err)
        : resolve('File write successful')))

const fetchBody = data =>
  data.substring(data.indexOf('<body>') + 6, data.indexOf('</body>'))

const mergeFiles = listOfFiles =>
  Promise.all(listOfFiles.map(readFile))
    .then(data => data.map(fetchBody))
    .then(bodies => bodies.reduce((acc, current) => acc + current, ''))
    .then(appendedBodies => `<html><head><meta charset="utf-8" /></head><body>${ appendedBodies }</body></html>`)
    .then(writeFile)
    .catch(console.log)

const app = () => mergeFiles(process.argv.filter((fileName, index) => index >= 2))

app()
