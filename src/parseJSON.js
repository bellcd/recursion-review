// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
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
    let copy = objJSON.slice();

    // remove whitespace if there's any on the end
    copy = copy.trim();

    // remove curly brackets from beginning
    copy = copy.slice(1);

    // if last character is square bracket, remove it
    if (copy[copy.length - 1] === '}') {
      copy = copy.slice(0, -1);
    } else {
      // else, throw Syntax Error
      throw new SyntaxError('unpaired { or }. Check your syntax!');
    }

    // trim whitespace
    copy = copy.trim();

    // while copy length is greater than 0
    while (copy.length > 0) {
      // find the position of the first colon
      firstColonIndex = copy.indexOf(':');
      // recursive call on all characters before the first colon (trimmed first), save as key
      key = parseJSON(copy.slice(0, firstColonIndex).trim());
      // remove all characters up to and including the colon
      copy = copy.slice(firstColonIndex + 1);
      // trim the string
      copy = copy.trim();
      // if double quotes next (ie, value is a string)
      if (copy[0] === '"') {
        // find position of the first comma after the next non escaped double quotes
        do {
          position = copy.indexOf('"', 1);
        } while (copy[position - 1] === '\\');
        // position is currently the enclosing quote of the string, 
        // if position is greater than length of the string, throw SyntaxError for unterminated string
        if (copy[position] === undefined) {
          throw new SyntaxError('Unterminated string, check your quotes!');
        } else {
          // else, increment to the next character (the comma for the next element OR end of string)
          position = position + 1;
        }
      } else if (copy[0] === '[') {
        // value is an arr
        ++arrayCount;
        position = 1;
        do {
          switch (copy[position]) {
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
        } while ((arrayCount > 0 || objCount > 0 ) && position < copy.length);
      } else if (copy[0] === '{') {
        // value is an obj
        ++objCount;
        position = 1;
        do {
          switch (copy[position]) {
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
        } while ((arrayCount > 0 || objCount > 0 ) && position < copy.length);
      } else {
        // else find the position of the next comma
        position = copy.indexOf(',');
        if (position === -1) {
          // this is the last key:value pair, so set position to the str length
          position = copy.length;
        }
      }

      // set value to the result of a recursive call on the next value portion 
      value = parseJSON(copy.slice(0, position));
      // remove everything in the string up to and including position
      copy = copy.slice(position + 1);

      // add the key:value pair to the result object
      result[key] = value;
    }
    return result;
  };

  var parseArr = function (arrJSON) {

    if (arrJSON === '[]') {
      return [];
    }
    // make copy 
    let copy = arrJSON.slice();

    // remove whitespace if there's any on the end
    copy = copy.trim();

    // remove square brackets from beginning
    copy = copy.slice(1);

    // if last character is square bracket, remove it
    if (copy[copy.length - 1] === ']') {
      copy = copy.slice(0, -1);
    } else {
      // else, throw Syntax Error
      throw new SyntaxError('Unpaired [ or ]. Check your syntax!');
    }

    let result = [];
    let arrayCount = 0;
    let objCount = 0;
    let value;
    let position;
    
    while (copy.length > 0) {
      // set or reset position to zero
      position = 0;
      // trim the string
      copy = copy.trim();
      // if double quotes next (ie, value is a string)
      if (copy[0] === '"') {
        // find position of the first comma after the next non escaped double quotes
        do {
          ++position;
          position = copy.indexOf('"', position);
        } while (copy[position - 1] === '\\');
        // position is currently the enclosing quote of the string, 
        // if position is greater than length of the string, throw SyntaxError for unterminated string
        if (copy[position] === undefined) {
          throw new SyntaxError('Unterminated string, check your quotes!');
        } else {
          // else, increment to the next character (the comma for the next element OR end of string)
          position = position + 1;
        }
      } else if (copy[0] === '[') {
        // value is an arr
        ++arrayCount;
        position = 1;
        do {
          switch (copy[position]) {
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
        } while ((arrayCount > 0 || objCount > 0 ) && position < copy.length);
      } else if (copy[0] === '{') {
        // value is an obj
        ++objCount;
        position = 1;
        do {
          switch (copy[position]) {
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
        } while ((arrayCount > 0 || objCount > 0 ) && position < copy.length);
      } else {
        // else find the position of the next comma
        position = copy.indexOf(',');
        if (position === -1) {
          // this is the last key:value pair, so set position to the str length
          position = copy.length;
        }
      }

      // set value to the result of a recursive call on the next value portion 
      value = parseJSON(copy.slice(0, position));
      // remove everything in the string up to and including position
      copy = copy.slice(position + 1);

      // push value to result
      result.push(value);
    }

    return result;
  };
  
  var parseNum = function (numJSON) {
    return Number.parseFloat(numJSON);
  };
  
  var parseStr = function (strJSON) {
    let copy = strJSON.slice(1, -1);

    // console.log(copy);
    // if (copy === '\\"hi') console.log('YES');

    // console.log("hello!");
    // for handling escape characters
    // only handling characters in English
    let result = '';
   
    while (copy.length > 0) {
      if (copy.slice(0, 2) === '\\\\') {
        // \
        result = result + '\\';
        console.log('copy.length: ', copy.length);
        copy = copy.slice(2);
        console.log('copy.length: ', copy.length);
        console.log('entering');
      } else if (copy.slice(0, 2) === '\\"') {
        // "
        result = result + '"';
        copy = copy.slice(2);
      } else if (copy.slice(0, 2) === "\\'") {
        // '
        result = result + "'";
        copy = copy.slice(2);
      } else if (copy.slice(0, 2) === '\\/') {
        // /
        result = result + '/';
      } else if (copy.slice(0, 2) === '\\b') {
        // backspace
        result = result + '\\b';
      } else if (copy.slice(0, 2) === '\\f') {
        // formfeed
        result = result + '\\f';
      } else if (copy.slice(0, 2) === '\\n') {
        // linefeed
        result = result + '\\n';
      } else if (copy.slice(0, 2) === '\\r') {
        // carriage return
        result = result + '\\r';
      } else if (copy.slice(0, 2) === '\\t') {
        // horizontal tab
        result = result + '\\t';
      } else {
        result = result + copy.slice(0, 1);
        copy = copy.slice(1);
      }
    }
    return result;
  };

  var parseBoolean = function (strJSON) {
    return strJSON === 'true' ? true : false;
  };

  var parseNull = function (strJSON) {
    return null;
  };

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
