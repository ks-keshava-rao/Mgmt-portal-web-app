import Studentcontext from "./studentContext";
import React from "react";
import { useState } from "react";

const Studentstate = (props) => {
    const defaultdetails = {
       
    }
    const [studentdetails, updatestudentdetails] = useState(defaultdetails);
    return (
        <Studentcontext.Provider value={{ studentdetails, updatestudentdetails }}>
            {props.children}
        </Studentcontext.Provider>
    )
}
export default Studentstate;