var { resourceBasedOnLimit, specialFunction, divideBy2, multiplyBy2 } = require('./lib');


const fetchFromPreviousBattalion = ({ reminder, battalionUsed, i, limits, arr, acc }) => {
  if (reminder > 0) {
    const index = i - 1;
    ({ reminder, used, limit } = resourceBasedOnLimit(limits[arr[index]], reminder, multiplyBy2));
    battalionUsed = battalionUsed < multiplyBy2(used) ? 0 : specialFunction(battalionUsed, used, divideBy2);
    limits[arr[index]] = limit;
    acc.hasOwnProperty(arr[index]) && (acc[arr[index]] += used);
  }
  return { reminder, battalionUsed, i, limits, arr, acc };
};

const fetchFromNextBattalion = ({ reminder, battalionUsed, i, limits, arr, acc }) => {
  if (reminder > 0) {
    const index = i + 1;
    ({ reminder, used, limit } = resourceBasedOnLimit(limits[arr[index]], reminder, divideBy2));
    battalionUsed = battalionUsed < multiplyBy2(used) ? 0 : specialFunction(battalionUsed, used, multiplyBy2);
    limits[arr[index]] = limit;
    acc.hasOwnProperty(arr[index]) && (acc[arr[index]] += used);
  }
  return { battalionUsed, reminder, i, limits, arr, acc };
};

const declareIfFailed = ({ reminder, battalionUsed, i, limits, arr, acc }) => {
  if (reminder > 0) {
    acc["Failed"] = true;
  }
  return { reminder, battalionUsed, i, limits, arr, acc };
};

const orderOfIteration = ['horse', 'elephant', 'tank', 'sling'];

const actions = [fetchFromPreviousBattalion, fetchFromNextBattalion, declareIfFailed];

module.exports = (armySent) => {
  var limits = {
    horse: 100,
    elephant: 50,
    tank: 10,
    sling: 5
  };

  return orderOfIteration.reduce((acc, x, index, arr) => {
    var battalionUsed = Math.round(divideBy2(armySent[x]));
    var reminder = battalionUsed - limits[x] < 0 ? 0 : battalionUsed - limits[x];

    ({ reminder, battalionUsed } = actions
      .reduce((params, action) => action(params),
        { reminder, battalionUsed, i: index, limits, arr, acc }));
    limits[x] = limits[x] - battalionUsed;
    acc[x] = acc[x] ? acc[x] + (battalionUsed - reminder) : (battalionUsed - reminder);
    return acc;
  }, { horse: 0, elephant: 0, tank: 0, sling: 0 });
};
