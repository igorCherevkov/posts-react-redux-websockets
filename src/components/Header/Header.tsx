import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link } from "react-router-dom";
import { useCallback } from "react";

import "./Header.css";
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
    <header className="header-container">
      <div className="header-container__wrap header">
        <Link to="/" className="header__logo">
          MyPosts
        </Link>
        <div className="header__auth-buttons">
          {user.isAuth ? (
            <>
              <Link to={CHAT_ROUTE} className="header__button">
                Чат
              </Link>
              <Link
                to={generatePath(USER_PROFILE_ROUTE, {
                  id: String(user.user?.id),
                })}
                className="header__button"
              >
                Профиль
              </Link>
              <Link
                to={LOGOUT}
                className="header__button"
                onClick={handleLogout}
              >
                Выйти
              </Link>
            </>
          ) : (
            <>
              <Link to={REGISTRATION_ROUTE} className="header__button">
                Зарегистрироваться
              </Link>
              <Link to={LOGIN_ROUTE} className="header__button">
                Войти
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
