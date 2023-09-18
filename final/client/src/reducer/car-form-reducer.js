import CarFormConstant from "../constants/car-form-constant";

function reducer(state, action) {
  const payload = action.payload;
  switch (action.type) {
    case CarFormConstant.CREATE:
      return {
        state: CarFormConstant.CREATE,
        formInfo: {
          title: "",
          content: "",
          cover: "",
        },
      };
    case CarFormConstant.UPDATE:
      // Payload need to include: {postId, title, content, cover}
      return {
        state: CarFormConstant.UPDATE,
        formInfo: {
          ...payload,
        },
      };
    case CarFormConstant.CHANGE:
      return {
        state: state.state,
        formInfo: {
          ...state.formInfo,
          ...payload,
        },
      };
    case CarFormConstant.CLEAR:
      return {
        state: CarFormConstant.CREATE,
        formInfo: {
          title: "",
          content: "",
          cover: "",
        },
      };
    default:
      return state;
  }
}

export default reducer;
