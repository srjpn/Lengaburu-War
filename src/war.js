var { resourceBasedOnLimit, specialFunction, divideBy2, multiplyBy2 } = require('./utils');

const fetchFromPreviousBattalion = ({ reminder, battalionUsed, index, limits, armyToBeSent }) => {
  let limit = 0;
  let used = 0;
  if (reminder > 0) {
    const previousIndex = index - 1;
    ({ reminder, used, limit } = resourceBasedOnLimit(limits[ORDER_OF_BATTALION[previousIndex]], reminder, multiplyBy2));
    battalionUsed = battalionUsed < multiplyBy2(used) ? 0 : specialFunction(battalionUsed, used, divideBy2);
    limits[ORDER_OF_BATTALION[previousIndex]] = limit;
    armyToBeSent.hasOwnProperty(ORDER_OF_BATTALION[previousIndex]) && (armyToBeSent[ORDER_OF_BATTALION[previousIndex]] += used);
  }
  return { reminder, battalionUsed, index, limits, armyToBeSent };
};

const fetchFromNextBattalion = ({ reminder, battalionUsed, index, limits, armyToBeSent }) => {
  let limit = 0;
  let used = 0;
  if (reminder > 0) {
    const nextIndex = index + 1;
    ({ reminder, used, limit } = resourceBasedOnLimit(limits[ORDER_OF_BATTALION[nextIndex]], reminder, divideBy2));
    battalionUsed = battalionUsed < multiplyBy2(used) ? 0 : specialFunction(battalionUsed, used, multiplyBy2);
    limits[ORDER_OF_BATTALION[nextIndex]] = limit;
    armyToBeSent.hasOwnProperty(ORDER_OF_BATTALION[nextIndex]) && (armyToBeSent[ORDER_OF_BATTALION[nextIndex]] += used);
  }
  return { battalionUsed, reminder, index, limits, armyToBeSent };
};

const declareIfFailed = ({ reminder, battalionUsed, index, limits, armyToBeSent }) => {
  if (reminder > 0) {
    armyToBeSent["Failed"] = true;
  }
  return { reminder, battalionUsed, index, limits, armyToBeSent };
};

const findBattalionCount = (incomingArmy, battalion, ourArmy, index, armyToBeSent) => {
  var battalionUsed = findBattalionToBeUsed(incomingArmy, battalion);
  var reminder = findRemainingBattalion(battalionUsed, ourArmy, battalion);

  const initialValue = { reminder, battalionUsed, index, limits: ourArmy, armyToBeSent };
  ({ reminder, battalionUsed } = ACTIONS.reduce((params, action) => action(params), initialValue));

  ourArmy[battalion] = ourArmy[battalion] - battalionUsed;

  armyToBeSent[battalion] = armyToBeSent[battalion] ? armyToBeSent[battalion] + (battalionUsed - reminder) : (battalionUsed - reminder);
  return armyToBeSent;
};

const ORDER_OF_BATTALION = ['horse', 'elephant', 'tank', 'sling'];

const ACTIONS = [fetchFromPreviousBattalion, fetchFromNextBattalion, declareIfFailed];

module.exports = (incomingArmy) => {
  const ourArmy = { horse: 100, elephant: 50, tank: 10, sling: 5 };
  const armyToBeSent = { horse: 0, elephant: 0, tank: 0, sling: 0 }
  ORDER_OF_BATTALION
    .forEach((battalion, index) =>
      findBattalionCount(incomingArmy, battalion, ourArmy, index, armyToBeSent));
  return armyToBeSent;
};

const findBattalionToBeUsed = (incomingArmy, battalion) => Math.round(divideBy2(incomingArmy[battalion]));

const findRemainingBattalion = (battalionUsed, ourArmy, battalion) => (battalionUsed - ourArmy[battalion] < 0 ? 0 : battalionUsed - ourArmy[battalion])

