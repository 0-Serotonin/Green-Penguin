import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function MapManager() {
    return (
        <div className="maps">
            <div class = "container">

                  <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    <NavLink className="nav-link" to="/map2ndhand" ><ul><Button>Recycling old products</Button></ul></NavLink>
                  </div> 

                  <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    <NavLink className="nav-link" to="/mapewaste" ><ul><Button>Recycling e-waste</Button></ul></NavLink>
                  </div>

                  <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    <NavLink className="nav-link" to="/maplwaste" ><ul><Button>Recycling lighting waste</Button></ul></NavLink>
                  </div> 
                  
            </div>
        </div>    
      );
}

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 18px;
  padding: 10px 60px;
  border-radius: 10px;
  margin: 10px 10px;
  font-family: Arial;
  cursor: pointer;
  // &:bordered {
  //   color: grey;
  //   opacity: 0.7;
  //   cursor: default;
  // }
`;

export default MapManager;