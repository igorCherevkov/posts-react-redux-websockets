import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "../../../redux/actions/usersActions";
import { getChat, getChatMessages } from "../../../http/chat";
import styles from "./Chat.module.css";

const socket = io("http://localhost:8000");

export const ChatComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { state } = useLocation();
  const isGroup = state.isGroup || false;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const anotherUser = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const [chatId, setChatId] = useState(null);
  const currentUserId = user?.id;
  const contactUserId = anotherUser.anotherUser?.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        if (currentUserId && contactUserId) {
          const res = await getChat([currentUserId, contactUserId], isGroup);
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
  }, [contactUserId, currentUserId, isGroup]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;
      try {
        const response = await getChatMessages(chatId);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
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
          <h2>{isGroup ? "Групповой чат" : "Личный чат"}</h2>
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
