import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import { RootState } from "../../../redux/reducers/rootReducer";
import { getChatMessages } from "../../../http/chat";
import styles from "../Chat/Chat.module.css";
import { Header } from "../../Header/Header";
import { useLocation } from "react-router-dom";

import styles from "./GroupChat.module.css";

const socket = io("http://localhost:8000");

interface Message {
  userId: number;
  message: string;
}

export const GroupChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.authReducer.user);

  const { state } = useLocation();
  const chatId = state.chatId;

  console.log(chatId);

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
      <Header />

      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h2>Групповой чат</h2>
        </div>
        <div className={styles.chatMessages}>
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
