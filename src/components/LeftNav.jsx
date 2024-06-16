
import React from "react";
import { NavLink } from 'react-router-dom'

function LeftNav() {
  return (
    <div className="pl-5 pt-5 bg-light border-top border-end" style={{minHeight: "70vh"}}>
      <div className="row">
        <div className="d-md-block">
          <div>
            <h4>Product</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink className="nav-link" to="/product/list/all">My Products </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/product/new">Add New Product </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftNav