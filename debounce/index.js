function debounce(func, time) {

  var processing = false;
  var _self;
  var args;

  return function() {
    _self = this;
    args = arguments;
    if (!processing) {
      processing = true;
      setTimeout(function() {
        func.apply(_self, args);
        processing = false;
      }, time);
    }

  };
}
module.exports = debounce;
