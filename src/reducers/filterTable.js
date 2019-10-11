import * as types from "./../constants/actionType";

var initialState = {
    name:'',
    value:-1
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_TABLE:
      state = {
        name: action.filter.filterName,
        value: parseInt(action.filter.filterStatus, 10)
      };
      return state;
    default:
      return state;
  }
};
export default myReducer;
