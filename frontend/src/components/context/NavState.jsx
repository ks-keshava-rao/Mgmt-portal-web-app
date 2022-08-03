import React from "react";
import { useState } from "react";
import NavbarContext from "./NavContext";

const NavbarState = (props) =>{
    const prelogin = [
        {
            pageName: "Home",path: '/'},
          {
            pageName: "Login",path: '/login'}
        ]
    const [navbarchoice,updatechoice] = useState(prelogin);
    return(
        <NavbarContext.Provider  value={{navbarchoice,updatechoice}} >
            {/* {console.log(navbarchoice)} */}
            {props.children}
        </NavbarContext.Provider>
    )
}
export default NavbarState