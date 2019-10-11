import React, { Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import $ from "jquery";
import {connect} from 'react-redux';
import * as actions from './../actions/index'
window.jQuery = $;
window.$ = $;
global.jQuery = $;
// const bootstrap = require('bootstrap');


class TaskItem extends Component {
  onUpdateStatus = ()=>{
    this.props.onUpdateStatus(this.props.task.id);
  }
  onDeleteItem=()=>{
    this.props.onDeleteItem(this.props.task.id)
  }
  onUpdateTask=()=>{
    this.props.onOpenForm()
    this.props.onEditTask(this.props.task)
  }
  render() {
    const { task, index } = this.props;
    return (
      <tr>
        <td> {index + 1} </td>
        <td>{task.name}</td>
        <td className="text-center">
          <Button type={task.status === true ? "danger" : "primary"} onClick={this.onUpdateStatus}>
            {task.status === true ? "Active" : "InActive"}
          </Button>
        </td>
        <td className="text-center">
          <Button type="default"
          onClick={this.onUpdateTask}>
            <i className="far fa-edit"></i>&nbsp; Edit
          </Button>
          &nbsp;
          <Button type="danger" onClick={this.onDeleteItem}> 
            <i className="far fa-trash-alt"></i>&nbsp; Delete
          </Button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = state => {
  return { };
};
const mapsDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(actions.updateStatus(id));
    },
    onDeleteItem:(id)=>{
      dispatch(actions.deleteItem(id));
    },
    onOpenForm:()=>{
      dispatch(actions.openForm());
    },
    onEditTask:(task)=>{
      dispatch(actions.editTask(task))
    }
  };
};
export default connect(mapStateToProps,mapsDispatchToProps)(TaskItem);
