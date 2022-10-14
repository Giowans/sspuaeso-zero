function generateRandom(maxLimit = 100) {
  let rand = Math.random() * maxLimit;

  rand = Math.floor(rand); // 99
  if (rand === 0) {
    rand = 1;
  }
  return rand;
}

function generateRandomInRange(min = 0, max = 100) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

export { generateRandom, generateRandomInRange };
