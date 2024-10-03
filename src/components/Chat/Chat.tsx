import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { RootState } from "../../redux/reducers/rootReducer";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { ERROR_ROUTE } from "../../consts/routes";
import { fetchUser } from "../../redux/actions/usersActions";
import { getChat } from "../../http/chat";
import "./Chat.css";

const socket = io("http://localhost:8000");

interface Message {
  userId: number;
  message: string;
}

export const ChatComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const anotherUser = useSelector((state: RootState) => state.usersReducer);
  const user = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch<AppDispatch>();

  const [chatId, setChatId] = useState<number | null>(null);
  const currentUserId = user?.id;
  const contactUserId = anotherUser.anotherUser?.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (anotherUser.error) {
      navigate(ERROR_ROUTE);
    }
  }, [anotherUser.error, navigate]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        if (currentUserId && contactUserId) {
          const res = await getChat([currentUserId, contactUserId], false);
          setChatId(res.data.id);

          socket.emit("joinChat", res.data.id);
        }
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
  }, [contactUserId, currentUserId]);

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
