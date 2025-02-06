import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJobs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setjobType] = useState("");
  const [location, setLocation] = useState("");
  const [salaryfrom, setSalaryfrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorised, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryfrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setSalary("");
    } else {
      setSalaryfrom("");
      setSalaryTo("");
      setSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/postJob",
        salary.length >= 4
          ? {
            title,
            description,
            category,
            jobType,
            location,
            salary,
          }
          : {
            title,
            description,
            category,
            jobType,
            location,
            salaryfrom,
            salaryTo,
          },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorised || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
  <div className="container">
    <h3>POST NEW JOB</h3>
    <form onSubmit={handleJobPost}>
      <div className="wrapper">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Graphics & Design">Graphics & Design</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Frontend Web Development">Frontend Web Development</option>
          <option value="MERN Stack Development">MERN STACK Development</option>
          <option value="Account & Finance">Account & Finance</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Video Animation">Video Animation</option>
          <option value="MEAN Stack Development">MEAN STACK Development</option>
          <option value="MEVN Stack Development">MEVN STACK Development</option>
          <option value="Data Entry Operator">Data Entry Operator</option>
        </select>
      </div>

      <div className="wrapper">
        <select value={jobType} onChange={(e) => setjobType(e.target.value)} required>
          <option value="">Select Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      <div className="wrapper">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
      </div>

      <div className="salary_wrapper">
        <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)} required>
          <option value="default">Select Salary Type</option>
          <option value="Fixed Salary">Fixed Salary</option>
          <option value="Ranged Salary">Ranged Salary</option>
        </select>
        <div>
          {salaryType === "default" ? (
            <p>Please provide Salary Type *</p>
          ) : salaryType === "Fixed Salary" ? (
            <input
              type="number"
              placeholder="Enter Fixed Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          ) : (
            <div className="ranged_salary">
              <input
                type="number"
                placeholder="Salary From"
                value={salaryfrom}
                onChange={(e) => setSalaryfrom(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                required
              />
            </div>
          )}
        </div>
      </div>

      <textarea
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job Description"
        required
      />

      <button type="submit">Create Job</button>
    </form>
  </div>
</div>

</>
)}
export default PostJobs;