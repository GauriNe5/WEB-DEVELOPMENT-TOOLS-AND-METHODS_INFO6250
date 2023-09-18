import CarFormConstant from "../constants/car-form-constant";
import { CarReducerConstant } from "../constants/car-reducer-constant";
import { deletePost, updatePost } from "../controller/car-controller";
import CarComment from "./CarComment";

function CarCard({
  userInfo,
  postInfoItem,
  dispatchPostInfo,
  dispatchPostFormInfo,
}) {
  const {
    postId,
    userId,
    username: postUserId,
    title,
    content,
    cover,
 
  } = postInfoItem;
  const { username } = userInfo;
  const isPostEditable = userInfo?.isAdmin || userId === userInfo?.userId;
 
  function onDeletePost(e) {
    deletePost(postId).then((res) => {
      const action = {
        type: CarReducerConstant.DELETE_POST,
        payload: {
          postId: res.postId,
        },
      };
      dispatchPostInfo(action);
    });
  }

  function onEditPost(e) {
    const action = {
      type: CarFormConstant.UPDATE,
      payload: { postId, title, content, cover },
    };
    dispatchPostFormInfo(action);
  }

  return (
    <li className="post-list-item">
      <div className="post-list-item-body">
        <img className="post-image" src={cover} alt={""} />
        <h2 className="post-title">{title}</h2>
        <p className="post-author">User: {postUserId}</p>
        <p className="post-content">{content}</p>
        <CarComment postId={postId} />
        <div className="post-list-item-action">
          
          {isPostEditable && (
            <>
              <button className="delete-button" onClick={onDeletePost}>
                Delete
              </button>
              <button className="edit-button" onClick={onEditPost}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export { CarCard };
