
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/serverEndpoint")
public class Server {
    @OnOpen
    public void handleOpen() {
        System.out.println("client is connected ...");
    }
    @OnMessage
    public String handleMessage(String message) {
        System.out.println("Message received from client : "+message);
        String response = "echo "+message.toUpperCase();
        System.out.println("send to client "+response);
        return response;
    }
    @OnClose
    public void handleClose() {
        System.out.println("client is disconnected...");
    }
    @OnError
    public void handleError(Throwable t) {
    }
}
