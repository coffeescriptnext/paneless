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

function makeHTMLTag(tag, content, attributes) {
  var attributesString = typeof attributes !== 'undefined' ?
                         makeAttributesString(attributes) :
                         '';

  return '<' + tag + ' ' + attributesString + '>' + content + '</' + tag + '>'
}

function makeAttributesString(attributes) {
  return Object.keys(attributes).reduce(function(str, key) {
    return str + key + '="' + attributes[key] + '" ';
  }, '').trim();
}
