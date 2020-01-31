var net = require('net');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var HOST = '127.0.0.1';
var PORT = 6969;
var client = new net.Socket();
client.connect(PORT, HOST, function() {
    isConnect = true;
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected,
    //the server will receive it as message from the client 
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    if(data.toString() == "Are you crazy?"){
        client.destroy();
    }else{
        readline.question(data, (name) => {
            client.write(name);
           //
        })
    }
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
    readline.close();
});
client.on('error', function() {
    console.log('Connection Terminated');
    readline.close();
    
});

readline.on('close', ()=>{
    client.destroy();
})
