import React, { useEffect, useRef, useState } from 'react'
import "./Project.css"
import { useSelector,useDispatch } from 'react-redux'
import Modal from "react-modal"
import {useParams} from "react-router"
import axios from '../../utils/axios'
import {toast} from "react-toastify"
import TaskComp from '../../Components/Common/TaskComp/TaskComp'


const Project = () => {
  const {id} = useParams();
  const user = useSelector((state)=>state.userInfo.user);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const inputRef = useRef()
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([])
  const [memId, setMemId] = useState("")

    useEffect(()=>{
    const getMembers = async()=>{
      try {
        const response  = await axios.get("/user/members",{
          headers:{
            Authorization:token,
          }
        })
        setMembers(response.data.members)
      } catch (error) {
        
      }
    }
    getMembers()
  },[])

    const getTasks = async()=>{
      let url =""
      if(user.userType == 2){
        url = "/project/task/all/"+id;
      }else{
        url = "/project/task/all/null"
      }
      try {
        const response  = await axios.get(url,{
          headers:{
            Authorization:token,
          }
        })
        setTasks(response.data.tasks)
      } catch (error) {
        
      }
    }

  useEffect(()=>{
    getTasks()
  },[])

    const createTask = async()=>{
    try {
      const response = await axios.post(
        "/project/create-task",
      {
        name:inputRef.current.value,
        pId: id,
      },
      {
        headers:{
          Authorization:token,
        }
      }
    );
    await axios.put("/project/assign-task/"+response.data.taskId,{memId},{
        headers:{
          Authorization:token,
        }
      })
    
    toast.success(response.data.msg)
    inputRef.current.value = "";
    setOpen(false)
    getTasks()
    } catch (error) {
      
    }
  }

  return (
    <div className='main-project'>
     <div className="project">
       <h1>Task Title</h1>
      {user.userType == 2 &&  (<button onClick={()=>setOpen(true)}>Create Task</button>)}
     </div>
      <TaskComp tasks={tasks}/>

       {user.userType == 2 && (<Modal className="projectsModal" overlayClassName="projectsOverlay" isOpen={open} onRequestClose={()=>setOpen(false)}>
              <h1>Task Info</h1>
              <br />
              <input placeholder='Enter Task Title' type="text" ref={inputRef} />
              <br />
              <br />
              <label>Assign a Member</label>
              <br />
              <select onChange={(e)=>setMemId(e.target.value)}>
                {members.map((user)=>{
                  return(
                    <option key={user._id} value={user._id}>{user.name}</option>
                  )
                })}
              </select>
              <br />
              <br />
              <button className='modal-btn' onClick={createTask}>Create Task</button>
            </Modal>)}
    </div>
  )
}

export default Project