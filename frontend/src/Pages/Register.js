import React, { useState } from 'react';
import './login.css';
import { useNavigate} from "react-router-dom";
import { baseURL } from '../url';
const Register = () => {
  const [username,setUsername]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserChange=(e)=>{
    setUsername(e.target.value);
  }
  const handleSubmit =async  (e) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:username,
        email:email,
        password:password,
        
      }),
    });
    navigate('/login');
  };

  return (
    // <div className="login-form">
    //   <h2>SingUp</h2>
    //   <form onSubmit={handleSubmit}>
    //   <div className="form-group">
    //       <label>UserName</label>
    //       <input type="text" value={username} onChange={handleUserChange} required />
    //     </div>
    //     <div className="form-group">
    //       <label>Email</label>
    //       <input type="email" value={email} onChange={handleEmailChange} required />
    //     </div>
    //     <div className="form-group">
    //       <label>Password</label>
    //       <input type="password" value={password} onChange={handlePasswordChange} required />
    //     </div>
    //     <button type="submit">Register</button>
    //   </form>
    // </div>
    <div className='form-box'>
    <form onSubmit={handleSubmit}>
  <fieldset className="account-info">
    <lable>
      UserName
      <input type="text name=" name="username" value={username} onChange={handleUserChange} required/>
    </lable>
    <label>
      Email
      <input type="email" name="email" value={email} onChange={handleEmailChange} required/>
    </label>
    <label>
      Password
      <input type="password" name="password" value={password} onChange={handlePasswordChange} required/>
    </label>
  </fieldset>
  <fieldset className="account-action">
    <input className="btn" type="submit" name="submit" value="Register"/>
  </fieldset>
</form>
</div>
  );
};

export default Register;
