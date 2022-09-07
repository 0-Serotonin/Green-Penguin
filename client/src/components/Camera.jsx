import React from "react";
import styled from "styled-components";

function Camera() {
    return (
    <div class="container">
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
        <h1 class="font-weight-light">Item Classification</h1>
      </div>
      <div class ="row">
        <div class="col-lg-8">
            <h3 style ={{fontFamily:'Playfield display',fontWeight:'bold', height:'10vh'}}>Find out where to recycle your items</h3>
        </div>
        <div class="col-lg-2">
            <Button onClick = {null}>UPLOAD IMAGE</Button>
        </div>
        <div class="col-lg-2">
            <Button onClick = {null}>USE CAMERA</Button>
        </div>
      </div>
    </div>
    )
}
const Button = styled.button`
  background-color: white;
  padding: 8px 8px 8px 32px;
  color: black;
  font-size: 12px;
  border-radius: 10px;
  margin: 1px 100px
  cursor: pointer;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABmJLR0QA/wD/AP+gvaeTAAAA7UlEQVQ4jb2UTQ6CQAyFv4gxEXfq0jvoxp97qZxJb+Fag3oBFihnYKESXdCJk8kUERNf0jTTljd9pQB/RgD0xTdCD4iAGCiAJ/CQ8xoI6xItgEwINLsC8zpE+QciYzkwq5KmdXRS4hdNclQhCfG+/MpHFivFieQTJX8wBG3xATB2yDPg5nQG0AFGVt1Eni9MYOjcdvS1bsGd4cBOBpR75M4qAXZSs5OzO7s7noVuOrO9IWhZZBtFUsfxLra+YOiRYOysxFOgq1zCnO++gKlGZDCj3OwqorQOkS15RbmQd95v7QAsq6R9ws//s0Z4AYPMj/ARKOC7AAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: 8px 8px;
`;
export default Camera;