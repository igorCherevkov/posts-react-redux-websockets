import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { getAllChats, getAllContacts, getChat } from "../http/chat";
import { CONTACT_CHAT_ROUTE, GROUP_CHAT_ROUTE } from "../consts/routes";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { getFirstLetter } from "../utils/getFirstLetter";
import { RootState } from "../redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import { GroupModal } from "../components/GroupModal/GroupModal";

export const ChatPage = () => {
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

  console.log(users);

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
          state: { isGroup: true },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      {chats.length > 0 &&
        chats.map((contact) => (
          <div key={contact.id}>
            <div className="info__meta meta">
              {contact.users[0].user.userImg ? (
                <img
                  src={contact.users[0].user.userImg}
                  alt="user img"
                  className="meta__img"
                />
              ) : (
                <div className="meta__img meta__placeholder-img">
                  {getFirstLetter(contact.users[0].user.login)}
                </div>
              )}
              <div>
                <div className="meta__login">{contact.users[0].user.login}</div>
                <div className="meta__email">{contact.users[0].user.email}</div>
              </div>
              {contact.isGroup ? (
                <Link
                  to={generatePath(GROUP_CHAT_ROUTE, {
                    id: String(contact.users[0].user.id),
                  })}
                >
                  Начать чат
                </Link>
              ) : (
                <Link
                  to={generatePath(CONTACT_CHAT_ROUTE, {
                    id: String(contact.users[0].user.id),
                  })}
                  state={{ isGroup: contact.isGroup }}
                >
                  Начать чат
                </Link>
              )}
            </div>
          </div>
        ))}
      <button onClick={handleOpenModal}>+ Создать групповой чат</button>
      <GroupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        users={users} // Передаем всех пользователей в модалку
      />
    </>
  );
};
