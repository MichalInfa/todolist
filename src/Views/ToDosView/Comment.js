import React from 'react'
import './Comment.css'

const Comment = (props) => {

    return(
        <div className = "CommentsContainer">
            <div className = "CommentsCircle">
                {props.name[0]}
            </div>
            <div className = "CommentsArea">
                {props.name}
                <p className = "CommentDescription">
                    {props.description}
                </p>
            </div>
        </div>
    )
}

export default Comment