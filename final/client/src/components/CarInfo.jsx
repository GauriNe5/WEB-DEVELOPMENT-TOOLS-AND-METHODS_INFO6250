import CarFormConstant from "../constants/car-form-constant";
import { CarReducerConstant } from "../constants/car-reducer-constant";
import { updatePost, createPost } from "../controller/car-controller";
function CarInfo({
  postFormInfo,
  dispatchPostFormInfo,
  dispatchPostInfo,
  setErrorMessage,
}) {
  const currentState = postFormInfo.state;

  /**
  
   * @param {Event} e 
   */
  function onInputChange(e) {
    e.preventDefault();
    const actionObj = {
      type: CarFormConstant.CHANGE,
      payload: { [e.target.name]: e.target.value || "" },
    };
    dispatchPostFormInfo(actionObj);
  }

  /**
  
   * @param {Event} e Event object of the form
   */
  function onSubmitForm(e) {
    e.preventDefault();
    const formBody = {
      title: e.target.title.value,
      content: e.target.content.value,
      cover: e.target.cover?.value || "https://cdn.jdpower.com/jdp_2022%20tesla%20model%203%20red%20front%20quarter%20view.jpg",
    };
    switch (currentState) {
      case CarFormConstant.CREATE:
        createPost(formBody).then((res) => {
          dispatchPostFormInfo({
            type: postFormInfo.CREATE,
          });
          dispatchPostInfo({
            type: CarReducerConstant.CREATE_POST,
            payload: res,
          });
        });

        break;
      case CarFormConstant.UPDATE:
        const postId = postFormInfo.formInfo.postId;
        updatePost(postId, formBody).then((res) => {
          dispatchPostFormInfo({
            type: CarFormConstant.CREATE,
          });
          dispatchPostInfo({
            type: CarReducerConstant.UPDATE_POST,
            payload: {
              postId,
              updateField: res,
            },
          });
        });
        break;
      default:
        break;
    }
  }

  
  function onResetForm() {
    dispatchPostFormInfo({
      type: CarFormConstant.CLEAR,
    });
  }

  function getFormTitle() {
    switch (currentState) {
      case CarFormConstant.CREATE:
        return <h2 className="post-form-header">Create New Post</h2>;
      case CarFormConstant.UPDATE:
        return <h2 className="post-form-header">Update Post</h2>;
      default:
        break;
    }
  }

  return (
    <div className="post-form">
      <form action="" onSubmit={onSubmitForm} onReset={onResetForm}>
        {getFormTitle()}
        <label htmlFor="">
          Title:{" "}
          <input
            type="text"
            name="title"
            value={postFormInfo.formInfo.title}
            onChange={onInputChange}
            required
          />
        </label>
        <label htmlFor="">
          Content:{" "}
          <textarea
            type="text"
            name="content"
            value={postFormInfo.formInfo.content}
            onChange={onInputChange}
            rows={5}
            required
          />
        </label>
        <label htmlFor="">
          Cover Image URL:{" "}
          <input
            type="text"
            name="cover"
            value={postFormInfo.formInfo.cover}
            onChange={onInputChange}
            required
          />
        </label>
        <div className="post-form-action">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
}
export default CarInfo;
