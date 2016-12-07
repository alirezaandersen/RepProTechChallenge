function debounce(func, time) {

  var processing = false;
  return function() {
    if (!processing) {
      processing = true;
      setTimeout(function() {
        func();
        processing = false;
      }, time);
    }

  };
}
module.exports = debounce;
