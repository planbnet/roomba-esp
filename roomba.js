var util = require('util');
var net = require('net');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var CommandEncoder = require('./protocol/cmd_encoder.js').CommandEncoder;
var SensorDecoder = require('./protocol/sensor_decoder.js').SensorDecoder;

function Roomba(conf) {
  var self = this;
  EventEmitter.call(this);

  this._tcpClient = new net.Socket();

  this._encoder = new CommandEncoder();
  this._decoder = new SensorDecoder();

  if (!conf.port) conf.port = 23;
  if (!conf.host) conf.host = "roomba";

  // An object of options to indicate where to post to
  var post_options = {
    host: 'roomba',
    port: '80',
    path: '/console/reset',
    method: 'POST'
  };

  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    self._tcpClient.connect(conf.port, conf.host, function() {    
      self._encoder.pipe(self._tcpClient);
      self._tcpClient.pipe(self._decoder);

      // put roomba into SAFE state
      self._encoder.send({ cmd: 'START', data: [] });
      setTimeout(function () {
        self._encoder.send({ cmd: 'CONTROL', data: [] });
        self.emit('ready');
      }, 20);

      setInterval(function () {
        self._encoder.send({ cmd: 'SENSORS', data: [0] });
      }, conf.update_freq || 1000);
    });
  });
  post_req.end();

  this._decoder.on('sense', function (msg) {
    self.emit('sense', msg);
  });
};

util.inherits(Roomba, EventEmitter);

Roomba.prototype.send = function send(obj) {
  this._encoder.send(obj);
};

Roomba.prototype.disconnect = function() {
  this._tcpClient.destroy();
  process.exit(0);
};

module.exports = {
  Roomba: Roomba
}
