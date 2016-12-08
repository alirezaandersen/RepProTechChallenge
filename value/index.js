function value(fn) {
  if(typeof fn != 'function'){
    return fn;
  }
  //recursive
  return value(fn());
}

module.exports = value;
