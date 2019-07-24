// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, elem) {
  let result = [];
  if (elem === undefined) {
    elem = document.body;
  }

  if (elem.classList.contains(className)) {
    result.push(elem);
  }

  let arrayToAdd = [];
  const childElements = Array.from(elem.childNodes).filter(elem => elem.nodeType === 1);
  if (childElements.length > 0) {
    arrayToAdd = childElements.reduce((acc, currentValue) => {
      return acc.concat(getElementsByClassName(className, currentValue));  
    }, []);
  }
  return result.concat(arrayToAdd);
};
