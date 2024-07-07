import React, { useState } from 'react';
import './login.css';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../url';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/v1/login`, {
        email,
        password,
      });
      const json = response.data;
      console.log(json);
        
        localStorage.setItem("jwtToken", json.jwtToken);
        console.log(localStorage.getItem("jwtToken"));
        toast.success("Login Successfully");
        navigate('/');
      
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <fieldset className="account-info">
            <label>
              Email
              <input type="email" name="username" value={email} onChange={handleEmailChange} required />
            </label>
            <label>
              Password
              <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
            </label>
          </fieldset>
          <Link to="/forgotpassword">Forgot Password?</Link>
          <fieldset className="account-action">
            <input className="btn btn-left" type="submit" name="submit" value="Login" />
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Login;
