var files = ['styles.css'];

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        //fs.unwatchFile('styles.css');
        for(var i=0;i<files.length;i++) {
            fs.unwatchFile(files[i]);
        }
    });

    var fs = require('fs');
    var D = require('util').debug;

    for(var i=0;i<files.length;i++) {
        fs.watchFile(files[i], {interval: 1}, function(curr, prev) {
            if(curr.mtime > prev.mtime) {
                //console.log('file updated, reloading');
                connection.send(1);
            }
        });
    }

});




