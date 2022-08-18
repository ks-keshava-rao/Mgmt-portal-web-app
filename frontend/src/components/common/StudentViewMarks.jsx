import React from 'react'
import { useEffect, useContext } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Studentcontext from '../context/studentContext';
import { Link } from "react-router-dom";
import { MdLogout, MdHome, MdPeopleAlt } from "react-icons/md";

const StudentViewMarks = () => {
    const [dataarray, setArray] = useState([]);
    const [restdata, setRestdata] = useState({
        rollNumber: '',
        studentName: ""
    })
    const { studentdetails } = useContext(Studentcontext);
    useEffect(() => {
        console.log(studentdetails.rollNumber);
        loadData();
    }, [])
    const loadData = async () => {
        try {
            const responsedata = await axios.get(`http://localhost:8080/studentmarks/${studentdetails.rollNumber}`);
            if (responsedata.data.found) {
                console.log(responsedata.data)
                setArray(responsedata.data.fetched_data.subjectdata)
                setRestdata(
                    {
                        studentName: responsedata.data.fetched_data.studentName,
                        rollNumber: responsedata.data.fetched_data.rollNumber
                    }
                
                )
                console.log(dataarray)
                console.log(restdata)
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="container pt-1 mt-3 pt-3">
            <div className="container mt-5">
                <div className="w-75 mx-auto  rounded shadow p-5">
                    <h1 className='display-5 text-center text-secondary text-uppercase mb-4'> {restdata.studentName} - {restdata.rollNumber} </h1>
                    <ul className="list-group w-50 mt-3 mx-auto justify-content-center">
                        {
                            dataarray.map((property, index) =>
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
                        {/* <Link className="btn btn-warning btn-md ms-3" to={`/viewmarks/${restdata.rollNumber}`} >Edit <FaEdit /> </Link>
                        <button className="btn btn-danger btn-md ms-5" onClick={(e) => deleteData()} >Delete <FaTrash /> </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentViewMarks