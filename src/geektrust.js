var fs = require("fs");
var gatherArmy = require("./war");

var findIncomingArmy = (txt) => {
  var values = txt.split(" ");
  return {
    horse: values[3],
    elephant: values[5],
    tank: values[7],
    sling: values[9]
  };
};

var run = (filePath) => {
    // eslint-disable-next-line no-sync
    var file = fs.readFileSync(filePath, 'utf8');

    var incomingArmy = findIncomingArmy(file);
    var armyToBeSent = gatherArmy(incomingArmy);
    console.log(`Lengaburu deploys ${armyToBeSent.horse} H, ${armyToBeSent.elephant} E, ${armyToBeSent.tank} AT, ${armyToBeSent.sling} SG and ${armyToBeSent.Failed ? "loses" : "wins"}`)
}


run(process.argv[2])
