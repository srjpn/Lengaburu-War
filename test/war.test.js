var { expect } = require('./testHelpers');
var shanArmy = require('../src/war.js');

describe('index', () => {
  it('First war', () => {
    var army = { horse: 100, elephant: 101, tank: 20, sling: 5 };
    expect(shanArmy(army)).to.be.eql({ horse: 52, elephant: 50, tank: 10, sling: 3 });
  });

  it('Second war', () => {
    var army = { horse: 150, elephant: 96, tank: 26, sling: 8 };
    expect(shanArmy(army)).to.be.eql({ horse: 75, elephant: 50, tank: 10, sling: 5 });
  });

  it('Third war', () => {
    var army = { horse: 250, elephant: 50, tank: 20, sling: 15 };
    expect(shanArmy(army)).to.be.eql({ horse: 100, elephant: 38, tank: 10, sling: 5, Failed: true });
  });
});
