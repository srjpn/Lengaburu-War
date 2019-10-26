var { expect } = require('./testHelpers');
var { resourceBasedOnLimit, divideBy2, multiplyBy2, specialFunction } = require('../src/lib');

describe('Lib', () => {
  describe('resourceBasedOnLimit', () => {
    [
      { limit: 50, reminder: 1, resultantReminder: 0, used: 2, resultantLimit: 48, action: multiplyBy2 },
      { limit: 2, reminder: 3, resultantReminder: 4, used: 2, resultantLimit: 0, action: multiplyBy2 },
      { limit: 5, reminder: 4, resultantReminder: 0, used: 2, resultantLimit: 3, action: divideBy2 },
      { limit: 2, reminder: 1, resultantReminder: 0, used: 2, resultantLimit: 0, action: multiplyBy2 },
    ].forEach(values => {

      it(`is for limit: ${values.limit} reminder: ${values.reminder} action: ${values.action}`, () => {
        const { limit, reminder, resultantReminder, used, resultantLimit, action } = values

        const expected = { reminder: resultantReminder, used, limit: resultantLimit };
        expect(resourceBasedOnLimit(limit, reminder, action)).to.be.eql(expected);
      });
    });
  });

  describe('special function', () => {
    it('should give 100 for 125 and 13', () => {
      expect(specialFunction(125, 13)).to.be.equal(100);
    });
  });


});
