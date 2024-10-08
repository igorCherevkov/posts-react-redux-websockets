import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link } from "react-router-dom";
import { useCallback } from "react";

import styles from "./Header.module.css";
import {
  CHAT_ROUTE,
  LOGIN_ROUTE,
  LOGOUT,
  REGISTRATION_ROUTE,
  USER_PROFILE_ROUTE,
} from "../../consts/routes";
import { RootState } from "../../redux/reducers/rootReducer";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/authActions";

export const Header = () => {
  const user = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    window.location.reload();
  }, [dispatch]);

  return (
    <header className={styles.headerContainer}>
      <div className={`${styles.headerContainerWrap} header`}>
        <Link to="/" className={styles.headerLogo}>
          MyPosts
        </Link>
        <div className={styles.headerAuthButtons}>
          {user.isAuth ? (
            <>
              <Link to={CHAT_ROUTE} className={styles.headerButton}>
                Чат
              </Link>
              <Link
                to={generatePath(USER_PROFILE_ROUTE, {
                  id: String(user.user?.id),
                })}
                className={styles.headerButton}
              >
                Профиль
              </Link>
              <Link
                to={LOGOUT}
                className={styles.headerButton}
                onClick={handleLogout}
              >
                Выйти
              </Link>
            </>
          ) : (
            <>
              <Link to={REGISTRATION_ROUTE} className={styles.headerButton}>
                Зарегистрироваться
              </Link>
              <Link to={LOGIN_ROUTE} className={styles.headerButton}>
                Войти
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
