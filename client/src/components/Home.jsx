import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
          <h1 className style={{ fontFamily: "Playfair Display", fontWeight: "lighter"}}>It's never too late to start saving our planet.</h1>
            <p>
              Join millions of Green Pirates today!
            </p>
            <NavLink className="nav-link" to="/start">
                  <Button>Start Now</Button>
            </NavLink>
            
          </div>
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0 width: 50%"
              src="https://images.unsplash.com/photo-1585871746932-e133d3fedf4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2F2ZSUyMHRoZSUyMHBsYW5ldHxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 10px;
  margin: 10px 10px
  cursor: pointer;
`;


export default Home;
