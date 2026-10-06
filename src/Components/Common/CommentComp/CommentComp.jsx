import React from 'react'
import {Link} from "react-router"
import "./CommentComp.css"

const CommentComp = ({comments}) => {
  return (
     <div className='CommentComp'>
        {comments?.map((comment)=>{
            return (
                <Link key={comment._id} to={`/task/${comment._id}`}>
                    <div className='CommentCard'>
                        <h3>{comment.text}</h3>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default CommentComp