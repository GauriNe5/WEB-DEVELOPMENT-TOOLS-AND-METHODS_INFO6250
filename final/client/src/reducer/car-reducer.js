import { CarReducerConstant } from "../constants/car-reducer-constant";

/**
 *
 * @param {Object[]} state 
 * @param {Object} action 
 * @returns 
 */
function reducer(state, action) {
  switch (action.type) {
    case CarReducerConstant.GET_POST:
      return action.payload; 

    case CarReducerConstant.CREATE_POST:
      return [action.payload, ...state]; 
    case CarReducerConstant.DELETE_POST:
      return state.filter((item) => item.postId !== action.payload.postId); 
    case CarReducerConstant.UPDATE_POST:
      
      const postId = action.payload.postId;
      const updateField = action.payload.updateField;
      return state.map((item) => {
        if (item.postId === postId) {
          return { ...item, ...updateField };
        }
        return item;
      });
    default:
      return state;
  }
}

export default reducer;
