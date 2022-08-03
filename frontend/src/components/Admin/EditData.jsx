import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaRegEye, FaUserAlt, FaPen, FaTrashAlt, FaUserPlus } from "react-icons/fa";
const EditData = () => {
  const [users, setUser] = useState([])
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/usersdata")
    // console.log(result.data);
    setUser(result.data)
  }
  console.log(users)
  const deleteuser = async (id) => {
    const response = await axios.delete(`http://localhost:8080/deleteuser/${id}`)
    if (response.data.deleted === true) {
      loadUsers();
    }
    else {
      alert(response.data.message)
    }
  }
  return (
    <>

      <div className='container'>
        <div className="fixed">
          <Link className="btn btn-warning text-white position-relative " style={{ 'float': 'right', "margin": '16px' }} to='/signup'>Add <FaUserPlus /></Link>
          <h2 className="text-center mt-4 display-4">Students data  </h2>
        </div>

        <div className='py-4' >
          <table className="table border shadow" style={{ "height": '200px' }}>
            <thead className='bg-dark text-white'>
              <tr style={{ textAlign: 'center' }}>
                <th scope='col'>Sno.</th>
                <th scope='col'>Roll Number</th>
                <th scope='col'>Student Name</th>
                <th scope='col'>Email-id</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody >
              {
                users.map((user, index) =>
                (
                  <tr key={index} style={{ textAlign: 'center' }} >
                    <td scope='row'>{index + 1}</td>
                    <td>{user.rollNumber}</td>
                    <td>{user.studentName}</td>
                    <td>{user.Useremail}</td>
                    <td >
                      <Link className='btn btn-success me-2' to={`/editdata/${user.rollNumber}`}><FaUserAlt /></Link>
                      <Link className='btn btn-outline-primary me-2' to={`/editdata/edit/${user.rollNumber}`}><FaPen /></Link>
                      <button className='btn btn-danger bg-gradient' onClick={() => deleteuser(user.rollNumber)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default EditData