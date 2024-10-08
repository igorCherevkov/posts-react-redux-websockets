import { useSelector } from "react-redux";
import { ChatList } from "../ChatList/ChatList";
import styles from "./ChatWrap.module.css";
import { RootState } from "../../../redux/reducers/rootReducer";
import { useEffect, useRef, useState } from "react";
import { GroupModal } from "../../GroupModal/GroupModal";
import { generatePath, useNavigate } from "react-router-dom";
import { getAllChats, getAllContacts, getChat } from "../../../http/chat";
import { GROUP_CHAT_ROUTE } from "../../../consts/routes";
import { Header } from "../../Header/Header";

export const ChatWrap = ({ Component }) => {
  const user = useSelector((state: RootState) => state.authReducer.user);

  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      if (!user?.id) return;

      try {
        const response = await getAllChats(user.id);
        setChats(response.data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    const fetchUsers = async () => {
      if (!user?.id) return;

      try {
        const response = await getAllContacts(user.id);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
    fetchUsers();
  }, [user?.id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = async (selectedUsers) => {
    try {
      if (selectedUsers) {
        const isGroup = true;
        const res = await getChat([user?.id, ...selectedUsers], isGroup);
        navigate(generatePath(GROUP_CHAT_ROUTE, { id: res.data.id }), {
          state: { chatId: res.data.id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.chatApp}>
      <Header />

      <div className={styles.chatWrap}>
        <div className={styles.chatPageContainer}>
          <div className={styles.chatList}>
            <div>
              <ChatList chats={chats} />
            </div>
            <button
              className={styles.createGroupButton}
              onClick={handleOpenModal}
            >
              + Создать групповой чат
            </button>
          </div>
          <div className={styles.chatContainer}>
            <Component />
          </div>
        </div>

        <GroupModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          users={users}
        />
      </div>
    </div>
  );
};
