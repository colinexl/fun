import fs from 'fs';
import async from 'async';
import {search} from './search_helpers';

var readFileBuffer = function(filename, callback) {
  fs.readFile(filename, (err, data) => {
    if (err) {
      throw err;
    }
    callback(new Buffer(data));
  });
};

// process the input file, using first line as reference to how many inputs
// there are
var processInputFile = function(buffer) {
  const inputLines = buffer.toString().split('\n');
  const totalLines = parseInt(inputLines.shift(), 10);
  var processedInput = [];

  for (var i = 0; i < totalLines; ++i) {
    processedInput.push(inputLines[i]);
  }
  return processedInput;
};

// process the valid words file, also get rid of any empty lines
var processValidWords = function(buffer) {
  let validWords = buffer.toString().split('\n');

  // sanitize empty words
  for (var i = 0; i < validWords.length; ++i) {
    if (validWords[i] === '') {
      validWords.splice(i, 1);
      i--;
    }
  }

  return validWords;
};

var main = function(inputFile, validWordsFile) {
  let input;
  let validWords;

  async.parallel([(callback) => {
    readFileBuffer(inputFile, (buffer) => {
      input = processInputFile(buffer);
      callback(null, input);
    });
  }, (callback) => {
    readFileBuffer(validWordsFile, (buffer) => {
      validWords = processValidWords(buffer);
      callback(null, validWords);
    });
  }], (err, results) => {
    let foundWords;
    // now the fun begins
    foundWords = search(input, validWords, true);
    console.log(foundWords.join('\n').toString());
  });

};

main(process.argv[2], process.argv[3]);
