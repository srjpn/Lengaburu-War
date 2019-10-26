var { expect } = require('./testHelpers');
var shanArmy = require('../src/index');

describe('index', () => {
  it('First war', () => {
    var army = { horse: 100, elephant: 101, tank: 20, sling: 5 };
    expect(shanArmy(army)).to.be.eql([52, 50, 10, 3]);
  });

  it('Second war', () => {
    var army = { horse: 150, elephant: 96, tank: 26, sling: 8 };
    expect(shanArmy(army)).to.be.eql([75, 50, 10, 5]);
  });
  
  it('Third war', () => {
    var army = { horse: 250, elephant: 50, tank: 20, sling: 15 };
    expect(shanArmy(army)).to.be.eql([100, 38, 10, 5]);
  });
});
