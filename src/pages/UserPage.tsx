import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { RootState } from "../redux/reducers/rootReducer";
import { AppDispatch } from "../redux/store";
import { fetchUser } from "../redux/actions/usersActions";
import { Loader } from "../components/Loader/Loader";
import { ERROR_ROUTE } from "../consts/routes";

export const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userProfile = useSelector((state: RootState) => state.usersReducer);
  const user = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id, user, navigate]);

  useEffect(() => {
    if (userProfile.error) {
      navigate(ERROR_ROUTE);
    }
  }, [userProfile.error, navigate]);

  return (
    <>
      <Header />
      {userProfile.isLoading ? (
        <Loader />
      ) : (
        userProfile.anotherUser && (
          <UserProfile
            id={user ? user.id : null}
            user={userProfile.anotherUser}
          />
        )
      )}
    </>
  );
};
