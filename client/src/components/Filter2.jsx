import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Filter2() {

  return (
    <div style={{
      backgroundImage: `url("https://wallup.net/wp-content/uploads/2017/03/28/361576-leaves-water_drops-blurred-photography-nature-green.jpg")`,
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
    }}>
      <div className="filter2">

        <div class="container">
          <h1 className style={{ color: "white", height: '10vh', fontFamily: "Helvetica" }}>
            Input your postal code</h1>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <form>
              <input type="text" name="Postal Code" />
              {/* <NavLink className="nav-link" to="/map" > */}
                <input type="submit" value="Submit" />
              {/* </NavLink> */}
            </form>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <ul><Button2>Or Use Current Location</Button2></ul>
            {/* <NavLink className="nav-link" to="/maplwaste" ><Button2>Or use current location</Button2></NavLink> */}
          </div>
          {/* 
                  <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    <ul><NavLink className="nav-link" to="/about" >Or use current location </NavLink></ul>
                  </div>  */}

        </div>
      </div>
    </div>



  );
}

const Button2 = styled.button`
  background-color: black;
  color: white;
  font-size: 18px;
  padding: 10px 60px;
  border-radius: 10px;
  margin: 10px 10px;
  font-family: Arial;
  cursor: pointer;
  &:bordered {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;


export default Filter2;
