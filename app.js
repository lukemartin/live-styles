var args = process.argv.splice(2),
    files = args,
    port = 1337;

if(/^([\d]+)$/m.test(args[args.length - 1])) port = files.splice(files.length - 1);

if(files.length === 0) {
    console.log('No files specified. Try \'node app.js styles.css morestyles.css\'');
    return;
}

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
});
server.listen(port, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

console.log('- Hello :) Server is set up. Waiting for connections');
if(port !== 1337) console.log('- Don\'t forget to tell client.js to connect to port ' + port + ' :)');

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin),
        fs = require('fs');

    console.log('- Connection opened');

    connection.on('close', function(connection) {
        // close user connection
        console.log('- Connection closed');
        for(var i=0;i<files.length;i++) {
            fs.unwatchFile(files[i]);
        }
        console.log('-------------------------------------');
    });

    console.log('- Watching the following file(s) for changes: ' + files.join(', '));

    for(var i = 0; i < files.length; i++) {
        // anonymous function - sorry!
        (function(z) {
            fs.watchFile(files[z], {interval: 1}, function(curr, prev) {
                if(curr.mtime > prev.mtime) {
                    console.log('- CHANGE DETECTED on file ' + files[z] + '. Sending reload request');
                    connection.send(1);
                }
            });
        })(i);
    }
});




