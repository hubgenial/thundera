const config = require('./config.json');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://' + config.mqttserver);
var stdin = process.stdin;
var text = "";
var started = false;
// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
// stdin.resume();
stdin.setEncoding('utf8');

// chamando a função de input
inputNumber();
// fim

function inputNumber(){
  process.stdout.write("Digite o numero do estabelecimento: ");
  stdin.resume();
  stdin.on('data', function(key){
    if(key === '\u0003') {
      process.exit();
    }
    text = text + key;
    // write the key to stdout all normal like
    if(started == false){
      started = true
      setTimeout(function () {
        process.stdout.write(text+"\n");
        sendMessage(text);
        stdin.pause();
      }, 3000)
    }
  });
}

function sendMessage(roomNumber){
  client.publish(config.mqtttopic, roomNumber);
  client.end();
}
