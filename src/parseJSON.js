// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var parseObj = function (objJSON) {

  };

  var parseArr = function (arrJSON) {
    if (arrJSON === '[]') {
      return [];
    }
    // split string on commas to create an actual array
    const arrOfValues = arrJSON.split(',');
    // return reduction of recursive calls through array
    return arrOfValues.reduce((acc, currentValue) => {
      // push each cb return value onto accumulator array
      acc.push(parseJSON(currentValue));
      return acc;
    }, []);
    
  };
  
  var parseNum = function (numJSON) {

  };
  
  var parseStr = function (strJSON) {

  };

  if (json.length === 0) {
    return '';
  } else if (json[0] === '[') {
    return parseArr(json);
  } else if (json[0] === '{') {
    return parseObj(json); // pass in copy of obj ??
  }
};
