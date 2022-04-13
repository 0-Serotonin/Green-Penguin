import React, { Component } from "react";

export default class BrowseManager extends Component{
  render(){
    const {name, handleChange, checked, title } = this.props;

    return(
      <div>
        <input 
        name = {name}
        type = "checkbox"
        onChange = {handleChange}
        checked = {checked}/>
        <span>{ title }</span>
      </div>

    )
  }
}