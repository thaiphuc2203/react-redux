import * as types from './../constants/actionType';

var randomstring = require("randomstring");
var data= JSON.parse(localStorage.getItem('tasks'))

var findIndex = (task, id) => {
  let result = -1;
  task.forEach((element, index) => {
    if (element.id === id) {
      return (result = index);
    }
  });
  return result;
};
var initialState= data ? data:[];
var id='';
var index=-1;
var myReducer =(state=initialState, action)=>{
    switch (action.type) {
      case types.LIST_ALL:
        return state;
      case types.SAVE_TASK:
          console.log(action)
        id= action.task.id
        var name =action.task.name
        if(name !==''){
           if (id) {
             index = findIndex(state, id);
             let newTask = {
               id: id,
               name: name,
               status: action.task.status
             };
             state[index] = newTask;
           } else {
             let newTask = {
               id: randomstring.generate(),
               name: name,
               status: action.task.status
             };
             state.push(newTask);
           }
        }
              localStorage.setItem("tasks", JSON.stringify(state));
             return [...state]; 
      case types.UPDATE_STATUS_TASK:
        id = action.id;
        index = findIndex(state, id);
        state[index] = {
          ...state[index],
          status: !state[index].status
        };
        localStorage.setItem("tasks", JSON.stringify(state));
        return [...state];
      case types.DELETE_ITEM:
        id = action.id;
        index = findIndex(state, id);
        state.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(state));
        return [...state];
      default:
        return state;
    }
}
export default myReducer;