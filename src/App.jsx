import React, {useEffect, useContext} from 'react'
import './App.css'
import {Context} from "./main.jsx"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Auth/login.jsx'
import Register from './components/Auth/register.jsx'
import Navbar from "./components/Layout/NavBar.jsx"
import Footer from "./components/Layout/Footer.jsx"
import Home from "./components/Home/Home.jsx"
import Jobs from "./components/Job/Jobs.jsx"
import JobDetails from "./components/Job/JobDetails.jsx"
import MyJobs from "./components/Job/MyJobs.jsx"
import PostJobs from './components/Job/PostJobs.jsx'
import Application from "./components/Applications/Application";
import MyApplications from "./components/Applications/MyApplications";
import NotFound from "./components/NotFound/NotFound";
import axios from 'axios'
import { Toaster } from "react-hot-toast"


const App = () => {

  const {isAuthorised, setIsAuthorised, setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/user/getuser',{withCredentials: true});
        setUser(res.data.user);
        setIsAuthorised(true);
      } catch (err) {
        setIsAuthorised(false);
        console.log(err);
      }
    };
    fetchUser();
  }, [isAuthorised]);
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>  
          <Route path="/job/getall" element={<Jobs/>}/> 
          <Route path="/job/:id" element={<JobDetails/>}/> 
          <Route path="/job/post" element={<PostJobs/>}/> 
          <Route path="/job/me" element={<MyJobs/>}/> 
          <Route path="/application/:id" element={<Application/>}/> 
          <Route path="/application/me" element={<MyApplications/>}/> 
          <Route path="*" element={<NotFound/>}/>   
        </Routes>
        <Footer/>
        <Toaster/>
      </Router>

    </>
  )
}

export default App
 