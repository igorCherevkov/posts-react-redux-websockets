import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import { RootState } from "../../redux/reducers/rootReducer";
import "./Chat.css";

// Подключаемся к WebSocket серверу
const socket = io("http://localhost:8000");

export const ChatComponent = () => {
  // Задаем фиксированные значения
  const chatId = 1;
  const currentUserId = 2;
  const contactUserId = 1;

  const contactUser = useSelector((state: RootState) => state.chatReducer);
  const user = useSelector((state: RootState) => state.authReducer.user);

  console.log(user, contactUser);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (2) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id, user, navigate]);

  useEffect(() => {
    // Присоединяемся к чату
    socket.emit("joinChat", chatId);

    // Слушаем сообщения из WebSocket
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Очищаем слушатели при размонтировании компонента
    return () => {
      socket.off("message");
    };
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        chatId,
        userId: currentUserId, // Используем идентификатор текущего пользователя
        message: newMessage,
      };

      // Отправляем сообщение через WebSocket
      socket.emit("sendMessage", messageData);

      // Очищаем поле ввода после отправки
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Чат с пользователем {contactUserId}</h2>
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
  );
};
