#!/usr/bin/env node

const util = require('util');
const bytes = require('bytes');
const exec = util.promisify(require('child_process').exec);

function generateSvg(size) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`svg: ${size}`);
    }, 300);
  });
}

exec('size-limit --json')
  .then(({ stdout }) => {
    // stdout example:
    //  [
    //    {
    //      "name": "index.js",
    //      "passed": true,
    //      "size": 851
    //    }
    //  ]

    const sizeInBytes = JSON.parse(stdout).reduce((a, b) => a.size + b.size);
    const size = bytes(sizeInBytes, { unitSeparator: ' ' });

    return generateSvg(size);
  })
  .then((svg) => {
    console.log(svg);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error.stack);

    process.exit(1);
  });
