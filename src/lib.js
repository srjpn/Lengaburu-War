exports.resourceBasedOnLimit = (limit, reminder, action) => {
  var used = 0;
  if (limit > 0) {
    used = limit;
    if (used > action(reminder)) {
      used = action(reminder);
    }
    reminder = Math.floor(action(reminder) - (used));
  }
  return { reminder, used, limit: limit - used };
};

exports.specialFunction = (minuend, subtrahend) => {
  subtrahend = isOdd(subtrahend) ? (subtrahend - .5) : subtrahend;
  return minuend - exports.multiplyBy2(subtrahend);
};

const isOdd = (number) => number % 2 !== 0

exports.divideBy2 = (value) => Math.round(value / 2);

exports.multiplyBy2 = (value) => value * 2;
