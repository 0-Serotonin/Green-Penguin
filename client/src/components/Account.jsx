import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Account() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-bold">Profile</h1>
            <h2 class="font-weight-light">@username</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 15px;
  padding: 8px 150px;
  border-radius: 0px;
  margin: 10px 10px
  cursor: pointer;
`;
export default Account;