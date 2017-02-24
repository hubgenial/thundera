var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.11:1883');
var stdin = process.stdin;
var text = "";
var started = false;
var empresas = [
  {name: "Guenka", number: "301"},
  {name: "Mystra", number: "302"},
  {name: "Kuruvi", number: "303"},
  {name: "Kiwano", number: "304"},
  {name: "Tilit", number: "305"}
];
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
  process.stdout.write("procurando empresa...\n");
  // faz o request da sala em algum lugar
  var empresa = empresas.find(function (item){
    return item.number == roomNumber;
  });
  if(empresa != undefined){
    process.stdout.write("Empresa encontrada, chamando "+empresa.name+"...\n");
    client.publish('newMyT', empresa.name + "! Te esperam lá fora");
    client.end();
  }else{
    process.stdout.write("Empresa não encontrada. Tente novamente.\n");
  }
  // stdin.pause();
  // process.exit();
}
