import React from "react";

function Camera() {
    return (
        <div class="container">
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
      <h1 class="font-weight-light">Item Classification</h1>
      </div>

      <div class ="row">

      <div class="col-lg-12">
      <h3 style ={{fontFamily:'Playfield display',fontWeight:'bold', height:'10vh'}}>Find out where to recycle your items</h3>
      </div>

      <div class="col-lg-2">
        <Button onClick = {null}>UPLOAD IMAGE</Button>
      </div>
      <div class="col-lg-4">
        <Button onClick = {null}>USE CAMERA</Button>
      </div>
      </div>
      </div>

    )
}

export default Camera;