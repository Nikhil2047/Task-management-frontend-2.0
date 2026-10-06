import React from 'react'
import "./TaskComp.css"
import { Link } from 'react-router'


const TaskComp = ({tasks}) => {
  return (
    <div className='taskComp'>
        {tasks?.map((task)=>{
            return (
                <Link key={task._id} to={`/task/${task._id}`}>
                    <div className='taskCard'>
                        <h3>{task.name}</h3>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default TaskComp