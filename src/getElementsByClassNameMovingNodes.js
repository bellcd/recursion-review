// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
// breadth first recursion, moving any child elements that need to be recursed over in the the next node to be recursed
// not using any additional parameters (how to do this without again flag??)
var getElementsByClassNameMovingNodes = function(className, elem = document.body, again = false) {
  debugger;

  // if it's the first time invoking on this node AND if current node has the target class, current is an array of that element.
  // else, an empty array
  let current = !again && elem.classList.contains(className) ? [elem] : [];

  // if the current node has any element children that need to be recursed over
  const childElements = Array.from(elem.childNodes).filter(elem => elem.nodeType === 1);

  // base case, there are no child nodes that need to be recursed over
  if (childElements.length === 0) {
    return current;
  } else {
    // recursive cases
    // if there's only 1 child node that needs to be recursed over
    if (childElements.length === 1) {
      // invoke recursion on that child node
      return current.concat(getElementsByClassNameMovingNodes(className, childElements[0]));

    } else if (childElements.length > 1) {
      // there's more than 1 child node that needs to be recursed over
      // if any children of the first child need to be recursed over, move them to the second child node
      const firstChildNodeChildrenToRecurseOver = Array.from(childElements[0]).filter(elem => elem.nodeType === 1);
      if (firstChildNodeChildrenToRecurseOver.length > 0) {
        childElements[1].append(...firstChildNodeChildrenToRecurseOver); // does .append() use iteration under the hood?
      }

      // check if the first child node has the target class
      var hasClass = childElements[0].classList.contains(className) ? true : false;
      if (hasClass) {
        // yes, concat it with current
        current = current.concat(childElements[0]);
      }

      // remove first child node
      childElements[0].remove();

      // change flag
      again = true;

      // recurse on CURRENT node again
      return current.concat(getElementsByClassNameMovingNodes(className, elem, again));
    }
  }
};