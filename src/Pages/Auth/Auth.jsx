import React, { useState } from 'react'
import Signup from '../../Components/Auth/SignUp/Signup'
import Login from '../../Components/Auth/Login/Login'

const Auth = () => {
  const [activeForm, setActiveForm] = useState(1)

  return (
    <div>
        {
          activeForm === 1 ? (<Login toggleNow={()=>setActiveForm(2)}/>) : (<Signup toggleNow={()=>setActiveForm(1)}/>) 
        }
    </div>
  )
}

export default Auth