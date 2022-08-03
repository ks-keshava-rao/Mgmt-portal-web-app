import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import NavbarContext from '../context/NavContext';
import { FaReact } from "react-icons/fa";

const Navbar2 = () => {
    const retreivedNav = useContext(NavbarContext)
    let id = 1;
    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark  sticky-top"
        style={{background: "linear-gradient(to right, #6A82FB, #FC5C7D)"}}>
        {/* {console.log(props)}
        {console.log(navdata)} */}
        {/* {console.log(retreivedNav.navbarchoice)} */}
            <div className='container'>
                <NavLink className="navbar-brand" to="/"> <FaReact/> Portal</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    {
                        retreivedNav.navbarchoice.map((tab,index) => {
                            return(
                            <ul key={index} className="navbar-nav justify-content-center mr-auto">
                                <li    className="nav-item active">
                                    {/* {console.log(tab.path,tab.pageName)} */}
                                    <NavLink className="nav-link" to={tab.path}>{tab.pageName} <span className="sr-only"></span></NavLink>
                                </li>
                            </ul>
                        )})
                    }
                </div>
            </div>
        </nav>
        
    )
}

export default Navbar2