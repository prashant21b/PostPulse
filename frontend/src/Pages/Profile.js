import React, { useEffect, useState } from 'react';
import './profile.css'; // Assuming the CSS file is named "Profile.css"
import jwtDecode from 'jwt-decode';
import { baseURL } from '../url';
const Profile = ({ username, email, avatarImage }) => {
  const token=localStorage.getItem("jwtToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const [data,setData]=useState([]);
   async function getProfile(){
   
     const response = await fetch(`${baseURL}/api/v1/profile`, {
      method: 'POST',
     headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({
       id:decodedToken.id
          
      }),
     });
     if (response.ok) {
        const iteams = await response.json();
        console.log("profile", iteams.data);
        setData(iteams.data);
      } else {
        console.error("Error: " + response.status);
        setData([]);
      }
    } 
   useEffect(()=>{
    getProfile();
   },[])
  return (
    <div className='profile'>
    <div className="profile-container">
      <div className="avatar-container">
        <img src={data.profilePic} alt="Avatar" className="avatar-image" />
      </div>
      <div className="profile-info">
        <div className="username">{data.username}</div>
        <div className="email">{data.email}</div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
