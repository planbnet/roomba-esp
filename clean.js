var util = require('util');
var Roomba = require('./roomba.js').Roomba

var bot = new Roomba({
    update_freq: 2000
});

bot.once('ready', function () {
  console.log("Sending CLEAN command");
  bot.send({ cmd: 'CLEAN' });
  setTimeout( function() { 
    process.exit(0); 
  }, 2000 );
});
