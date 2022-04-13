import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MapManager from "./MapManager";

function Filter() {
  return (
    <div style={{ 
      backgroundImage: `url("https://wallup.net/wp-content/uploads/2017/03/28/361576-leaves-water_drops-blurred-photography-nature-green.jpg")`, 
      display: 'flex',justifyContent:'center', alignItems:'center', height: '100vh'}}>

      <div className="filter">
        <div class = "container">
              <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '10vh'}}>
              <h1 className style={{ color: "white", height: '10vh', fontFamily: "Helvetica"}}>
                Hello, please select your activity.</h1>
              </div>
              
              <MapManager/>

              <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                <ul><NavLink className="nav-link" to="/browse" >Or find out more </NavLink></ul>
              </div> 
        </div>
      </div>    
    </div> 
  );
}

export default Filter;
