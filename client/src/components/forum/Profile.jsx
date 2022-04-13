import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {UserContext} from '../UserContext'

function Profile() {
  const {User} = useContext(UserContext)
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-2">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={User.imageUrl}
              alt=""
            />
          </div>
          <div class="col-lg-6">
        
            <h2 class="font-weight-bold">{User.name}</h2>
            <h4 class="font-weight-light">{User.email}</h4>

            <div class="col-lg-0">
              <NavLink className="nav-link" to="/myposts">
              <img
              src="https://pic.onlinewebfonts.com/svg/img_89209.png"
              width="20" 
              height="20"
              alt="" />
                    <Button>My Posts</Button>
              </NavLink>
          </div>
          
          </div>

        </div>
      </div>
    </div>
  );
}

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 20px;
  padding-right:1;
  border: 0;
  margin: 0 auto;
  cursor: pointer;
  display: inline-block; 
`;
export default Profile;

