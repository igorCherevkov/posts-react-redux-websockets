import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { RootState } from "../../redux/reducers/rootReducer";
import "./Chat.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { ERROR_ROUTE } from "../../consts/routes";
import { fetchUser } from "../../redux/actions/usersActions";

const socket = io("http://localhost:8000");

export const ChatComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const anotherUser = useSelector((state: RootState) => state.usersReducer);
  const user = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch<AppDispatch>();

  const chatId = 3;
  const currentUserId = user?.id;
  const contactUserId = anotherUser.anotherUser?.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id, user, navigate]);

  useEffect(() => {
    if (anotherUser.error) {
      navigate(ERROR_ROUTE);
    }
  }, [anotherUser.error, navigate]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
