import { CarCard } from "./CarCard";

function CarList({
  userInfo,
  postInfo,
  dispatchPostInfo,
  dispatchPostFormInfo,
  setErrorMessage,
}) {
  const requestLoginView = (
    <div className="post-list">
      <p className="post-warning warning">Please Sign up to visit the Car Showroom.</p>
    </div>
  );

  const postView = (
    <div className="post-list">
      <ul className="post-ul">
        {postInfo.map((postInfoItem) => (
          <CarCard
            userInfo={userInfo}
            postInfoItem={postInfoItem}
            dispatchPostInfo={dispatchPostInfo}
            dispatchPostFormInfo={dispatchPostFormInfo}
            setErrorMessage={setErrorMessage}
            key={postInfoItem.postId}
          />
        ))}
      </ul>
    </div>
  );

  return userInfo?.userId ? postView : requestLoginView;
}

export default CarList;
