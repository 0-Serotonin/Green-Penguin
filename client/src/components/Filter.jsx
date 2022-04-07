import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Filter() {
//   // const bordered= () => {
//   //   alert("you just clicked");
//     let history = NavLink();
  
//     const redirect = () => {
//       history.push('/about')

  // }
    return (
        <div style={{ 
          backgroundImage: `url("https://wallup.net/wp-content/uploads/2017/03/28/361576-leaves-water_drops-blurred-photography-nature-green.jpg")`, 
          display: 'flex',justifyContent:'center', alignItems:'center', height: '100vh'
        }}>
        <div className="filter">
           
            <div class = "container">
                  <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '10vh'}}>
                  <h1 className style={{ color: "white", height: '10vh', fontFamily: "Helvetica"}}>
                    Hello, please select your activity.</h1>
                  </div>

           
                  <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    {/* <ul><Button>Recycling old products</Button></ul> */}
                    <NavLink className="nav-link" to="/map2ndhand" ><ul><Button>Recycling old products</Button></ul></NavLink>
                  </div> 
                  <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    {/* <ul><Button >Recycling e-waste</Button></ul> */}
                    <NavLink className="nav-link" to="/mapewaste" ><ul><Button>Recycling e-waste</Button></ul></NavLink>
                  </div>
                  <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    {/* <ul><Button>Recycling lighting waste</Button></ul> */}
                    <NavLink className="nav-link" to="/maplwaste" ><ul><Button>Recycling lighting waste</Button></ul></NavLink>
                  </div> 
                  {/* <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    <ul><NavLink className="nav-link" to="/start2"><Button2>Next</Button2></NavLink></ul>
                  </div>  */}

                  <div style={{display: 'flex',justifyContent:'center', alignItems:'center', height: '10vh'}}>
                    <ul><NavLink className="nav-link" to="/browse" >Or find out more </NavLink></ul>
                  </div> 
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


export default Filter;
