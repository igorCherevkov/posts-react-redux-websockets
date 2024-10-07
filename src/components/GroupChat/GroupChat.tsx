import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import { RootState } from "../../redux/reducers/rootReducer";
import { ERROR_ROUTE } from "../../consts/routes";
import { getChat, getChatMessages } from "../../http/chat";
import "../Chat/Chat.css";
import { Header } from "../Header/Header";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000");

interface Message {
  userId: number;
  message: string;
}

export const GroupChat = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.authReducer.user);

  const [chatId, setChatId] = useState<number | null>(null);
  const currentUserId = user?.id;

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) {
        console.log("no id");
        return;
      }

      try {
        const response = await getChatMessages(chatId);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await getChat([1, 2, 3], true);
        setChatId(res.data.id);

        socket.emit("joinChat", res.data.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChat();

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && chatId) {
      const messageData = {
        chatId,
        userId: user.id,
        message: newMessage,
      };

      socket.emit("sendMessage", messageData);

      setNewMessage("");
    }
  };

  return (
    <>
      <Header />

      <div className="chat-container">
        <div className="chat-header">
          <h2>Групповой чат</h2>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.userId === currentUserId ? "my-message" : "contact-message"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Введите сообщение..."
          />
          <button onClick={sendMessage}>Отправить</button>
        </div>
      </div>
    </>
  );
};
