import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function LightingWaste() {
  return (

    <div className="browse">
      <div class="container">

     
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'600px'}}>  
      <div class ="row">
    
        <div class="col-lg-13">
        <ul> <img
              id = "img2"
              src = {require("./img2.png")}
              alt="" 
              width="975"
              height='200'
            />
          </ul>
        </div>
        <div class="col-lg-6">
        <div >
        <h1 style ={{fontFamily:'Arial',fontWeight:'normal'}}> Lighting Waste</h1>
        <p style ={{textAlign:'justify'}}>Lighting recycling is getting easier
Recycling light bulbs keeps toxic metals like mercury out of landfill, where it can contaminate the environment and waterways. It also recovers a variety of materials such as glass, ceramic, aluminium and phosphor that can be reused in products like aluminium cans and fertiliser.</p>
        </div>
        </div>
        <div class="col-lg-6">
            <NavLink className="nav-link" to="/maplwaste">
                  <Button>FIND A LOCATION NEAR ME</Button>
            </NavLink>
            <ul>
            &#128187; https://www.nea.gov.sg/
            </ul>
            <ul>
            &#9978; (Office)PRS Operator’s Depot (20 Tuas Loop)<br></br>
            </ul>




        </div>
    

      
        
        </div>
        </div>
        </div>
      </div>
      
  )
}

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 18px;
  padding: 15px 100px;
  border-radius: 0px;
  margin: 25px 100px
  cursor: pointer;
  font-family: Arial;
`;

export default LightingWaste;