import React, { useEffect, useRef, useState } from 'react'
import Modal from "react-modal"
import "./Projects.css"
import axios from '../../utils/axios'
import {toast} from "react-toastify"
import ProjectsComp from '../../Components/Common/ProjectsComp/ProjectsComp'
import { useSelector,useDispatch } from 'react-redux'


const Projects = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const inputRef = useRef()
  const [managers, setManagers] = useState([]);
  const [mId, setMId] = useState("")
  const [projects, setProjects] = useState([])

  const user = useSelector((state)=>state.userInfo.user);

  useEffect(()=>{
    const getManagers = async()=>{
      try {
        const response  = await axios.get("/user/managers",{
          headers:{
            Authorization:token,
          }
        })
        setManagers(response.data.managers)
      } catch (error) {
        
      }
    }
    getManagers()
  },[])

  const getProjects = async()=>{
      try {
        const response  = await axios.get("/project/all",{
          headers:{
            Authorization:token,
          }
        })
        setProjects(response.data.projects)
      } catch (error) {
        
      }
    }
    getProjects()

  useEffect(()=>{
    //  const getProjects = async()=>{
    //   try {
    //     const response  = await axios.get("/project/all",{
    //       headers:{
    //         Authorization:token,
    //       }
    //     })
    //     setProjects(response.data.projects)
    //   } catch (error) {
        
    //   }
    // }
    getProjects()
  },[])


  const createProject = async()=>{
    try {
      const response = await axios.post(
        "/project/create",
      {
        title:inputRef.current.value,
      },
      {
        headers:{
          Authorization:token,
        }
      }
    );
    await axios.put("/project/assign/"+response.data.pid,{mId},{
        headers:{
          Authorization:token,
        }
      })
    
    toast.success(response.data.msg)
    inputRef.current.value = "";
    setOpen(false)
    getProjects()
    } catch (error) {
      
    }
  }

 

  return (
    <div className='main-projects'>
      <div className='projects'>
        <h1>Projects</h1>
        {user.userType == 1 &&  (<button className='modal-btn' onClick={()=>setOpen(true)}>Add Project</button>)}
      </div>
      <ProjectsComp projects={projects}/>

      {user.userType == 1 && (<Modal className="projectsModal" overlayClassName="projectsOverlay" isOpen={open} onRequestClose={()=>setOpen(false)}>
        <h1>Project Info</h1>
        <br />
        <input placeholder='Enter Project Title' type="text" ref={inputRef} />
        <br />
        <br />
        <label>Assign a manager</label>
        <br />
        <select onChange={(e)=>setMId(e.target.value)}>
          {managers.map((user)=>{
            return(
              <option key={user._id} value={user._id}>{user.name}</option>
            )
          })}
        </select>
        <br />
        <br />
        <button className='modal-btn' onClick={createProject}>Create Project</button>
      </Modal>)}
    </div>
  )
}

export default Projects