import React from 'react'
import { useState } from 'react'
import StudentData,{ClearUpAllData} from '../../store/StudentStore'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Signup = () => {
    const initialState = {
        rollNumber : "",
        Useremail : "",
        studentName : "",
        password : ""
    }
    const [userData,setData] = useState(initialState)
    const HandleInputs = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        console.log(`${name}:${value}`)
        setData({...userData,[name]:value})
    }
    const HandleSubmit= (e)=> {
        e.preventDefault();
        const newRecord = {...userData};
        // StudentData.push(newRecord);
        // console.log(newRecord);
        axios.post('http://localhost:8080/register',newRecord)
        .then((respose)=>{
            console.log(respose.data.userdata);
            console.log(respose.data.message);
            if(!respose.data.found){
                alert(respose.data.message);
            }else{
                alert(respose.data.message);
            }
        })
        .catch((error)=>{
            console.error(error)
        })
        setData(initialState);
    }
    return (
        <>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add new student</h2>
                <form onSubmit={HandleSubmit}>
                    <div className="form-group mb-4">
                        <label ><h6>Roll No.</h6></label>
                        <input type="text" 
                        className="form-control form-control-lg" 
                        id="exampleInputrollno" 
                        name='rollNumber' 
                        placeholder="Enter roll number" 
                        required
                        autoComplete = 'off'
                        value={userData.rollNumber}
                        onChange={HandleInputs}
                         />
                    </div>
                    <div className="form-group mb-4" >
                        <label > <h6>Email</h6></label>
                        <input type="text" 
                        className="form-control form-control-lg" 
                        id="exampleInputemail"
                         placeholder="Enter email address" 
                         name='Useremail'
                         required
                         autoComplete = 'off'
                         value={userData.Useremail}
                         onChange={HandleInputs}
                         />
                    </div>
                    <div className="form-group mb-4" >
                        <label > <h6> Student name </h6></label>
                        <input type="text" 
                        className="form-control form-control-lg" 
                        id="exampleInputname"
                         placeholder="Enter name" 
                         name='studentName'
                         required
                         autoComplete = 'off'
                         value={userData.studentName}
                         onChange={HandleInputs}
                         />
                    </div>
                    <div className="form-group mb-4" >
                        <label > <h6>Password</h6> </label>
                        <input type="password" 
                        className="form-control form-control-lg" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        required
                        autoComplete = 'off'
                        name='password'
                        value={userData.password}
                        onChange={HandleInputs}
                         />
                         
                    </div> 
                    <div className="d-grid gap-2 col-13 mx-auto">
                    <button type="submit"
                     className="btn  btn-gradient btn-primary">Submit data
                    </button>
                    <Link 
                     className="btn btn-gradient btn-danger" to='/editdata'>Cancel
                    </Link>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default Signup