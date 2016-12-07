function debounce(func, time) {

  var processing = false;
  var _self;

  return function() {
    _self = this;
    if (!processing) {
      processing = true;
      setTimeout(function() {
        func.apply(_self);
        processing = false;
      }, time);
    }

  };
}
module.exports = debounce;
