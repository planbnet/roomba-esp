var util = require('util');
var Roomba = require('./roomba.js').Roomba

var bot = new Roomba({
    update_freq: 2000
});

bot.once('ready', function () {
  console.log("Sending SPOT command");
  bot.send({ cmd: 'SPOT' });
  setTimeout( function() { 
    process.exit(0); 
  }, 2000 );
});
