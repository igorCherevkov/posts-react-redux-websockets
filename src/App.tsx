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
  ERROR_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOGOUT,
  REGISTRATION_ROUTE,
  USER_PROFILE_ROUTE,
} from "./consts/routes";
import { checkAuth } from "./redux/actions/authActions";
import { AppDispatch } from "./redux/store";
import { ErrorPage } from "./pages/ErrorPage";
import { ChatPage } from "./pages/ChatPage";

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
      </Routes>
    </Router>
  );
};

export default App;
