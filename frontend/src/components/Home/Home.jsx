import React from 'react'
import Studentcontext from '../context/studentContext';
import { useContext } from 'react';
import DisplayNamecontext from '../context/DisplayNamecontext';
function Home(props) {
  const { studentdetails, updatestudentdetails } = useContext(Studentcontext);
  const { displayname } = useContext(DisplayNamecontext);
  console.log(displayname);
  return (
    <>
    <div className='pt-5 mt-5'>
      <div className="w-75 mx-auto  border rounded shadow  p-5">
        <div className='container'>
          <br /> <br />
          <br /> <br />
          <h1 className=' display-4 text-center mb-5 pb-5'>  Welcome to Portal {displayname} </h1>
          {/* <h1 className=' display-8 text-center mb-5 pb-5'>  login to continue... </h1> */}
        </div>
      </div>
      </div>
    </>
  )
}

export default Home