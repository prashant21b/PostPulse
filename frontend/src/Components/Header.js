import React from 'react';
import './header.css';
import {Link,NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import image from './blog1.png';


const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = '/login';
    toast.error("Logout Successfully");
  };

  return (
    <div class="nav">
  <input type="checkbox" id="nav-check"/>
  <div class="nav-header">
    <div class="nav-title">
    PostPulse
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
    <NavLink to="/" >Home</NavLink>
    {
      localStorage.getItem("jwtToken")?(<>
      <NavLink to="/blogs" >My Blogs</NavLink>
      <NavLink to="/create" >Create</NavLink>
      <NavLink onClick={logoutHandler} >Logout</NavLink>
      </>):
      (<>
      <NavLink to="/login" >Login</NavLink>
    <NavLink to="/register" >Singup</NavLink>
      </>)
    }  
  </div>
</div>

  );
};

export default Navbar;
