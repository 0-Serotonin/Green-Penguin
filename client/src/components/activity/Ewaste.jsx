import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Ewaste() {
  return (

    <div className="browse">
      <div class="container">

     
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'600px'}}>  
      <div class ="row">
    
        <div class="col-lg-13">
        <ul> <img
              id = "img1"
              src = {require("./img1.jpg")}
              alt="" 
              width="975"
              height='200'
            />
          </ul>
        </div>
        <div class="col-lg-6">
        <div >
        <h1 style ={{fontFamily:'Arial',fontWeight:'normal'}}> E-Waste Recycling</h1>
        <p style ={{textAlign:'justify'}}>IT devices and equipment contain toxic substances like lead, mercury, cadmium, polybrominated flame retardants, barium and lithium. If not properly handled, these toxic substances can leach into soil or pollute our air and water supplies. It is thus vital that end-of-life IT equipment be only handled by trusted, professional recycling companies like METech to ensure that there is proper recycling of the IT equipment.</p>
        </div>
        </div>
        <div class="col-lg-6">
            <NavLink className="nav-link" to="/mapewaste">
                  <Button>FIND A LOCATION NEAR ME</Button>
            </NavLink>
            <ul>
            &#128222; +65 3105 1608
            </ul>
            <ul>
            &#128187; https://alba-ewaste.sg/
            </ul>
            <ul>
            &#9978;(Office) 110 Tuas South Avenue 3<br></br>
            S(637369)<br></br>
            #03-11
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

export default Ewaste;