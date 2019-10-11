import React, { Component } from "react";
import { Button, Icon } from "antd";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import $ from "jquery";
import "../App.css";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const bootstrap = require("bootstrap");

class Control extends Component {
  constructor(props){
    super(props)
    this.state={  
        sortBy:'name',
        sortValue: 1,
        searchName:''  
    }
  }
  onClick=(a,b)=>{
    this.setState({
      sortBy:a, sortValue:b
    }, ()=>{this.props.onControl(this.state)})
  }
  
  onChange=(event)=>{
    let value = event.target.value;
    this.setState({
      searchName:value
    })
  }
  onClickSearch=()=>{
   
    this.props.onControl(this.state);
  }
  render() {
    return (
      <div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a search term..."
              name="searchName"
              value={this.state.searchName}
              onChange={this.onChange}
            />
            <span className="input-group-btn">
              <Button type="primary" onClick={this.onClickSearch}>
                <span className="fa fa-search mr-5"></span>Sreach
              </Button>
            </span>
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
            <Button
              type="primary"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Arrange &nbsp; <i className="far fa-caret-square-down"></i>
            </Button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li className="li-drop" onClick={() => this.onClick("name", 1)}>
                <div className="item-drop">
                  <Icon type="sort-ascending" /> &nbsp;Name A-Z
                </div>
              </li>
              <li className="li-drop" onClick={() => this.onClick("name", -1)}>
                <div className="item-drop">
                  <Icon type="sort-descending" />
                  &nbsp; Name Z-A
                </div>
              </li>
              <li role="separator" className="divider"></li>
              <li className="li-drop" onClick={() => this.onClick("status", 1)}>
                <div className=" item-drop"> Status Inactive</div>
              </li>
              <li
                className="li-drop"
                onClick={() => this.onClick("status", -1)}
              >
                <div className="item-drop">Status Active</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps =(state)=>{
  return {
    tasks:state.tasks,
    
  }
}
const mapsDispatchToProps = (dispatch, props) => {
  return {
    onControl:(controlName)=>{
      dispatch(actions.control(controlName))
    }
  
  }
};
export default connect(mapStateToProps,mapsDispatchToProps)(Control);
