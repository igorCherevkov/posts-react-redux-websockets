import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import { RootState } from "../../../redux/reducers/rootReducer";
import { getChatMessages } from "../../../http/chat";
import styles from "../ChatComponent/Chat.module.css";
import { Header } from "../../Header/Header";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:8000");

interface Message {
  userId: number;
  message: string;
}

export const GroupChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.authReducer.user);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const { state } = useLocation();
  const chatId = state.chatId;

  const currentUserId = user?.id;

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) {
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
    socket.emit("joinChat", chatId);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [chatId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && chatId) {
      const messageData = {
        chatId,
        userId: currentUserId,
        message: newMessage,
      };

      socket.emit("sendMessage", messageData);

      setNewMessage("");
    }
  };

  return (
    <>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h2>Групповой чат</h2>
        </div>
        <div className={styles.chatMessages} ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.userId === currentUserId
                  ? styles.myMessage
                  : styles.contactMessage
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.chatInput}>
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
