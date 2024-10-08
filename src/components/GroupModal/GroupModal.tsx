import { useState } from "react";

import styles from "./GroupModal.module.css";

export const GroupModal = ({ isOpen, onClose, onConfirm, users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedUsers);
    onClose(); // Закрываем модалку после подтверждения
  };

  if (!isOpen) return null; // Модалка рендерится только если открыта

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Выберите пользователей для группового чата</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
                {user.login}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleConfirm}>Создать чат</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};
