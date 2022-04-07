import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Cash() {
  return (

    <div className="browse">
      <div class="container">

     
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'600px'}}>  
      <div class ="row">
    
        <div class="col-lg-13">
        <ul> <img
              id = "img1"
              src = {require("./img3.png")}
              alt="" 
              width="975"
              height='200'
            />
          </ul>
        </div>
        <div class="col-lg-6">
        <div >
        <h1 style ={{fontFamily:'Arial',fontWeight:'normal'}}> Cash-For-Trash</h1>
        <p style ={{textAlign:'justify'}}>Cash-for-Trash is an incentive programme by Public Waste Collectors, where residents may bring their recyclables to the Cash-for-Trash stations and cash is given in exchange for recyclables. For more information on the rebates, please contact your Public Waste Collector.

        Please note that all Cash-for-Trash stations are currently suspended due to the enhanced COVID-19 measures implemented.</p>
        </div>
        </div>
        <div class="col-lg-6">
            <NavLink className="nav-link" to="/map2ndhand">
                  <Button>FIND A LOCATION NEAR ME</Button>
            </NavLink>
            <ul>
            &#128222; +65 6450 8160 
            </ul>
            <ul>
            &#128187; https://www.alba-wh.sg/
            </ul>
            <ul>
            &#9978;(Office) ALBA W&H SMART CITY PTE. LTD.
            <br></br>18 Tuas Ave 10, Singapore 639142
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

export default Cash;