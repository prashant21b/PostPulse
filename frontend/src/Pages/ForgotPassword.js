import React, { useState } from 'react';
import './login.css';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const response=await fetch('/api/v1/forgotpassword',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        
      },
      body:JSON.stringify({
        email:email,
        password:password,
      })

    })
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert('Enter valid Credentials');
    }
    if(json.success){
     navigate('/login')
     
    }
  };

  return (
    <>
    <div className='form-box'>
    <form onSubmit={handleSubmit}>
  <fieldset className="account-info">
    <label>
      Email
      <input type="email" name="username" value={email} onChange={handleEmailChange} required/>
    </label>
    <label>
      New Password
      <input type="password" name="password" value={password} onChange={handlePasswordChange} required/>
    </label>
  </fieldset>
 
  <fieldset className="account-action">
    <input className="btn btn-left" type="submit" name="submit" value="Reset"/>
  </fieldset>
  
</form>
</div>
  </>
  );
};

export default ForgotPassword;
