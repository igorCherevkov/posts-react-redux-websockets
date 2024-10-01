import { useCallback } from "react";

import "./UserProfile.css";
import { UserForRender } from "../../types/redux/usersTypes";
import { getFirstLetter } from "../../utils/getFirstLetter";
import { Posts } from "../Posts/Posts";
import { FilledAlert } from "../Error/Error";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../consts/routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addPost } from "../../redux/actions/postsActions";

export const UserProfile = ({
  id,
  user,
}: {
  id: number | null;
  user: UserForRender;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isEmpty = user.posts.length === 0;

  const showForm = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const addPostContainer = event.currentTarget.parentNode as HTMLElement;
    const form = addPostContainer.querySelector(
      ".add-post-form"
    ) as HTMLElement;
    const title = addPostContainer.querySelector(
      ".add-post-container__title"
    ) as HTMLElement;

    title.style.display = "none";
    form.style.display = "flex";
    form.style.flexDirection = "column";
  };

  const hideForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formContainer = event.currentTarget.closest(
      ".add-post-container"
    ) as HTMLElement;
    const addPost = formContainer.querySelector(
      ".add-post-container__title"
    ) as HTMLElement;
    const form = formContainer.querySelector(".add-post-form") as HTMLElement;
    const title = formContainer.querySelector(
      ".add-post-form__post-title"
    ) as HTMLInputElement;
    const content = formContainer.querySelector(
      ".add-post-form__post-content"
    ) as HTMLInputElement;

    form.style.display = "none";
    addPost.style.display = "block";

    title.required = false;
    content.required = false;
  };

  const sendPost: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      formData.append("userId", String(user.id));

      try {
        dispatch(addPost(formData));
        navigate(HOME_ROUTE);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, navigate, user.id]
  );

  return (
    <div className="user-profile__container user-profile">
      <div className="user-profile__info info">
        <div className="info__meta meta">
          {user.userImg ? (
            <img src={user.userImg} alt="user img" className="meta__img" />
          ) : (
            <div className="meta__img meta__placeholder-img">
              {getFirstLetter(user.login)}
            </div>
          )}
          <div>
            <div className="meta__login">{user.login}</div>
            <div className="meta__email">{user.email}</div>
          </div>
        </div>
        {id === user.id && (
          <div className="user-profile__add-post-container add-post-container">
            <span className="add-post-container__title" onClick={showForm}>
              + Добавить пост
            </span>
            <form
              onSubmit={sendPost}
              className="add-post-container__form add-post-form"
            >
              <input
                type="text"
                name="title"
                className="add-post-form__post-title"
                placeholder="Заголовок поста"
              />
              <textarea
                name="content"
                className="add-post-form__post-content"
                placeholder="Текст поста"
              />
              <input
                type="file"
                name="postImg"
                className="add-post-form__img"
                accept=".jpg, .jpeg, .png"
              />
              {/* <textarea
                name="tags"
                className="add-post-form__post-tags"
                placeholder="Теги (через пробел)"
              /> */}
              <div className="add-post-form__buttons form-buttons">
                <button
                  type="submit"
                  id="add-post-form__post-button"
                  className="add-post-form__post-button"
                >
                  Добавить
                </button>
                <button
                  className="add-post-form__post-button"
                  onClick={hideForm}
                >
                  X
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <main className="user-profile__main profile-main">
        <div className="profile-main__container">
          {isEmpty && <FilledAlert message="Постов нет" severity="info" />}
          {!isEmpty &&
            user.posts.map((post) => (
              <Posts key={post.id} post={post} user={user} />
            ))}
        </div>
      </main>
    </div>
  );
};
