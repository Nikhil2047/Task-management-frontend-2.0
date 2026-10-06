import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router"
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import {ToastContainer} from "react-toastify"
import Verify from './Pages/Verify/Verify'
import MemberRoute from './Components/Auth/MemberRoute'
import ManagerRoute from './Components/Auth/ManagerRoute'
import AdminRoute from './Components/Auth/AddminRoute'
import Projects from './Pages/Projects/Projects'
import Navbar from './Components/Common/Navbar/Navbar'
import Project from './Pages/Project/Project'
import {useSelector,useDispatch} from "react-redux";
import { handleLogin } from "./slices/user";
import Task from './Pages/Task/Task'
import RoleGuard from './Components/Auth/RoleGuard'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.userInfo.user);
  
  useEffect(()=>{
        let token = localStorage.getItem("token");
            if(!user && token){
                dispatch(handleLogin(token))
            }
  },[])
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Navbar/>
      <Routes>
            <Route path='/projects' element={
              <RoleGuard userType={[1,2]}>
                <Projects/>
              </RoleGuard>
            }/>

            <Route path='/project/:id' element={
              <RoleGuard userType={[2, 3]}>
                <Project/>
              </RoleGuard>
            }/>

            <Route path='/task/:id' element={
              <RoleGuard userType={[3]}>
                <Task/>
              </RoleGuard>
            }/>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/verify/:token' element={<Verify/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App