// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (Array.isArray(obj)) {
    // iterate through each array element
    // map through array with recursive call on each element
    let result = [];
    for (let i = 0; i < obj.length; i++) {
      // skip undefined or functions
      if (i === undefined || typeof i === 'function') {
        continue;
      }
      result.push(stringifyJSON(obj[i]));
    }
    // join mapped array
    return '[' + result.join(",") + ']';
  }

  if (Object.prototype.toString.call(obj) === '[object Object]') {
    let result = [];
    for (let key in obj) {
      // iterate through each obj key
      // skip undefined or functions
      if (obj[key] === undefined || typeof obj[key] === 'function') {
        continue;
      }
      // concatenate recursive call on the key, with recursive call on the value
      // push each concatenated string to result array
      result.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key]));
    }
    // join result array
    return '{' + result.join(",") + '}';
  }

  // surround strings with quotes
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  // skip undefined or functions
  if (obj === undefined || typeof obj === 'function') {
    return;
  }
  return obj + '';
};