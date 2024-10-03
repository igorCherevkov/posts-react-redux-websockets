import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { getAllContacts } from "../http/chat";
import { User } from "../types";
import { CONTACT_CHAT_ROUTE } from "../consts/routes";
import { generatePath, Link } from "react-router-dom";
import { getFirstLetter } from "../utils/getFirstLetter";

export const ChatPage = () => {
  const [contacts, setContacts] = useState<User[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllContacts();
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  //   const handleCreateChat = async (contactId) => {
  //     const currentUser = useSelector((state) => state.user); // Получаем текущего пользователя из Redux
  //     const history = useHistory(); // Инициализируем хук истории

  //     try {
  //       // Отправляем запрос на создание чата
  //       const response = await axios.post("http://localhost:8000/chats", {
  //         usersIds: [currentUser.id, contactId], // Массив с ID пользователей
  //         isGroup: false, // Указываем, что это приватный чат
  //       });

  //       // Получаем ID нового чата
  //       const chatId = response.data.id;

  //       // Перенаправляем пользователя в новый чат
  //       history.push(`/chat/${chatId}`); // Замените на ваш путь к чату
  //     } catch (error) {
  //       console.error("Ошибка при создании чата:", error);
  //       // Можно добавить обработку ошибки, например, показать уведомление
  //     }
  //   };

  return (
    <>
      <Header />
      {contacts.map((contact) => (
        <div key={contact.id}>
          <div className="info__meta meta">
            {contact.userImg ? (
              <img src={contact.userImg} alt="user img" className="meta__img" />
            ) : (
              <div className="meta__img meta__placeholder-img">
                {getFirstLetter(contact.login)}
              </div>
            )}
            <div>
              <div className="meta__login">{contact.login}</div>
              <div className="meta__email">{contact.email}</div>
            </div>
            <Link
              to={generatePath(CONTACT_CHAT_ROUTE, {
                id: String(contact.id),
              })}
              // onClick={handleCreateChat}
            >
              Начать чат
            </Link>
          </div>
        </div>
      ))}
      <div>+ Создать групповой чат</div>
    </>
  );
};
