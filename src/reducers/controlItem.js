import * as types from "./../constants/actionType";

var initialState = {
  sortBy: "name",
  sortValue: 1,
  searchName: ""
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CONTROL:
        console.log({action,state})
        state = {
          sortBy: action.controlName.sortBy,
          sortValue: action.controlName.sortValue,
          searchName: action.controlName.searchName.toLowerCase()
        };
      return state;
    default:
      return state;
  }
};
export default myReducer;
