import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css";
import { Header } from "../../components/Header/Header";
import { fetchPosts } from "../../redux/actions/postsActions";
import { RootState } from "../../redux/reducers/rootReducer";
import { AppDispatch } from "../../redux/store";
import { Loader } from "../../components/Loader/Loader";
import { Posts } from "../../components/Posts/Posts";
import { FilledAlert } from "../../components/Error/Error";

export const HomePage = () => {
  const posts = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();

  const isEmpty = posts.posts.length === 0;
  const isError = posts.error !== null && posts.error !== undefined;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (posts.isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isError && <FilledAlert message={posts.error} severity="error" />}
      {!isError && isEmpty && (
        <>
          <Header />
          <main className="main-container">
            <div className="main-container__wrap main">
              <FilledAlert message="Постов нет" severity="info" />
            </div>
          </main>
        </>
      )}
      {!isEmpty && (
        <>
          <Header />
          <main className="main-container">
            <div className="main-container__wrap main">
              {posts.posts.map((post) => (
                <Posts key={post.id} post={post} user={post.user} />
              ))}
            </div>
          </main>
        </>
      )}
    </>
  );
};
