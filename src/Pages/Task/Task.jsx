import React, { useEffect, useRef, useState } from 'react'
import "./Task.css"
import { useSelector,useDispatch } from 'react-redux'
import Modal from "react-modal"
import {useParams} from "react-router"
import axios from '../../utils/axios'
import {toast} from "react-toastify"
import CommentComp from '../../Components/Common/CommentComp/CommentComp'
// import Project from '../Project/Project'

const Task = () => {
  const {id} = useParams();
  const user = useSelector((state)=>state.userInfo.user);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const inputRef = useRef()
  const [status, setStatus] = useState(1);
  const [comment, setComment] = useState([])


  // useEffect(()=>{
  //   const getStatus = async()=>{
  //     try {
  //       const response  = await axios.get("/user/status",{
  //         headers:{
  //           Authorization:token,
  //         }
  //       })
  //       setStatus(response.data.status)
  //     } catch (error) {
        
  //     }
  //   }
  //   getStatus()
  // },[])

  const getComment = async()=>{
      let url =""
      if(user.userType == 3){
        url = "/project/comment/all/"+id;
      }
      try {
        const response  = await axios.get(url,{
          headers:{
            Authorization:token,
          }
        })
        setComment(response.data.comment)
      } catch (error) {
        
      }
    }

  useEffect(()=>{
    getComment()
  },[])
  
  // const handleStatusUpdate = (e)=>{
  //   const newStatus = Number(e.target.value);
  //   setStatus(newStatus)
  // }

    const AddComment = async()=>{
    try {
      const response = await axios.put(
        "/project/comment/"+id,
      {
            comment:inputRef.current.value,
            task:id,
      },
      {
        headers:{
          Authorization:token,
        }
      }
    );
    await axios.put("/project/update-status/"+id,{status},{
        headers:{
          Authorization:token,
        }
      })
    
    toast.success(response.data.msg)
    inputRef.current.value = "";
    setOpen(false)
    getComment()
    } catch (error) {
      
    }
  }

  return (
    <div className='main-task'>
      <div className="comment">
        <h1>Make a comment</h1>
      {user.userType == 3 &&  (<button onClick={()=>setOpen(true)}>Add Comment</button>)}
      </div>

      <CommentComp comments={comment}/>

       {user.userType == 3 && (<Modal className="projectsModal" overlayClassName="projectsOverlay" isOpen={open} onRequestClose={()=>setOpen(false)}>
              <h1>Task Info</h1>
              <br />
              <input placeholder='Enter any comment' type="text" ref={inputRef} />
              <br />
              <br />
              <label>Update the status</label>
              <br />
                <select value={status} onChange={(e)=>setStatus(Number(e.target.value))}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                </select>
              <br />
              <br />
              <button onClick={AddComment}>Add comment</button>
            </Modal>)}
    </div>
  )
}

export default Task