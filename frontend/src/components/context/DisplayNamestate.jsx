import React from "react";
import { useState } from "react";
import DisplayNamecontext from "./DisplayNamecontext";

const DisplayNamestate = (props)=>{
    const intialname = " ";
    const [displayname,updatename] = useState(intialname);
    return(
        <DisplayNamecontext.Provider value={{displayname,updatename}}>
                {props.children}
        </DisplayNamecontext.Provider>
    ) 
}
export default DisplayNamestate;