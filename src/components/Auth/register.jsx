import React, { useContext, useState } from 'react';
import { FaPencilAlt, FaPhone } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../../main';

const Register = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { isAuthorised, setIsAuthorised, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !phone || !name || !password || !role) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/user/register',
        { email, phone, name, password, role },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(data.message);

      // Set user data and authorize
      setUser(data.user); // Assuming `data.user` contains user details
      setIsAuthorised(true);

      // Clear the form
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  // Redirect to home page if authorized
  if (isAuthorised) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">SELECT ROLE</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alysha@gmail.com"
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="123-456-7890"
                />
                <FaPhone />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">Register</button>
            <Link to="/login">Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="register" />
        </div>
      </div>
    </>
  );
};

export default Register;
