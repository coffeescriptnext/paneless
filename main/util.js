// Returns an array containing the numbers between lower and upper in ascending
// order, including lower but not upper.
// If upper is not provided, 0 and lower are used instead.
function range(lower, upper) {
  var result = [];

  if (typeof upper === 'undefined') {
    upper = lower;
    lower = 0;
  }

  for (var i = lower; i < upper; i++) {
    result.push(i);
  }

  return result;
}

// Returns a string containing an HTML tag, based on the given tag type,
// children / content, and object of attributes.
function makeHTMLTag(tag, content, attributes) {
  var attributesString = typeof attributes !== 'undefined' ?
                         makeAttributesString(attributes) :
                         '';

  return '<' + tag + ' ' + attributesString + '>' + content + '</' + tag + '>'
}

// Returns a string containing a list of attributes that can be placed in an
// HTML tag, based on the given object of attributes.
function makeAttributesString(attributes) {
  return Object.keys(attributes).reduce(function(str, key) {
    return str + key + '="' + attributes[key] + '" ';
  }, '').trim();
}
