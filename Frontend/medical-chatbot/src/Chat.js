import React, { useState, useEffect } from 'react';
import Message from './Message'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

    const socket = new WebSocket('ws://localhost:8000/ws'); 

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      console.log('Received:', event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: event.data, isUser: false },
      ]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && message) {
      ws.send(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h4>WebSocket Medical Bot</h4>
        </div>
        <div className="card-body" style={{ height: '300px', overflowY: 'auto' }}>
          <div className="message-container">
            {messages.map((msg, index) => (
              <Message key={index} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button
              className="btn btn-primary ms-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
