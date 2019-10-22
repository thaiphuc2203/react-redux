import React, { Component } from "react";
import { Button, Select, Icon } from 'antd';
import "antd/dist/antd.css";
import "../App.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { connect } from 'react-redux'
import * as actions from './../actions/index'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

// const bootstrap = require('bootstrap');
const { Option } = Select;


class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.inputName = React.createRef();
    this.inputStatus = React.createRef();
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }
UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('UNSAFE_componentWillReceiveProps');
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      });
    } else if (!nextProps.taskEditing) {
      this.onClear();
    }
  }

  onChange = event => {
    let target = event.target;
    let value = target.value;
    // let {name}=this.state
    // if(name==='status'){
    //   value= target.value==='true'? true:false
    // }
    this.setState({
      name: value
    });
    // console.log(this.state)
  };
  onStatusChange = value => {
    this.setState({
      status: value === "true"
    });
  };
  onSubmit = event => {
    console.log(this.state);
    let name = this.state.name;
    if (name !== "") {
      event.preventDefault(); //xoa su kien submit mac dinh
      this.props.onSaveTask(this.state);
      this.onClear();
      this.onCloseForm();
    } else {
      alert("enter name work");
    }
  };
  onClear = () => {
    // this.inputName.current.value = ''
    this.setState({
      id: "",
      name: "",
      status: false
    });
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  render() {
    const { id } = this.state;
    if (!this.props.isDisplayForm) {
      return "";
    }
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {" "}
            {id !== "" ? "Update Work" : "Add Work"}{" "}
            <Icon type="plus-circle" onClick={this.onCloseForm} />{" "}
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label> Name :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                // ref={this.inputName} //  dùng ref không cần chỏ thẳng lên state
                onChange={this.onChange}
              />
            </div>
            <label> Status :</label>
            <Select
              className="form-control"
              required="required"
              name="status"
              value={this.state.status.toString()} // không dùng được ref vì antdesign phải qua nhiều lớp
              onChange={this.onStatusChange}
            >
              <Option value="true"> Active</Option>
              <Option value="false">InActive</Option>
            </Select>
            <hr />
            <div className="text-center">
              <Button type="primary" htmlType="submit">
                {" "}
                <i className="far fa-edit"></i>&nbsp; Add
              </Button>
              &nbsp;
              <Button type="danger" htmlType="button" onClick={this.onClear}>
                {" "}
                <i className="far fa-window-close"></i> &nbsp; Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {
      isDisplayForm: state.isDisplayForm,
      taskEditing: state.taskEditing
    };
    
};
const mapsDispatchToProps=(dispatch,props)=>{
  return {
    onSaveTask: task => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    }
  };
}
export default connect(mapStateToProps, mapsDispatchToProps)(TaskForm);
