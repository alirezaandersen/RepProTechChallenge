// http://stackoverflow.com/questions/38385419/throttle-amount-of-promises-open-at-a-given-time

function throttlePromises(limit, listOfCallableActions) {
  // We'll need to store which is the next promise in the list.
  var i = 0;
  var resultArray = new Array(listOfCallableActions.length);

  // Now define what happens when any of the actions completes. Javascript is
  // (mostly) single-threaded, so only one completion handler will call at a
  // given time. Because we return doNextAction, the Promise chain continues as
  // long as there's an action left in the list.
  function doNextAction() {
    if (i < listOfCallableActions.length) {
      // Save the current value of i, so we can put the result in the right place
      var actionIndex = i++;
      var nextAction = listOfCallableActions[actionIndex];
      return Promise.resolve(nextAction())
          .then(result => {  // Save results to the correct array index.
             resultArray[actionIndex] = result;
             return;
          }).then(doNextAction);
    }
  }

  // Now start up the original <limit> number of promises.
  // i advances in calls to doNextAction.
  var listOfPromises = [];
  while (i < limit && i < listOfCallableActions.length) {
    listOfPromises.push(doNextAction());
  }
  return Promise.all(listOfPromises).then(() => resultArray);
}

/*
function throttlePromises(num,arr){


// 100 promises
// process no more than 5 promises at a time
// process is completed when .then is called

  var results = [];
  var currentlyExecuting = 0;
  var pArray = arr.map(function(p){ return p();});

  return new Promise(function(resolve,reject){
    console.log.call(console,'inside promise');
    //console.log.call(console,'pArray:', pArray);

    //process all promises in arr
    while(pArray.length > 1){

      //limit processing to num promises
      while(currentlyExecuting < num){
        var cur_promise = pArray.splice(0,1);
        console.log.call(console,'cur_promise:',cur_promise);

        ++currentlyExecuting;
        Promise.all(cur_promise).then(function(val){
          console.log.call(console,'val:',val);
          results.push(val);
          //decrement currentlyExecuting when promise fulfilled
          --currentlyExecuting;
        });

      }
      console.log.call(console,'.');
    }

    if(results.length === arr.length){
      resolve(results);
    }

  }); //end: return new Promise

}
*/

/*
function throttlePromises(num, arr) {
  var results = [];
  var pArray = arr.map(function(p){ return p();});

  return new Promise(function(resolve,reject){

    while(pArray.length > 1){
      current_promises = pArray.splice(0,num);
      //console.log('current_promises',current_promises);
      if(!!processing === false){

        Promise.all(current_promises).then(function(result){
          for(i = 0; i < result.length; ++i){
            //console.log.call(console,'result:',result[i]);
            results.push(result[i]);
          }


          console.log.call(console,'outside loop');
          console.log.call(console, 'results.length:', results.length);
          console.log.call(console,'arr.length', arr.length);

          if(results.length === arr.length){
  //          console.log.call(console,'results:',results);
            resolve(results);
          }

        }).catch(function(err){
          console.log.call(console,'current_promises, err:',err);
        });
      }
    }

  });
  */

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

// }
module.exports = throttlePromises;
