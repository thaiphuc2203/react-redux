import * as types from "./../constants/actionType";

var initialState = false;

var myReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.CLICK_FORM:
        return !state;
      case types.CLOSE_FORM:
        return false
      case types.OPEN_FORM:
        return true
      default: return state;
    }
}    
export default myReducer;
