import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { FaCheck, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdLogout, MdHome, MdPeopleAlt } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";

const MarksView = () => {
  const [inputfield, setfield] = useState({ rollNumber: "" });
  const [data, setData] = useState([]);
  const [visiblility, setvisibility] = useState(false)
  const [restdata, setRestdata] = useState({
    studentName: " ",
    rollNumber: " "
  })
  const handlechange = (e) => {
    setfield({ ...inputfield, [e.target.name]: e.target.value })
    console.log(inputfield)
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("submitted", inputfield.rollNumber)
    try {
      const response = await axios.get(`http://localhost:8080/studentmarks/${inputfield.rollNumber}`)
      if (response.data.found) {
        console.log(response.data.fetched_data.subjectdata)
        setvisibility(true)
        setData(response.data.fetched_data.subjectdata)
        setRestdata({
          studentName: response.data.fetched_data.studentName,
          rollNumber: response.data.fetched_data.rollNumber
        });
      }
      else {
        alert("Rollnumber not found")
        setvisibility(false)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const deleteData = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${inputfield.rollNumber}`)
      if (response.data.deleted) {
        alert("successfully deleted ");
        setvisibility(false)
      } else {
        alert("could'nt delete")
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const ListView = () => {
    
    return (
      <div className="container pt-1 mt-3 pt-3">
        <div className="container mt-5">
          <div className="w-75 mx-auto  rounded shadow p-5">
            <h1 className='display-5 text-center text-secondary text-uppercase mb-4'> {restdata.studentName} - {restdata.rollNumber} </h1>
            <ul className="list-group w-50 mt-3 mx-auto justify-content-center">
              {
                data.map((property, index) =>
                (
                  <li key={index}
                    className="list-group-item  list-group-item-action text-uppercase lead text-secondary">
                    <b>{property.subject} :  {property.marks}/100 </b>
                  </li>
                ))
              }
            </ul>
            <div className="col-sm-12 text-center mt-4">
              <Link className="btn btn-success btn-md me-4" to='/' type="button">Home <MdHome /> </Link>
              <Link className="btn btn-warning btn-md ms-3" to={`/viewmarks/${restdata.rollNumber}`} >Edit <FaEdit /> </Link>
              <button className="btn btn-danger btn-md ms-5" onClick={(e) => deleteData()} >Delete <FaTrash /> </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='container '>
        {/* <h4 className="text-center mt-4 display-4">Student Marks </h4> */}
        <div className='mt-4 me-5 pe-5'>
          <Link className="btn btn-warning me-5"
            style={{ 'float': 'right', "margin": '16px' }}
            to='/marks_add'>
            Add Marks <FaPlus />
          </Link>
        </div>
        <form
          onSubmit={(e) => { handlesubmit(e) }}
          className='mt-5 d-flex'
        >
          <div className="col-sm-3 my-1 mt-4 ms-5 ps-5 ">
            <div className="input-group position-absolute w-25 ms-5 mx-auto">
              <input type="text"
                className="form-control"
                id="inlineFormInputGroupUsername"
                placeholder="Enter Roll number"
                required
                name='rollNumber'
                onChange={(e) => handlechange(e)}
                value={inputfield.rollNumber}
              />
              <div className="input-group-prepend">
                <button
                  type='submit'
                  style={{ width: '45px' }}
                  className='btn btn-warning'>
                  <FaCheck />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {
        visiblility
          ?
          <ListView />
          :
          <div className="container">
            <h1 className='display-6 text-center text-success mt-5 pt-5 '> Enter roll number to continue... </h1>
          </div>
      }
    </>
  )
}

export default MarksView