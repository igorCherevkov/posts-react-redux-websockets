import { generatePath, Link, useLocation } from "react-router-dom";

import styles from "./Posts.module.css";
import { HOME_ROUTE, USER_PROFILE_ROUTE } from "../../consts/routes";
import { getFirstLetter } from "../../utils/getFirstLetter";
import { transformDate } from "../../utils/transformDate";
import { Post, User } from "../../types";

export const Posts = ({ post, user }: { post: Post; user: User }) => {
  const location = useLocation();

  const imgUrl = `${import.meta.env.VITE_BACKEND_URL}/${
    post.postImg?.split("/")[2]
  }`;

  return (
    <div className={styles.mainPostCard}>
      <div className={styles.postCardMeta}>
        {user.userImg ? (
          <img
            src={user.userImg}
            alt="user img"
            className={styles.metaContainerImg}
          />
        ) : (
          <div
            className={`${styles.metaContainerImg} ${styles.authorImgPlaceholder}`}
          >
            {getFirstLetter(user.login)}
          </div>
        )}
        <div className={styles.metaContainerAuth}>
          <div className={styles.authContainerEmail}>{user.email}</div>

          {location.pathname === HOME_ROUTE ? (
            <Link
              to={generatePath(USER_PROFILE_ROUTE, { id: String(user.id) })}
              className={styles.authContainerLogin}
            >
              {user.login}
            </Link>
          ) : (
            <span>{user.login}</span>
          )}
          <div className={styles.authContainerDate}>
            {transformDate(post.created_at)}
          </div>
        </div>
      </div>
      <div className={styles.postCardImg}>
        {post.postImg ? (
          <img src={imgUrl} alt="post img" className={styles.imgContainerImg} />
        ) : null}
      </div>
      <div className={styles.postCardContent}>
        <div className={styles.contentContainerTitle}>{post.title}</div>
        <div className={styles.contentContainerText}>{post.content}</div>
      </div>
      <div className={styles.postCardTags}>
        {post.tags.map((tag) => (
          <span key={tag.name} className={styles.tagsContainerTag}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};
