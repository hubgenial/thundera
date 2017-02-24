// var mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://192.168.1.11:1883');
var stdin = process.stdin;
var text = "";
// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
// stdin.resume();
stdin.setEncoding('utf8');

// chamando a função de input
console.log("start");
inputNumber();
console.log("end");
// fim

function inputNumber(){
  stdin.resume();
  stdin.on('data', function(key){
    if(key === '\u0003') {
      process.exit();
    }
    text = text + key;
    // write the key to stdout all normal like
    setTimeout(function () {
      // process.stdout.write(key);
      // process.stdout.write(text+"\n");
      // TODO dar um jeito de parar no primeiro timeout, independente do
      // numero de caracteres
      stdin.pause();
    }, 3000)
  });
}