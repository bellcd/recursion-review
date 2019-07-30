// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
// using the parameter list of the recursive function to store values
var getElementsByClassNameBreadthFirst = function(className, elem = [document.body], result = []) {
  // check if the first element of elem has the target class
  if (elem[0].classList.contains(className)) {
    // if yes, add to result array
    result.push(elem[0]);
  }

  // create array of any child elements of the current node that need to be recursed over
  let childElements = Array.from(elem[0].childNodes).filter(elem => elem.nodeType === 1);

  // remove the first element of elem
  elem.shift();

  // concatenate the childElements array with elem
  elem = elem.concat(childElements);

  // base case
  if (elem.length === 0) {
    // elem array is empty, return result array
    return result;
  } else {
    // recursive call with updated values of elem & result
    return getElementsByClassNameBreadthFirst(className, elem, result);
  }
};