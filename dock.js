var util = require('util');
var Roomba = require('./roomba.js').Roomba

var bot = new Roomba({
    update_freq: 2000
});

bot.once('ready', function () {
  console.log("Sending DOCK command");
  bot.send({ cmd: 'DOCK' });
  setTimeout( function() { 
    bot.send({ cmd: 'DOCK' });
    setTimeout( function() { process.exit(0); }, 2000 );
  }, 2000 );
});
