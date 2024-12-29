import { useEffect } from "react";
import CreatePost from "./CreatePost";
import MyPost from "./MyPost";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getPostData, postReset } from "../../features/posts/postSlice";
import Skeleton from "react-loading-skeleton";
import PostLoader from "./PostLoader";

const Posts = () => {
  const dispatch = useDispatch();
  const { postLoading, postError, postMessage, posts } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (postError) {
      toast(postMessage);

      dispatch(getPostData());
    }
    dispatch(postReset());
  }, [dispatch]);
  return (
    <>
      <div className="col-xxl-7 col-xl-11 col-lg-10  mx-auto">
        <CreatePost />
        {postLoading ? (
          <PostLoader />
        ) : (
          <>
            {posts?.map((item, index) => {
              return <MyPost key={index} {...item} />;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
