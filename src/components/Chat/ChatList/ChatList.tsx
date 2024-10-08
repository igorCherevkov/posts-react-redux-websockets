import { generatePath, Link } from "react-router-dom";
import { getFirstLetter } from "../../../utils/getFirstLetter";
import styles from "./ChatList.module.css";
import { CONTACT_CHAT_ROUTE, GROUP_CHAT_ROUTE } from "../../../consts/routes";

export const ChatList = ({ chats }) => {
  if (chats.length === 0) {
    return <div className={styles.noChats}>Чатов нет</div>;
  }

  console.log(chats[0].messages[0].message);

  return (
    <>
      {chats.map((contact) => (
        <div key={contact.id} className={styles.chatItem}>
          <div className={styles.meta}>
            {contact.users[0].user.userImg ? (
              <img
                src={contact.users[0].user.userImg}
                alt="user img"
                className={styles.metaImg}
              />
            ) : (
              <div className={styles.metaPlaceholderImg}>
                {contact.isGroup ? (
                  <div className={styles.groupAvatars}>
                    {contact.users.slice(0, 2).map((user, index) => (
                      <div key={index} className={styles.groupAvatar}>
                        {getFirstLetter(user.user.login)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>{getFirstLetter(contact.users[0].user.login)}</>
                )}
              </div>
            )}
            <div className={styles.metaInfo}>
              <div className={styles.metaLogin}>
                {contact.users[0].user.login}
              </div>
              <div className={styles.metaMessage}>
                {contact.messages[0].message}
              </div>
            </div>

            {contact.isGroup ? (
              <Link
                to={generatePath(GROUP_CHAT_ROUTE, {
                  id: String(contact.users[0].user.id),
                })}
                state={{ chatId: contact.id }}
                className={styles.chatLink}
              >
                Начать чат
              </Link>
            ) : (
              <Link
                to={generatePath(CONTACT_CHAT_ROUTE, {
                  id: String(contact.users[0].user.id),
                })}
                state={{ isGroup: contact.isGroup }}
                className={styles.chatLink}
              >
                Начать чат
              </Link>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
