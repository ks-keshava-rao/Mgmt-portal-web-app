import React from 'react'
import Userauth from './Userauth'
import { useState } from 'react'

const Userstate = (props) => {
    const intiallogstate = {
        USER_AUTH : false,
        ADMIN_AUTH : false
    }
    const [AUTH_STATUS,UPDATE_AUTH] = useState(intiallogstate);
  return (
    <Userauth.Provider value={{AUTH_STATUS,UPDATE_AUTH}}>
     {props.children}
    </Userauth.Provider>
  )
}

export default Userstate 