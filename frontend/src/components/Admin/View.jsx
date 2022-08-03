import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
const View = () => {
    const initialdisplay = {
        rollNumber: "",
        Useremail: "",
        studentName: "",
        password: ""
    }
    const [userdisplay, setuserdisplay] = useState(initialdisplay);
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        loadUser();
    }, []);
    const loadUser = async () => {
        const response = await axios.get(`http://localhost:8080/student/${id}`);
        setuserdisplay(response.data)
    }
    return (
        <>
            <div className="container py-4">
                <h1 className="display-4">
                    Roll Number : {id}
                </h1>
                <ul className="list-group w-50">
                    <li className="list-group-item">name: {userdisplay.studentName}</li>
                    <li className="list-group-item">user-email: {userdisplay.Useremail}</li>
                    <li className="list-group-item">Roll-No: {userdisplay.rollNumber}</li>
                    <li className="list-group-item">Password: {userdisplay.password}</li>
                </ul>
                <div className="py-4">
                    <Link className='btn btn-primary' to='/editdata'>
                        Go back
                    </Link>
                </div>
            </div>
        </>
    )
}

export default View