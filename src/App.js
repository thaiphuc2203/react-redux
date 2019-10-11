import React, { Component } from "react";
import { Button, Layout } from "antd";
import "antd/dist/antd.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import "./App.css";
import { connect } from "react-redux";
import * as actions from "./actions/index";

import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const { Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickForm = () => {
    let { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== "") {
      this.props.onOpenForm();
    } else {
      this.props.onClickForm();
    }
    this.props.onClearForm({
      id: "",
      name: "",
      status: false
    });
  };
  render() {
    var { isDisplayForm } = this.props;
    return (
      <div className="container">
        <div className="text-center">
          <Layout>
            <Footer>
              <h1>Quản Lý Công Việc </h1>
            </Footer>
          </Layout>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            {/* TaskForm */}
            <TaskForm />
          </div>
          <div
            className={
              isDisplayForm === true
                ? "col-xs-12 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <Button type="primary" className="br" onClick={this.onClickForm}>
              <span className="fa fa-plus mr-5"></span> Add Work
            </Button>{" "}
            &nbsp;
            <div className="row mt-15">
              <Control onSort={this.onSort} onSearch={this.onSearch} />
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList onFilter={this.onFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.taskEditing
  };
};
const mapsDispatchToProps = (dispatch, props) => {
  return {
    onClickForm: () => {
      dispatch(actions.clickForm());
    },
    onClearForm: task => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(App);
