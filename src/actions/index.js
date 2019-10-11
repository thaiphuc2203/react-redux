import * as types from './../constants/actionType';
export const listAll=()=>{
    return {
        type: types.LIST_ALL
    }
}
export const saveTask = (task)=>{
    return {
        type: types.SAVE_TASK,
        task:task
    }
}
export const clickForm=()=>{
    return {
      type: types.CLICK_FORM,
      
    };   
}
export const closeForm =()=>{
    return{
        type:types.CLOSE_FORM
    }
}
export const openForm =()=>{
    return{
        type:types.OPEN_FORM
    }
}
export const updateStatus =(id)=>{
    return{
        type:types.UPDATE_STATUS_TASK,
        id:id
    }
}
export const deleteItem =(id)=>{
    return{
        type:types.DELETE_ITEM,
        id:id
    }
}
export const editTask = (task)=>{
    return{
        type:types.EDIT_TASK,
        task:task
    }
}
export const filterTable = (filter)=>{
    return{
        type:types.FILTER_TABLE,
        filter:filter
    }
}
export const control = (controlName)=>{
    return{
        type:types.CONTROL,
        controlName:controlName
    }
}
