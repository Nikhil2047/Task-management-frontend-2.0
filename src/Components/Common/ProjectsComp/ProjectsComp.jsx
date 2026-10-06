import React from 'react'
import "./ProjectsComp.css"
import { Link } from 'react-router'

const ProjectsComp = ({projects}) => {
  return (
    <div className='projectsComp'>
        {projects?.map((project)=>{
            return (
                <Link key={project._id} to={`/project/${project._id}`}>
                    <div className='projectCard'>
                        <h3>{project.title}</h3>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default ProjectsComp