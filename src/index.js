


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
    var reminder = battalionUsed - limits[x].value;
    if (reminder > 0) {
      const previousBattalion = limits[arr[i - 1]];
      ({ reminder, previousBattalionUsed } = fetchFromPreviousBattalion(previousBattalion, reminder));
      acc[i - 1] += previousBattalionUsed;
      battalionUsed = battalionUsed - previousBattalionUsed / 2;
    }
    // console.log(x, reminder, '=============')
    if (reminder > 0) {
      ({ reminder, nextBattalionUsed } = fetchFromNextBattalion(limits, arr, i, reminder, acc));
      battalionUsed = battalionUsed < (nextBattalionUsed * 2) ? 0 : battalionUsed - (nextBattalionUsed * 2);
      // console.log(x, battalionUsed, nextBattalionUsed, '-----------')
    }
    limits[x].value = limits[x].value - battalionUsed;
    acc[i] = acc[i] ? acc[i] + battalionUsed : battalionUsed;
    return acc;
  }, []);
};

function fetchFromPreviousBattalion(previousBattalion, reminder) {
  var previousBattalionUsed = 0;
  if (previousBattalion && previousBattalion.value > 1) {
    previousBattalionUsed = previousBattalion.value;
    if (previousBattalionUsed > (reminder * 2)) {
      previousBattalionUsed = (reminder * 2);
    }
    reminder = reminder - previousBattalionUsed / 2;
    previousBattalion.value -= previousBattalionUsed;
  }
  return { reminder, previousBattalionUsed };
}

function fetchFromNextBattalion(limits, arr, i, reminder, acc) {
  const nextBattalion = limits[arr[i + 1]];
  var nextBattalionUsed = 0;
  if (nextBattalion && nextBattalion.value > 0) {
    nextBattalionUsed = nextBattalion.value;
    if (nextBattalionUsed > (reminder / 2)) {
      nextBattalionUsed = Math.round(reminder / 2);
    }
    reminder = reminder - nextBattalionUsed * 2;
    nextBattalion.value -= nextBattalionUsed;
    acc[i + 1] = acc[i + 1] ? acc[i + 1] - nextBattalionUsed : nextBattalionUsed;
  }
  return { reminder, nextBattalionUsed };
}

