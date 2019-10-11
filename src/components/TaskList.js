import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import TaskItem from "./TaskItem";
import $ from "jquery";
import { connect } from "react-redux";
import * as actions from "../actions/index";
window.jQuery = $;
window.$ = $;
global.jQuery = $;
// const bootstrap = require('bootstrap');
const { Option } = Select;

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1
    };
  }
  onChange = event => {
    let target = event.target;
    let value = target.value;

    this.setState(
      {
        filterName: value
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };
  onStatusChange = value => {
    this.setState(
      {
        filterStatus: value
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };

  render() {
    console.log(this.props);
    var { tasks, filterTable, controlItem } = this.props;
    var searchName = controlItem.searchName;
    var sortBy = controlItem.sortBy;
    var sortValue = controlItem.sortValue;
    if (filterTable) {
      if (filterTable.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (filterTable.value === -1) {
          return task;
        } else {
          return task.status === (filterTable.value === 1 ? true : false);
        }
      });
    }
    // searchName
    if (searchName !== "") {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(searchName) !== -1;
      });
    }
    // sap xep
    if (sortBy === "name") {
      tasks = tasks.sort((a, b) => {
        if (a.name > b.name) {
          return sortValue;
        } else if (a.name < b.name) {
          return -sortValue;
        } else return 0;
      });
    } else {
      tasks = tasks.sort((a, b) => {
        if (a.status < b.status) {
          return -sortValue;
        } else if (a.status > b.status) {
          return sortValue;
        } else return 0;
      });
    }
    const elmTask = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
    });
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                value={this.state.filterName}
                onChange={this.onChange}
                name="filterName"
              />
            </td>
            <td>
              <Select
                className="form-control"
                required="required"
                name="filterStatus"
                onChange={this.onStatusChange}
                defaultValue={this.state.filterStatus.toString()}
              >
                <Option value="-1">All</Option>
                <Option value="0">InActive</Option>
                <Option value="1">Active</Option>
              </Select>
            </td>
            <td></td>
          </tr>
          {/* TaskItem ---------------*/}
          {elmTask}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    controlItem: state.controlItem
  };
};
const mapsDispatchToProps = (dispatch, props) => {
  return {
    onFilter: filter => {
      dispatch(actions.filterTable(filter));
    }
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(TaskList);
