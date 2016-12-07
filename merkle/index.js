function splitPairs(a) {
  // splits arrays in pairs of 2
  var i, j = 0;
  pairs = [];
  //if array is odd number adds last char to end of array to make even number
  nPairs = a.length / 2;
  for (i = 0; i < nPairs; i++) {
    pairs.push(a.splice(0, 2));
  }
  if (pairs[pairs.length - 1].length === 1) {
    pairs[pairs.length - 1].push(pairs[pairs.length - 1][0]);
  }
  return pairs;
}

function combinePairs(arr,hash){
  // takes splitPairs array and merges arrays in set of two
  pairs = splitPairs(arr);
  strPairs = pairs.map(function(ar){
    return hash(ar[0].concat(ar[1]));
  });
  return strPairs;
}

function merkle(arr,hash){
  //recursive
  pairs = combinePairs(arr,hash);
  if(pairs.length === 1){
    return {
      root: pairs[0],
      getVerification: function(word){
         return word;
      },
    };
  }
return  merkle(pairs,hash);
}

module.exports = merkle; 
