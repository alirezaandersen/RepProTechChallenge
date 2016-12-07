function debounce(func, time){

  return function(){
    setTimeout(func,time);
  };
}

module.exports = debounce;
