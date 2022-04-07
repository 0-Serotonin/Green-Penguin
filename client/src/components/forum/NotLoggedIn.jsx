import React from "react";
import Login from '../Login'

function NotLoggedIn() {
  return (
    <div className="NotLoggedIn">
      <div class="container" >
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '15vh'}}>	
      <h1>	&#128680;</h1></div>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '10vh'}}>
        <h2 class="font-weight-bold"> You are not logged in. </h2>
      </div>
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '10vh'}}>
         Please log in to continue.
      </div>
 
      </div>
      </div>
      
  );
}

export default NotLoggedIn;
