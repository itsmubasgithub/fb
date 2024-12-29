import React from "react";
import Skeleton from "react-loading-skeleton";
const PostLoader = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <div key={index} className="card my-2 w-100 p-4 border-0 shadow">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <Skeleton width={50} height={50} circle />
                <div className="d-flex flex-column">
                  <Skeleton width={100} height={10} />
                  <Skeleton width={70} height={10} />
                </div>
              </div>
              <Skeleton width={30} height={10} />
            </div>
            <Skeleton count={3} />
            <Skeleton width={"100%"} height={400} />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <Skeleton width={30} height={20} />
                <Skeleton width={30} height={20} />
                <Skeleton width={30} height={20} />
              </div>
              <div className="d-flex align-items-center gap-2">
                <Skeleton width={70} />
                <Skeleton width={70} />
              </div>
            </div>
            <hr className="m-1" />
            <div className="d-flex justify-content-between align-items-center">
              <Skeleton width={80} height={30} />
              <Skeleton width={80} height={30} />
              <Skeleton width={80} height={30} />
              <Skeleton width={80} height={30} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostLoader;
