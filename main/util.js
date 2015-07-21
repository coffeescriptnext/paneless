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
