import { generatePath, Link, useLocation } from "react-router-dom";

import "./Posts.css";
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
    <div className="main__post-card post-card">
      <div className="post-card__meta meta-container">
        {user.userImg ? (
          <img
            src={user.userImg}
            alt="user img"
            className="meta-container__img"
          />
        ) : (
          <div className="meta-container__img author-img-placeholder">
            {getFirstLetter(user.login)}
          </div>
        )}
        <div className="meta-container__auth auth-container">
          <div className="auth-container__email">{user.email}</div>

          {location.pathname === HOME_ROUTE ? (
            <Link
              to={generatePath(USER_PROFILE_ROUTE, { id: String(user.id) })}
              className="auth-container__login"
            >
              {user.login}
            </Link>
          ) : (
            <span>{user.login}</span>
          )}
          <div className="auth-container__date">
            {transformDate(post.created_at)}
          </div>
        </div>
      </div>
      <div className="post-card__img img-container">
        {post.postImg ? (
          <img src={imgUrl} alt="post img" className="img-container__img" />
        ) : null}
      </div>
      <div className="post-card__content content-container">
        <div className="content-container__title">{post.title}</div>
        <div className="content-container__text">{post.content}</div>
      </div>
      <div className="post-card__tags tags-container">
        {post.tags.map((tag) => (
          <span className="tags-container__tag">{tag.name}</span>
        ))}
      </div>
    </div>
  );
};
