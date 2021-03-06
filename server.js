var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var server = net.createServer();
var name;
var client_list = {
     "A": 5,
     "B": 2,
     "C": 18,
     "D": 11,
     "E": 63
};
var keys = Object.keys(client_list);
//console.log(keys)

server.listen(PORT, HOST);
server.on('connection', function(sock) {
    // We have a connection - a socket object is assigned to the connection automatically
    //console.log(socket_owner);
    var firstTime = true;
    sock.write(`Enter the correct code: `);
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data){
        var str = data.toString();
        console.log('DATA ' + sock.remoteAddress + ':'+ sock.remotePort + data );
        if(firstTime){ 
            let grammar = str.search("I am") == 0 ? true : false || str.search("I'm") == 0 ? true : false;
            if(grammar){
                str = str.substr(str.indexOf("m")+2);
                name = keys.filter(k => k == str).toString()
                if(name == ""){
                    sock.write('Are you crazy?')
                    sock.destroy();
                }else{
                    sock.write(`Welcome! ${name} Score = ${client_list[name]}\nEnter command: `);
                    firstTime = false;
                }
            }else{
                sock.write('Are you crazy?')
                sock.destroy();
            }
        }else if(str == "BYE"){
            sock.destroy()
        }else if(!isNaN(parseInt(str))){
           // console.log(client_list[name])
        
            sock.write(`Your score is ${client_list[name]+=  parseInt(str)}\nEnter command: `);
            //sock.write(`Enter command: `);
        }else{
            sock.write(`Invalid Command. You must enter any number or 'BYE' to disconnect.\nEnter command:`);
        }
        // Write the data back to the socket, the client will receive it as data from the server
      //  sock.write('You said "' + data + '"');
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +':'+ sock.remotePort); 
    });
    sock.on('error', function(data) {
        console.log('TERMINATED: ' + sock.remoteAddress +':'+ sock.remotePort);
    });
});