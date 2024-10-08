import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { HomePage } from "./pages/Main/HomePage";
import { UserPage } from "./pages/UserPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import {
  CHAT_ROUTE,
  CONTACT_CHAT_ROUTE,
  ERROR_ROUTE,
  GROUP_CHAT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOGOUT,
  REGISTRATION_ROUTE,
  USER_PROFILE_ROUTE,
} from "./consts/routes";
import { checkAuth } from "./redux/actions/authActions";
import { AppDispatch } from "./redux/store";
import { ErrorPage } from "./pages/ErrorPage";
import { ChatPage } from "./pages/ChatPage/ChatPage";
import { ChatComponent } from "./components/Chat/ChatComponent/ChatComponent";
import { GroupChat } from "./components/Chat/GroupChat/GroupChat";
import { ChatWrap } from "./components/Chat/ChatWrap/ChatWrap";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path={HOME_ROUTE} element={<HomePage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />
        <Route path={USER_PROFILE_ROUTE} element={<UserPage />} />
        <Route path={LOGOUT} element={<Outlet />} />
        <Route path={ERROR_ROUTE} element={<ErrorPage />} />
        <Route path={CHAT_ROUTE} element={<ChatPage />} />
        <Route
          path={CONTACT_CHAT_ROUTE}
          element={<ChatWrap Component={ChatComponent} />}
        />
        <Route
          path={GROUP_CHAT_ROUTE}
          element={<ChatWrap Component={GroupChat} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
