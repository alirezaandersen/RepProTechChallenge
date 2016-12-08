function cb(result){
  console.log(result);
}

function throttlePromises(num, arr) {

  pArray = arr.map(function(p){ return p();});

  return new Promise(function(resolve,reject){

    var results = [];
    while(pArray.length > 1){
      current_promises = pArray.splice(0,num);
      //console.log('current_promises',current_promises);
      Promise.all(current_promises).then(function(results){
        for( result in results){
          results.push(result);
        }
      }).catch(function(err){
        console.log('current_promises, err:',err);
      });
    }

    if(results.length === arr.length){
      //console.log('results:',results);
      resolve(results);
    }
  });

  /* with throttle */
  /*
  var results = [];

  //extract array of promises from array of functions
  pArray = arr.map(function(p){ return p();});
  //console.log('pArray:',pArray);

//  while(pArray.length > 0){

    pArrayToExecute = pArray.splice(0,num);
    console.log(pArrayToExecute);

    Promise.all(pArrayToExecute).then(function(result){
      console.log(result);
      //results.push(result);
    });
  //}
  return results;
  */


  /* without throttling per README */
  //return Promise.all(arr.map(function(p){ return p();}));
}
module.exports = throttlePromises;
