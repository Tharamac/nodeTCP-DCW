var net = require('net');
var rl = require('readline');
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

var HOST = '127.0.0.1';
var PORT = 6969;
var name = "A";
var client = new net.Socket();
client.connect(PORT, HOST, function() {
    isConnect = true;
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write(name);
    // Write a message to the socket as soon as the client is connected,
    //the server will receive it as message from the client 
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    if(data.toString() == "Are you crazy?"){
        console.log(data.toString())
    }else{
        readline.resume();
        readline.question(data, cmd => {
            client.write(cmd);
            readline.pause();
        })
    }
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
    rl.clearScreenDown(process.stdout);
    readline.close();
    process.exit();
});
client.on('error', function() {
    console.log('Error');
    readline.close();
    process.exit();
});

