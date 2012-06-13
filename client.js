(function () {
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var connection = new WebSocket('ws://127.0.0.1:1337');
    
    connection.onmessage = function (message) {
        if(message.data === '1') {
            reloadSheets();
        }
    };

    function reloadSheets() {
        var queryString = '?reload=' + new Date().getTime();
        var sheet = document.getElementsByTagName('link');
        var i = sheet.length;

        while(i--) {
          sheet[i].setAttribute('href', sheet[i].getAttribute('href').replace(/\?.*|$/, queryString));
        }

        console.log('Stylesheets have been reloaded');
        connection.send(2);
    }
}());