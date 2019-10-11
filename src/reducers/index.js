import { combineReducers } from 'redux';
import tasks from './tasks'
 
import isDisplayForm from './isDisplayForm'
import taskEditing from './taskEditing'
import  filterTable  from './filterTable';
import controlItem from './controlItem'
 
const myReducer = combineReducers({
    tasks:tasks,
    isDisplayForm:isDisplayForm,
    taskEditing:taskEditing,
    filterTable:filterTable,
    controlItem:controlItem
});
export default myReducer;