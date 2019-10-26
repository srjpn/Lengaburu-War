var { resourceBasedOnLimit, specialFunction, divideBy2, multiplyBy2 } = require('./lib');

orderOfIteration = ['horse', 'elephant', 'tank', 'sling'];

module.exports = (armySent) => {
  var limits = {
    horse: 100,
    elephant: 50,
    tank: 10,
    sling: 5
  };

  return orderOfIteration.reduce((acc, x, i, arr) => {
    var battalionUsed = Math.round(divideBy2(armySent[x]));
    var reminder = battalionUsed - limits[x] < 0 ? 0 : battalionUsed - limits[x];
    if (reminder > 0) {
      const index = i - 1;
      ({ reminder, used, limit } = fetchFromPreviousBattalion(limits[arr[index]], reminder));
      battalionUsed = battalionUsed - divideBy2(used);
      limits[arr[index]] = limit;
      acc.hasOwnProperty(arr[index]) && (acc[arr[index]] += used);
    }
    if (reminder > 0) {
      const index = i + 1;
      ({ reminder, used, limit } = fetchFromNextBattalion(limits[arr[index]], reminder));
      battalionUsed = battalionUsed < (used * 2) ? 0 : specialFunction(battalionUsed, used);
      limits[arr[index]] = limit;
      acc.hasOwnProperty(arr[index]) && (acc[arr[index]] += used);
    }
    if (reminder > 0) {
      acc["Failed"] = true;
    }
    limits[x] = limits[x] - battalionUsed;
    acc[x] = acc[x] ? acc[x] + (battalionUsed - reminder) : (battalionUsed - reminder);
    return acc;
  }, { horse: 0, elephant: 0, tank: 0, sling: 0 });
};

const fetchFromPreviousBattalion = (previousBattalion, reminder) => {
  return resourceBasedOnLimit(previousBattalion, reminder, multiplyBy2);
};

const fetchFromNextBattalion = (nextBattalion, reminder) => {
  return resourceBasedOnLimit(nextBattalion, reminder, divideBy2);
};