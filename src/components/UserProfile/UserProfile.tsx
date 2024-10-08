import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./UserProfile.module.css"; // Импорт модульных стилей
import { UserForRender } from "../../types/redux/usersTypes";
import { getFirstLetter } from "../../utils/getFirstLetter";
import { Posts } from "../Posts/Posts";
import { FilledAlert } from "../Error/Error";
import { HOME_ROUTE } from "../../consts/routes";
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
      `.${styles.addPostForm}`
    ) as HTMLElement;
    const title = addPostContainer.querySelector(
      `.${styles.addPostContainerTitle}`
    ) as HTMLElement;

    title.style.display = "none";
    form.style.display = "flex";
    form.style.flexDirection = "column";
  };

  const hideForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formContainer = event.currentTarget.closest(
      `.${styles.addPostContainer}`
    ) as HTMLElement;
    const addPost = formContainer.querySelector(
      `.${styles.addPostContainerTitle}`
    ) as HTMLElement;
    const form = formContainer.querySelector(
      `.${styles.addPostForm}`
    ) as HTMLElement;
    const title = formContainer.querySelector(
      `.${styles.addPostFormPostTitle}`
    ) as HTMLInputElement;
    const content = formContainer.querySelector(
      `.${styles.addPostFormPostContent}`
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
    <div className={styles.userProfileContainer}>
      <div className={styles.userProfileInfo}>
        <div className={styles.infoMeta}>
          {user.userImg ? (
            <img src={user.userImg} alt="user img" className={styles.metaImg} />
          ) : (
            <div className={`${styles.metaImg} ${styles.metaPlaceholderImg}`}>
              {getFirstLetter(user.login)}
            </div>
          )}
          <div>
            <div className={styles.metaLogin}>{user.login}</div>
            <div className={styles.metaEmail}>{user.email}</div>
          </div>
        </div>
        {id === user.id && (
          <div className={styles.addPostContainer}>
            <span className={styles.addPostContainerTitle} onClick={showForm}>
              + Добавить пост
            </span>
            <form onSubmit={sendPost} className={styles.addPostForm}>
              <input
                type="text"
                name="title"
                className={styles.addPostFormPostTitle}
                placeholder="Заголовок поста"
              />
              <textarea
                name="content"
                className={styles.addPostFormPostContent}
                placeholder="Текст поста"
              />
              <input
                type="file"
                name="postImg"
                className={styles.addPostFormImg}
                accept=".jpg, .jpeg, .png"
              />
              <div className={styles.addPostFormButtons}>
                <button
                  type="submit"
                  id={styles.addPostFormPostButton}
                  className={styles.addPostFormPostButton}
                >
                  Добавить
                </button>
                <button
                  className={styles.addPostFormPostButton}
                  onClick={hideForm}
                >
                  X
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <main className={styles.userProfileMain}>
        <div className={styles.profileMainContainer}>
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
