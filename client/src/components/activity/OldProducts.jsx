import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function OldProducts() {
  return (

    <div className="browse">
      <div class="container">

     
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'600px'}}>  
      <div class ="row">
    
        <div class="col-lg-13">
        <ul> <img
              id = "img2"
              src = {require("./img4.png")}
              alt="" 
              width="975"
              height='200'
            />
          </ul>
        </div>
        <div class="col-lg-6">
        <div >
        <h1 style ={{fontFamily:'Arial',fontWeight:'normal'}}> Old Products</h1>
        <p style ={{textAlign:'justify'}}>Recycling is one of the great ways to recycle old items that usually end up in our trash bin. According to a report by Duke University, “Approximately 55% of 220 million tons of waste generated each year in the United States ends up in one of the over 3,500 landfills”. Landfills not only have a bad impact on our environment but also degrade the beauty of the city. By recycling not-so-common items at our home, we can play a small but huge part in protecting the environment and regaining the glory of our city.</p>
        </div>
        </div>
        <div class="col-lg-6">
            <NavLink className="nav-link" to="/map2ndhand">
                  <Button>FIND A LOCATION NEAR ME</Button>
            </NavLink>
            <ul>
            &#128187; https://www.nea.gov.sg/
            </ul>
            <ul>
            &#9978; (Office) PRS Operator’s Depot (20 Tuas Loop)<br></br>
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

export default OldProducts;