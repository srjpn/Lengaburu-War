var { divideBy2, multiplyBy2 } = require('./utils');

module.exports = (armySent) => {
  var limits = {
    horse: {
      value: 100,
      adjacent: [this.elephant]
    },
    elephant: {
      value: 50,
      adjacent: [this.horse, this.tank]
    },
    tank: {
      value: 10,
      adjacent: [this.elephant, this.sling]
    },
    sling: {
      value: 5,
      adjacent: [this.tank]
    }
  };

  return ['horse', 'elephant', 'tank', 'sling'].reduce((acc, x, i, arr) => {
    var battalionUsed = Math.round(armySent[x] / 2);
    var reminder = battalionUsed - limits[x].value < 0 ? 0 : battalionUsed - limits[x].value;
    if (reminder > 0) {
      const index = i - 1;
      const previousBattalion = limits[arr[index]];
      ({ reminder, previousBattalionUsed } = fetchFromPreviousBattalion(previousBattalion, reminder));
      battalionUsed = battalionUsed - previousBattalionUsed / 2;
      acc[arr[index]] += previousBattalionUsed;
    }
    if (reminder > 0) {
      const index = i + 1;
      const nextBattalion = limits[arr[index]];
      ({ reminder, nextBattalionUsed } = fetchFromNextBattalion(nextBattalion, reminder));
      battalionUsed = battalionUsed < (nextBattalionUsed * 2) ? 0 : Math.round((battalionUsed / 4 - nextBattalionUsed / 2)) * 4;
      acc[arr[index]] += nextBattalionUsed;
    }
    if (reminder > 0) {
      console.log('failed...................')
    }
    limits[x].value = limits[x].value - battalionUsed;
    acc[x] = acc[x] ? acc[x] + (battalionUsed - reminder) : (battalionUsed - reminder);
    return acc;
  }, { horse: 0, elephant: 0, tank: 0, sling: 0 });
};

const fetchFromPreviousBattalion = (previousBattalion, reminder) => {
  ({ reminder, battalionUsed } = newFunction(previousBattalion, reminder, multiplyBy2));
  return { reminder, previousBattalionUsed: battalionUsed };
};

const fetchFromNextBattalion = (nextBattalion, reminder) => {
  ({ reminder, battalionUsed } = newFunction(nextBattalion, reminder, divideBy2));
  return { reminder, nextBattalionUsed: battalionUsed };
};

const newFunction = (battalion, reminder, reducer) => {
  var battalionUsed = 0;
  if (battalion && battalion.value > 0) {
    battalionUsed = battalion.value;
    if (battalionUsed > reducer(reminder)) {
      battalionUsed = reducer(reminder);
    }
    reminder = Math.floor(reducer(reminder) - (battalionUsed));
    battalion.value -= battalionUsed;
  }
  return { reminder, battalionUsed };
};

