function sendMessage() {
    if (window.WebSocket) {
        var ws = new WebSocket("ws://localhost:10374/ServerProject/serverEndpoint");
        ws.onopen = function () {
            ws.send($("#textMessage").val());
            $("#message").append("Message is sent...\n");
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            $("#message").append(evt.data + " \n");
        };
        ws.onclose = function () {
            $("#message").append("Connection is closed...\n");
        };
        window.onbeforeunload = function (event) {
            socket.close();
        };
    } else {
        $("#message").append("WebSocket NOT supported by your Browser!");
    }
}


