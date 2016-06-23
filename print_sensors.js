var util = require('util');
var Roomba = require('./roomba.js').Roomba

var bot = new Roomba({
    update_freq: 2000
});

bot.once('ready', function () {
	bot.on('sense', function (msg) {
		console.log(util.inspect(msg));
    bot.disconnect();
	});
});
