// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  debugger;
  var parseObj = function (objJSON) {
    if (objJSON === '{}') {
      return {};
    }
    let result = {};
    let firstColonIndex;
    let key;
    let value;
    let position;
    let arrayCount = 0;
    let objCount = 0;
    // make copy of objJSON
    let objJSONCopy = objJSON.slice();
    // remove the front and back {}
    objJSONCopy = objJSONCopy.slice(1, -1);
    // trim whitespace
    objJSONCopy = objJSONCopy.trim();
    // while objJSONCopy length is greater than 0
    while (objJSONCopy.length > 0) {
      // find the position of the first colon
      firstColonIndex = objJSONCopy.indexOf(':');
      // recursive call on all characters before the first colon (trimmed first), save as key
      key = parseJSON(objJSONCopy.slice(0, firstColonIndex).trim());
      // remove all characters up to and including the colon
      objJSONCopy = objJSONCopy.slice(firstColonIndex + 1);
      // trim the string
      objJSONCopy = objJSONCopy.trim();
      // if double quotes next (ie, value is a string)
      if (objJSONCopy[0] === '"') {
        // find position of the first comma after the next non escaped double quotes
        do {
          position = objJSONCopy.indexOf('"', 1);
        } while (objJSONCopy[position - 1] === '\\');
        // position is currently the last quote of the string, so increment to the next character (the comma)
        position = position + 1;
      } else if (objJSONCopy[0] === '[') {
        // value is an arr
        ++arrayCount;
        position = 1;
        do {
          switch (objJSONCopy[position]) {
          case '[':
            ++arrayCount;
            break;
          case '{':
            ++objCount;
            break;
          case ']':
            --arrayCount;
            break;
          case '}':
            --objCount;
            break;
          }
          ++position;
        } while ((arrayCount > 0 || objCount > 0 ) && position < objJSONCopy.length);
        // position is at the closing array bracket, so the next char should be comma or end of string
        ++position;
      } else if (objJSONCopy[0] === '{') {
        // value is an obj
        ++objCount;
        position = 1;
        do {
          switch (objJSONCopy[position]) {
          case '[':
            ++arrayCount;
            break;
          case '{':
            ++objCount;
            break;
          case ']':
            --arrayCount;
            break;
          case '}':
            --objCount;
            break;
          }
          ++position;
        } while ((arrayCount > 0 || objCount > 0 ) && position < objJSONCopy.length);
        // position is at the closing obj bracket, so the next char should be comma or end of string
        ++position;
      } else {
        // else find the position of the next comma
        position = objJSONCopy.indexOf(',');
        if (position === -1) {
          // this is the last key:value pair, so set position to the str length
          position = objJSONCopy.length;
        }
      }
      // set value to the result of a recursive call on the next value portion 
      value = parseJSON(objJSONCopy.slice(0, position));
      // remove everything in the string up to and including position
      objJSONCopy = objJSONCopy.slice(position + 1);

      // add the key:value pair to the result object
      result[key] = value;
    }
    
    return result;
  };

  var parseArr = function (arrJSON) {
    if (arrJSON === '[]') {
      return [];
    }
    // make copy and remove square brackets from beginning and end
    arrJSON = arrJSON.slice(1, -1);
    
    // split string on commas to create an actual array
    const arrOfValues = arrJSON.split(',');
    // return reduction of recursive calls through array
    return arrOfValues.reduce((acc, currentValue) => {
      // trim the currentValue
      currentValue = currentValue.trim();
      // push each cb return value onto accumulator array
      acc.push(parseJSON(currentValue));
      return acc;
    }, []);
    
  };
  
  var parseNum = function (numJSON) {
    return Number.parseFloat(numJSON);
  };
  
  var parseStr = function (strJSON) {
    return strJSON.slice(1, -1);
  };

  var parseBoolean = function (strJSON) {
    return strJSON === 'true' ? true : false;
  };

  var parseNull = function (strJSON) {
    return null;
  };

  debugger;
  if (json.length === 0) {
    // empty string
    return '';
  } else if (json[0] === '[') {
    // array
    return parseArr(json);
  } else if (json[0] === '{') {
    // obj
    return parseObj(json); // pass in copy of obj ??
  } else if (json[0] === '"') {
    // string
    return parseStr(json);
  } else if (json.slice(0, 4) === 'true' || json.slice(0, 5) === 'false') {
    // boolean
    return parseBoolean(json);
  } else if (json.slice(0, 4) === 'null') {
    // null
    return parseNull(json);
  } else if (typeof Number.parseFloat(json) === 'number') {
    // number
    return parseNum(json);
  }
};
