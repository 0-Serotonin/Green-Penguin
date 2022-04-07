import React from "react";
import Login from './Login';
import { NavLink } from "react-router-dom";

function Navigation() {
  
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          
          <h4 className style={{ fontFamily: "Playfair Display", fontWeight: 'bold'}}>Green Pirates Inc</h4>

          <div>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/GreenPirates">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/browse">
                  Browse
                </NavLink>
              </li>             
              <li className="nav-item">
                <NavLink className="nav-link" to="/forum">
                  Forum
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <div>
                <NavLink className="nav-link" to="/login">
                  Profile
                </NavLink>
              </div>
            </ul>
    
          </div>

          {/* <div className="g-login">
            <Login />
          </div> */}

        </div>
      </nav>
    </div>
  );
}

export default Navigation;
