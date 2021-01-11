package com.example.letsmeet.WebSocket;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class WSHandler extends TextWebSocketHandler{
	
	private static List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();
	
	

}
