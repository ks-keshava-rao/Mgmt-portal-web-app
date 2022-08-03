import React from "react";
import AdminContext from "./AdminContext";
import { useState } from "react";

const AdminState = (props) => {
    const initialadmin = {
    }
    const [admindata,updateadmin] = useState(initialadmin);
    return(
        <AdminContext.Provider value={{admindata,updateadmin}}>
        {props.children}
        </AdminContext.Provider>
    )
}
export default AdminState;